package com.mintpot.carcloth.api.kakao;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccessTokenInfo {

    private long id;

    private String connected_at;

    private int expiresInMillis;

    private int appId;

    private KakaoProperties properties;

    private KakaoInfo kakao_account;
}
