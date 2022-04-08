package com.mintpot.carcloth.security;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class JwtResponse {

    private String accessToken;

    private String refreshToken;

    @Builder
    public JwtResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
