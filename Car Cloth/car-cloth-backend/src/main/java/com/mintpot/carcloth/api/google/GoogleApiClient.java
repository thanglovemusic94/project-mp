package com.mintpot.carcloth.api.google;

import com.mintpot.carcloth.api.google.dto.UserInfo;

import java.util.Optional;

public interface GoogleApiClient {
    Optional<UserInfo> getUserInfo(String googleToken);
}
