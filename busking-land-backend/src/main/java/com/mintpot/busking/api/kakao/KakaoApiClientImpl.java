package com.mintpot.busking.api.kakao;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Component
public class KakaoApiClientImpl implements KakaoApiClient {

    private final String AUTHORIZATION;
    private final String TOKEN_TYPE_BEARER;
    private final String URI_GET_ACCESS_TOKEN_INFO;
    private final String URI_GET_USER_INFO;

    private final WebClient kakaoWebClient;

    private final ModelMapper mapper;

    {
        AUTHORIZATION = "Authorization";
        TOKEN_TYPE_BEARER = "Bearer ";
        URI_GET_ACCESS_TOKEN_INFO = "/v1/user/access_token_info";
        URI_GET_USER_INFO = "/v2/user/me";
    }

    public KakaoApiClientImpl(WebClient kakaoWebClient, ModelMapper mapper) {
        this.kakaoWebClient = kakaoWebClient;
        this.mapper = mapper;
    }

    @Override
    public Optional<AccessTokenInfo> getUserInfo(String kakaoAccessToken) {
        var resp = kakaoWebClient.get()
                .uri(URI_GET_USER_INFO)
                .header(AUTHORIZATION, TOKEN_TYPE_BEARER + kakaoAccessToken)
                .retrieve()
                .bodyToMono(AccessTokenInfo.class)
                .block();

        return Optional.ofNullable(resp);
    }
}
