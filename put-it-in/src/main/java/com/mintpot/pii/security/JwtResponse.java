package com.mintpot.pii.security;

import lombok.*;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class JwtResponse {

    private String userName;

    private long userId;

    private String accessToken;

    private Date expiredOn;

    private String refreshToken;

    private String fbToken;

    @Builder
    public JwtResponse(long userId, String userName, String accessToken, Date expiredOn) {
        this.userId = userId;
        this.userName = userName;
        this.accessToken = accessToken;
        this.expiredOn = expiredOn;
    }
}
