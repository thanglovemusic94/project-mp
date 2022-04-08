package com.mintpot.busking.service.impl;

import com.mintpot.busking.api.SNSInfoDto;
import com.mintpot.busking.api.facebook.FacebookApiClient;
import com.mintpot.busking.api.facebook.dto.UserInfo;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.constant.SNSType;
import com.mintpot.busking.repository.RefreshTokenRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.UserService;
import com.mintpot.busking.utils.JwtUtils;
import org.springframework.stereotype.Component;

@Component
public class FacebookAuthenticator extends AbstractAuthenticator {

    private final FacebookApiClient fbApiClient;

    protected FacebookAuthenticator(JwtUtils jwtUtils, RefreshTokenRepository refTokenRepo, UserService userService,
                                    UserRepository userRepo, FacebookApiClient fbApiClient) {
        super(jwtUtils, refTokenRepo, userService, userRepo);
        this.fbApiClient = fbApiClient;
    }

    @Override
    SNSInfoDto verifyToken(String token) {
        UserInfo fbUsrInfo = fbApiClient.getUserInfo(token)
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_INVALID_TOKEN));

        var fbUserId = String.valueOf(fbUsrInfo.getId());

        return new SNSInfoDto(fbUserId, fbUsrInfo.getName(), fbUsrInfo.getEmail(), SNSType.FACEBOOK);
    }
}
