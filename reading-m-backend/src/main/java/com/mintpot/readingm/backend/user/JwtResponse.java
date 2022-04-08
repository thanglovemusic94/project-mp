package com.mintpot.readingm.backend.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

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
