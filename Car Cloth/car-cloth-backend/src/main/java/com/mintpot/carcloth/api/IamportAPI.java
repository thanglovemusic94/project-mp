package com.mintpot.carcloth.api;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class IamportAPI {

    private final WebClient iamportWebClient;

    public String getAccessToken() {
        GetTokenReq req = GetTokenReq.builder().imp_key("2891496188123755").imp_secret(
                "57a2f9eef15c5f41e6548250efa6e418bbbd1cf513eb122399fef0e02b8cfd79f0510e6c53bbf8d0").build();
        var res = iamportWebClient.post()
                                  .uri("/users/getToken")
                                  .body(Mono.just(req), GetTokenReq.class)
                                  .retrieve()
                                  .bodyToMono(GetTokenRes.class)
                                  .block();

        if (res != null && res.getCode() == 0) return res.getResponse().getAccess_token();
        return null;
    }

    public PaymentInfo getPaymentInfo(String impUid) {
        var token = getAccessToken();

        return iamportWebClient.get().uri("/payments/" + impUid).header("Authorization", "Bearer " + token).retrieve().bodyToMono(
                PaymentInfo.class).block();
    }

}
