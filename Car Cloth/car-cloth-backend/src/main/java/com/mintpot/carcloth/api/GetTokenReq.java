package com.mintpot.carcloth.api;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetTokenReq {

    private String imp_key;

    private String imp_secret;
}
