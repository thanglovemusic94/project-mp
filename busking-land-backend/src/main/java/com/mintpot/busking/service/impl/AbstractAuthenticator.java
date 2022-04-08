package com.mintpot.busking.service.impl;

import com.google.gson.Gson;
import com.mintpot.busking.api.SNSInfoDto;
import com.mintpot.busking.dto.JwtResponse;
import com.mintpot.busking.dto.UserDto;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.RefreshToken;
import com.mintpot.busking.model.SNSInfo;
import com.mintpot.busking.model.User;
import com.mintpot.busking.repository.RefreshTokenRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.SNSAuthenticator;
import com.mintpot.busking.service.UserService;
import com.mintpot.busking.utils.JwtUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Log4j2
@Component
public abstract class AbstractAuthenticator implements SNSAuthenticator {

    private final JwtUtils jwtUtils;

    private final RefreshTokenRepository refTokenRepo;

    private final UserService userService;

    private final UserRepository userRepo;

    @Value("${jwt.refreshToken.duration}")
    private long REFRESH_TOKEN_DURATION;

    protected AbstractAuthenticator(JwtUtils jwtUtils, RefreshTokenRepository refTokenRepo, UserService userService
            , UserRepository userRepo) {
        this.jwtUtils = jwtUtils;
        this.refTokenRepo = refTokenRepo;
        this.userService = userService;
        this.userRepo = userRepo;
    }

    abstract SNSInfoDto verifyToken(String token);

    @Override
    @Transactional
    public JwtResponse authenticate(String token) {
        return authenticate(token, "");
    }

    @Override
    @Transactional
    public JwtResponse authenticate(String token, String userName) {
        var snsInfo = verifyToken(token);
        Optional<Integer> userInfo = userRepo.getUserIdBySnsIdAndSnsType(snsInfo.getId(), snsInfo.getType());

        if (userInfo.isEmpty()) {
            if(!StringUtils.isEmpty(userName) && StringUtils.isEmpty(snsInfo.getName())) {
                snsInfo.setName(userName);
            }
            var user = userService.createUserWithSNSInfo(snsInfo.getName(), snsInfo.getId(), snsInfo.getEmail(), snsInfo.getMobile(), snsInfo.getType(), snsInfo.getToken());
            userInfo = Optional.of(user.getId());
        }

        return userInfo.map(this::processJwtResponse).orElseThrow(() -> new BusinessException(ErrorCode.AUTH_INVALID_TOKEN));
    }

    @Override
    @Transactional
    public JwtResponse emailAuthenticate(String mail, String password) {
        User user = new User();
        user.setEmail(mail);
        user.setPassword(password);
        String token = new Gson().toJson(user);
        var snsInfo = verifyToken(token);
        Optional<Integer> userInfo = Optional.of(snsInfo.getUserId());
        if (snsInfo.getUserId() == -1) {
            throw new BusinessException(ErrorCode.USER_NOT_FOUND);
        }

        return userInfo.map(this::processJwtResponse).orElseThrow(() -> new BusinessException(ErrorCode.AUTH_INVALID_TOKEN));
    }

    @Override
    @Transactional
    public JwtResponse mockAuthenticate (String userIdStr) {
        int userId = Integer.parseInt(userIdStr);

        Optional<User> userOptional = userRepo.findById(userId);

        if(userOptional.isEmpty()) throw new BusinessException(ErrorCode.AUTH_INVALID_TOKEN);

        Optional<Integer> userInfo = Optional.of(userOptional.get().getId());

        return userInfo.map(this::processJwtResponse).orElseThrow(() -> new BusinessException(ErrorCode.AUTH_INVALID_TOKEN));

    }


    private JwtResponse processJwtResponse(int userId) {
        var res = jwtUtils.generateToken(String.valueOf(userId));
        var usrRefToken = refTokenRepo.findById(userId);
        if (usrRefToken.isPresent() && usrRefToken.get().getExpiredOn().after(new Date())) {
            log.debug("Found a valid refresh token of user with id {}", userId);
            res.setRefreshToken(usrRefToken.get().getRefreshToken());
        } else {
            if (usrRefToken.isPresent()) {
                refTokenRepo.deleteById(userId);
            }
            log.debug("Did not find a valid refresh token or refresh token expired, creating a new refresh token for " +
                    "user with id: {}", userId);
            res.setRefreshToken(UUID.randomUUID().toString().replace("-", "").toLowerCase());
            Date expiredDate = new Date(System.currentTimeMillis() + REFRESH_TOKEN_DURATION * 1000);
            RefreshToken refTokenEnt = new RefreshToken(res.getRefreshToken(), userRepo.findById(userId).get(),
                    expiredDate);
            refTokenRepo.save(refTokenEnt);
            log.debug("A refresh token was created successfully with expiredDate {} for user with id {}",
                    expiredDate, userId);
        }

        return res;
    }
}
