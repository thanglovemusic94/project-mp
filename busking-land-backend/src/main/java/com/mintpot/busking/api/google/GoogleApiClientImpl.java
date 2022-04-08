package com.mintpot.busking.api.google;

import com.mintpot.busking.api.google.dto.UserInfo;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Component
public class GoogleApiClientImpl implements GoogleApiClient {

    private final String URI_GET_USER_INFO;

    private final WebClient googleWebClient;

    private final ModelMapper mapper;


    {
        URI_GET_USER_INFO = "/userinfo";
    }

    public GoogleApiClientImpl(WebClient googleWebClient, ModelMapper mapper) {
        this.googleWebClient = googleWebClient;
        this.mapper = mapper;
    }

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
