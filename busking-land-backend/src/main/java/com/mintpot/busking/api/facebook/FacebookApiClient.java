package com.mintpot.busking.api.facebook;

import com.mintpot.busking.api.facebook.dto.UserInfo;

import java.util.Optional;

public interface FacebookApiClient {

    Optional<UserInfo> getUserInfo(String naverAccessToken);

}
