package com.mintpot.carcloth.api.naver;

import java.util.Optional;

public interface NaverApiClient {
    Optional<UserInfo> getUserInfo(String naverAccessToken);
}
