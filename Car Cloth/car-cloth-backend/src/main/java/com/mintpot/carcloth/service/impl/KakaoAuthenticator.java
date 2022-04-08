package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.api.kakao.AccessTokenInfo;
import com.mintpot.carcloth.api.kakao.KakaoApiClient;
import com.mintpot.carcloth.api.kakao.KakaoInfo;
import com.mintpot.carcloth.api.kakao.KakaoProperties;
import com.mintpot.carcloth.constant.SNSType;
import com.mintpot.carcloth.dto.SNSInfoDto;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.repository.RefreshTokenRepository;
import com.mintpot.carcloth.security.AuthenticationService;
import com.mintpot.carcloth.security.JwtUtils;
import com.mintpot.carcloth.service.UserService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Component
public class KakaoAuthenticator extends AbstractAuthenticator {

    private final KakaoApiClient kakaoApiClient;

    public KakaoAuthenticator(JwtUtils jwtUtils,
                              RefreshTokenRepository refTokenRepo,
                              UserService userService,
                              AuthenticationService authService,
                              MemberRepository memberRepo,
                              KakaoApiClient kakaoApiClient) {
        super(jwtUtils, refTokenRepo, userService, authService, memberRepo);
        this.kakaoApiClient = kakaoApiClient;
    }

    @Override
    SNSInfoDto verifyToken(String token) {
        AccessTokenInfo accessTokenInfo = kakaoApiClient.getUserInfo(token)
                                                        .orElseThrow(() -> new CommonException(ErrorCode.AUTH_INVALID_TOKEN));

        if (accessTokenInfo.getExpiresInMillis() > 0) {
            var expireDate = LocalDateTime.ofEpochSecond(accessTokenInfo.getExpiresInMillis() / 1000,
                                                         0,
                                                         ZoneOffset.UTC);
            if (expireDate.isBefore(LocalDateTime.now()))
                throw new CommonException(ErrorCode.AUTH_TOKEN_EXPIRED);
        }

        var snsId = String.valueOf(accessTokenInfo.getId());

        String email = "";
        KakaoInfo kakaoInfo = accessTokenInfo.getKakao_account();
        if (kakaoInfo != null) {
            email = kakaoInfo.getEmail();
        }

        if (StringUtils.isEmpty(email)) {
            throw new CommonException(ErrorCode.EMAIL_NOT_EXIST);
        }

        String nickName = "";
        KakaoProperties kakaoProperties = accessTokenInfo.getProperties();
        if (kakaoProperties != null) {
            nickName = kakaoProperties.getNickname();
        }

        return new SNSInfoDto(snsId, nickName, email, SNSType.KAKAO, token);
    }
}
