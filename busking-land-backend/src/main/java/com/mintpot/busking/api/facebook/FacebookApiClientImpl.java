package com.mintpot.busking.api.facebook;

import com.mintpot.busking.api.facebook.dto.UserInfo;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Component
public class FacebookApiClientImpl implements FacebookApiClient {

    private final WebClient facebookWebClient;

    public FacebookApiClientImpl(WebClient facebookWebClient) {
        this.facebookWebClient = facebookWebClient;
    }

    @Override
    public Optional<UserInfo> getUserInfo(String fbAccessToken) {
        var resp = facebookWebClient.get()
                .uri(ub -> ub.path("/me")
                        .queryParam("fields", "id,name,email")
                        .queryParam("access_token", fbAccessToken)
                        .build()
                ).retrieve()
                .bodyToMono(UserInfo.class)
                .block();

        return Optional.ofNullable(resp);
    }
}
