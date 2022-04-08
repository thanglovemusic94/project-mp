package com.mintpot.carcloth.api.kakao;

import java.util.Optional;

public interface KakaoApiClient {
    Optional<AccessTokenInfo> getUserInfo(String kakaoAccessToken);
}
