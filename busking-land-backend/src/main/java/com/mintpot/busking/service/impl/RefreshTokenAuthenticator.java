package com.mintpot.busking.service.impl;

import com.mintpot.busking.constant.UserStatus;
import com.mintpot.busking.dto.JwtResponse;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.repository.RefreshTokenRepository;
import com.mintpot.busking.service.SNSAuthenticator;
import com.mintpot.busking.utils.JwtUtils;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class RefreshTokenAuthenticator implements SNSAuthenticator {

    private final RefreshTokenRepository refreshTokenRepo;

    private final JwtUtils jwtUtils;

    public RefreshTokenAuthenticator(RefreshTokenRepository refreshTokenRepo, JwtUtils jwtUtils) {
        this.refreshTokenRepo = refreshTokenRepo;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public JwtResponse authenticate(String token) {
        var refreshToken = refreshTokenRepo.findByRefreshToken(token)
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_REFRESH_TOKEN_NOT_FOUND));

        if(refreshToken.getExpiredOn().before(new Date()))
            throw new BusinessException(ErrorCode.AUTH_REFRESH_TOKEN_EXPIRED);

        if(refreshToken.getUser().getStatus() != UserStatus.ACTIVATED)
            throw new BusinessException(ErrorCode.USER_NOT_FOUND);

        var userId = refreshToken.getId();

        var res = jwtUtils.generateToken(String.valueOf(userId));
        res.setRefreshToken(token);

        return res;
    }

    @Override
    public JwtResponse authenticate(String token, String userName) { return null; }

    @Override
    public JwtResponse emailAuthenticate(String username, String password) {
        return null;
    }

    @Override
    public JwtResponse mockAuthenticate(String userId) {
        return null;
    }

}
