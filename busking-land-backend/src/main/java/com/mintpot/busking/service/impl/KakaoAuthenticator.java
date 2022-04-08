package com.mintpot.busking.service.impl;

import com.mintpot.busking.api.SNSInfoDto;
import com.mintpot.busking.api.kakao.AccessTokenInfo;
import com.mintpot.busking.api.kakao.KakaoApiClient;
import com.mintpot.busking.api.kakao.KakaoInfo;
import com.mintpot.busking.api.kakao.KakaoProperties;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.constant.SNSType;
import com.mintpot.busking.repository.RefreshTokenRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.UserService;
import com.mintpot.busking.utils.JwtUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Component
public class KakaoAuthenticator extends AbstractAuthenticator {

    private final KakaoApiClient kakaoApiClient;

    protected KakaoAuthenticator(JwtUtils jwtUtils, RefreshTokenRepository refTokenRepo, UserService userService,
                                 UserRepository userRepo, KakaoApiClient kakaoApiClient) {
        super(jwtUtils, refTokenRepo, userService, userRepo);
        this.kakaoApiClient = kakaoApiClient;
    }

    @Override
    SNSInfoDto verifyToken(String token) {
        AccessTokenInfo accessTokenInfo = kakaoApiClient.getUserInfo(token)
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_INVALID_TOKEN));

        if(accessTokenInfo.getExpiresInMillis() > 0) {
            var expireDate = LocalDateTime.ofEpochSecond(accessTokenInfo.getExpiresInMillis() / 1000, 0, ZoneOffset.UTC);
            if (expireDate.isBefore( LocalDateTime.now()))
                throw new BusinessException(ErrorCode.AUTH_TOKEN_EXPIRED);
        }

        var snsId = String.valueOf(accessTokenInfo.getId());

        String email = "";
        KakaoInfo kakaoInfo = accessTokenInfo.getKakao_account();
        if(kakaoInfo != null) {
            email = kakaoInfo.getEmail();
        }

        if(StringUtils.isEmpty(email)) {
            throw new BusinessException(ErrorCode.EMAIL_NOT_EXIST);
        }

        String nickName = "";
        KakaoProperties kakaoProperties = accessTokenInfo.getProperties();
        if(kakaoProperties != null) {
            nickName = kakaoProperties.getNickname();
        }

        return new SNSInfoDto(snsId, nickName, email, SNSType.KAKAO, token);
    }
}
