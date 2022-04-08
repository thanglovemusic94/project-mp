package com.mintpot.pii.service.impl;

import com.mintpot.pii.entity.RefreshToken;
import com.mintpot.pii.entity.User;
import com.mintpot.pii.entity.constant.UserStatus;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.facade.AuthenticationFacade;
import com.mintpot.pii.repository.RefreshTokenRepository;
import com.mintpot.pii.repository.UserRepository;
import com.mintpot.pii.security.JwtRequest;
import com.mintpot.pii.security.JwtResponse;
import com.mintpot.pii.security.JwtUtils;
import com.mintpot.pii.service.AuthenticationService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

@Service
@Log4j2
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepo;
    private final RefreshTokenRepository refTokenRepo;
    private final AuthenticationFacade authFacade;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final ModelMapper modelMapper;

    @Value("${jwt.refreshToken.duration}")
    private long REFRESH_TOKEN_DURATION;

    public AuthenticationServiceImpl(UserRepository userRepo, RefreshTokenRepository refTokenRepo,
                                     AuthenticationFacade authFacade, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, ModelMapper modelMapper) {
        this.userRepo = userRepo;
        this.refTokenRepo = refTokenRepo;
        this.authFacade = authFacade;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public JwtResponse authenticateForToken(JwtRequest authRequest) {
        User user;
        switch (authRequest.getGrantType()) {
            case CLIENT_CREDENTIALS:
                String email = authRequest.getEmail();
                log.debug("Begin authenticate to generate JWT Token for email {}", email);
                user = userRepo.findByEmailAndStatus(email, UserStatus.ACTIVATED)
                        .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_WRONG_EMAIL_OR_PASSWORD));
                if(!passwordEncoder.matches(authRequest.getPassword(), user.getPassword()))
                    throw new BusinessException(ErrorCode.AUTH_WRONG_EMAIL_OR_PASSWORD);
                log.debug("Authentication with email {} and password succeeded, begin generating JWT Token", email);
                break;
            case REFRESH_TOKEN:
                var refToken = refTokenRepo.findByRefreshToken(authRequest.getRefreshToken())
                        .orElseThrow();

                if (refToken.getExpiredOn().before(new Date()))
                    throw new BusinessException(ErrorCode.REFRESH_TOKEN_EXPIRED);
                user = refToken.getUser();
                if (user == null || user.getStatus() != UserStatus.ACTIVATED)
                    throw new BusinessException(ErrorCode.USER_NOT_EXIST);
                break;
            default:
                throw new IllegalArgumentException("Grant type cannot be null");
        }

        return processJwtResponse(user);
    }

    private JwtResponse processJwtResponse(User user) {
        final String email = user.getEmail();
        var res = jwtUtils.generateToken(email);
        modelMapper.map(user, res);
        var usrRefToken = refTokenRepo.findById(user.getId());
        if (usrRefToken.isPresent() && usrRefToken.get().getExpiredOn().after(new Date())) {
            log.debug("Found a valid refresh token of user with email {}", email);
            res.setRefreshToken(usrRefToken.get().getRefreshToken());
        } else {
            if (usrRefToken.isPresent()) {
                refTokenRepo.deleteById(user.getId());
            }
            log.debug("Did not find a valid refresh token or refresh token expired, creating a new refresh token for " +
                    "user with email: {}", email);
            res.setRefreshToken(UUID.randomUUID().toString().replace("-", "").toLowerCase());
            Date expiredDate = new Date(System.currentTimeMillis() + REFRESH_TOKEN_DURATION * 1000);
            RefreshToken refTokenEnt = new RefreshToken(res.getRefreshToken(), user, expiredDate);
            refTokenRepo.save(refTokenEnt);
            log.debug("A refresh token was created successfully with expiredDate {} for user with email {}",
                    expiredDate, email);
        }

        /*try {
            res.setFbToken(FirebaseAuth.getInstance().createCustomToken(String.valueOf(user.getUserId())));
        } catch (FirebaseAuthException ex) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR, ex);
        }*/
        return res;
    }

    @Override
    @Transactional
    public void logout() {/*
        final var userId = authFacade.getAuthentication().getUserId();
        fbChatClient.unsubscribeAllMyRooms();
        refTokenRepo.deleteById(userId);
        fcmTokenRepo.deleteById(userId);*/
        final var userId = authFacade.getAuthentication().getUserId();
        refTokenRepo.deleteById(userId);
    }
}
