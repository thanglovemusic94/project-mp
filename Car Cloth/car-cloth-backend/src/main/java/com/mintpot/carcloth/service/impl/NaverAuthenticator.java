package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.api.naver.NaverApiClient;
import com.mintpot.carcloth.api.naver.UserInfo;
import com.mintpot.carcloth.constant.SNSType;
import com.mintpot.carcloth.dto.SNSInfoDto;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.repository.RefreshTokenRepository;
import com.mintpot.carcloth.security.AuthenticationService;
import com.mintpot.carcloth.security.JwtUtils;
import com.mintpot.carcloth.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class NaverAuthenticator extends AbstractAuthenticator {

    private final NaverApiClient naverApiClient;

    public NaverAuthenticator(JwtUtils jwtUtils,
                              RefreshTokenRepository refTokenRepo,
                              UserService userService,
                              AuthenticationService authService,
                              MemberRepository memberRepo,
                              NaverApiClient naverApiClient) {
        super(jwtUtils, refTokenRepo, userService, authService, memberRepo);
        this.naverApiClient = naverApiClient;
    }

    @Override
    SNSInfoDto verifyToken(String token) {
        UserInfo nUsrInfo = naverApiClient.getUserInfo(token)
                                          .orElseThrow(() -> new CommonException(ErrorCode.AUTH_INVALID_TOKEN));

        var snsId = String.valueOf(nUsrInfo.getId());

        if(StringUtils.isEmpty(nUsrInfo.getEmail())) {
            throw new CommonException(ErrorCode.AUTH_WRONG_EMAIL);
        }
        String naverName = nUsrInfo.getNickname();
        if(StringUtils.isEmpty(naverName)) {
            naverName = nUsrInfo.getName();
        }
        return new SNSInfoDto(snsId, naverName, nUsrInfo.getEmail(), nUsrInfo.getMobile(), SNSType.NAVER, token);
    }
}
