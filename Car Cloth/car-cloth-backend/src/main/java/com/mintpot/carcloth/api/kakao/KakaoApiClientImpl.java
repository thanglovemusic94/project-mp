package com.mintpot.carcloth.api.kakao;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class KakaoApiClientImpl implements KakaoApiClient {

    private final String AUTHORIZATION = "Authorization";
    private final String TOKEN_TYPE_BEARER = "Bearer ";
    private final String URI_GET_ACCESS_TOKEN_INFO = "/v1/user/access_token_info";
    private final String URI_GET_USER_INFO = "/v2/user/me";

    private final WebClient kakaoWebClient;

    private final ModelMapper mapper;

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
