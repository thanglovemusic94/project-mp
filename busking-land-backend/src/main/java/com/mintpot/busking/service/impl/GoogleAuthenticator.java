package com.mintpot.busking.service.impl;

import com.mintpot.busking.api.SNSInfoDto;
import com.mintpot.busking.api.google.GoogleApiClient;
import com.mintpot.busking.api.google.dto.UserInfo;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.constant.SNSType;
import com.mintpot.busking.repository.RefreshTokenRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.UserService;
import com.mintpot.busking.utils.JwtUtils;
import org.springframework.stereotype.Component;

@Component
public class GoogleAuthenticator extends AbstractAuthenticator {

    private final GoogleApiClient googleApiClient;

    protected GoogleAuthenticator(JwtUtils jwtUtils, RefreshTokenRepository refTokenRepo, UserService userService,
                                  UserRepository userRepo, GoogleApiClient googleApiClient) {
        super(jwtUtils, refTokenRepo, userService, userRepo);
        this.googleApiClient = googleApiClient;
    }

    @Override
    SNSInfoDto verifyToken(String token) {
        UserInfo userInfo = googleApiClient.getUserInfo(token)
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_INVALID_TOKEN));
        return new SNSInfoDto(userInfo.getId(), userInfo.getName(), userInfo.getEmail(), SNSType.GOOGLE);
    }
}
