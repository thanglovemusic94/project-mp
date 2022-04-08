package com.mintpot.busking.api.naver;

import java.util.Optional;

public interface NaverApiClient {
    Optional<UserInfo> getUserInfo(String naverAccessToken);
}
