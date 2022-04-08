package com.mintpot.carcloth.api;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetTokenRes {

    private int code;

    private String message;

    private Response response;

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private String access_token;

        private long now;

        private long expired_at;
    }
}
