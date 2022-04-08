package com.mintpot.carcloth.api.naver;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Component
public class NaverApiClientImpl implements NaverApiClient {

    private final String AUTHORIZATION;
    private final String TOKEN_TYPE_BEARER;
    private final String URI_GET_USER_INFO;

    private final WebClient naverWebClient;

    private final ModelMapper mapper;

    {
        AUTHORIZATION = "Authorization";
        TOKEN_TYPE_BEARER = "Bearer ";
        URI_GET_USER_INFO = "/v1/nid/me";
    }

    public NaverApiClientImpl(WebClient naverWebClient, ModelMapper mapper) {
        this.naverWebClient = naverWebClient;
        this.mapper = mapper;
    }

    @Override
    public Optional<UserInfo> getUserInfo(String naverAccessToken) {
        var resp = naverWebClient.get()
                .uri(URI_GET_USER_INFO)
                .header(AUTHORIZATION, TOKEN_TYPE_BEARER + naverAccessToken)
                .retrieve()
                .bodyToMono(ApiResponse.class)
                .block();

        if (resp != null && resp.getResultcode() != null && resp.getResultcode().equalsIgnoreCase("00")) {
            return Optional.of(mapper.map(resp.getResponse(), UserInfo.class));
        } else return Optional.empty();
    }
}
