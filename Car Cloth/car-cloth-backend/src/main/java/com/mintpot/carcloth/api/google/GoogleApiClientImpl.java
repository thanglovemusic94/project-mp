package com.mintpot.carcloth.api.google;

import com.mintpot.carcloth.api.google.dto.UserInfo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class GoogleApiClientImpl implements GoogleApiClient {

    private final String URI_GET_USER_INFO = "/userinfo";

    private final WebClient googleWebClient;

    private final ModelMapper mapper;

    @Override
    public Optional<UserInfo> getUserInfo(String googleToken) {
        var resp = googleWebClient.get()
                .uri(uriBuilder -> uriBuilder
                .path(URI_GET_USER_INFO)
                        .queryParam("access_token", googleToken)
                        .queryParam("alt", "json").build())
                .retrieve()
                .bodyToMono(UserInfo.class)
                .block();
        if (resp != null) {
            return Optional.of(resp);
        } else return Optional.empty();
    }
}
