package com.mintpot.busking.service.impl;

import com.mintpot.busking.api.SNSInfoDto;
import com.mintpot.busking.api.naver.NaverApiClient;
import com.mintpot.busking.api.naver.UserInfo;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.constant.SNSType;
import com.mintpot.busking.repository.RefreshTokenRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.UserService;
import com.mintpot.busking.utils.JwtUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class NaverAuthenticator extends AbstractAuthenticator {

    private final NaverApiClient naverApiClient;

    protected NaverAuthenticator(JwtUtils jwtUtils, RefreshTokenRepository refTokenRepo, UserRepository userRepo,
                                 UserService userService, NaverApiClient naverApiClient) {
        super(jwtUtils, refTokenRepo, userService, userRepo);
        this.naverApiClient = naverApiClient;
    }

    @Override
    SNSInfoDto verifyToken(String token) {
        UserInfo nUsrInfo = naverApiClient.getUserInfo(token)
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_INVALID_TOKEN));

        var snsId = String.valueOf(nUsrInfo.getId());

        if(StringUtils.isEmpty(nUsrInfo.getEmail())) {
            throw new BusinessException(ErrorCode.EMAIL_NOT_EXIST);
        }
        String naverName = nUsrInfo.getNickname();
        if(StringUtils.isEmpty(naverName)) {
            naverName = nUsrInfo.getName();
        }
        return new SNSInfoDto(snsId, naverName, nUsrInfo.getEmail(), nUsrInfo.getMobile(), SNSType.NAVER, token);
    }
}
