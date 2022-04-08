package com.mintpot.busking.api.google;


import com.mintpot.busking.api.google.dto.UserInfo;

import java.util.Optional;

public interface GoogleApiClient {
    Optional<UserInfo> getUserInfo(String googleToken);
}
