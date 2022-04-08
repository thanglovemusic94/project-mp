package com.mintpot.busking.api.apple.auth;

public interface IdentityTokenDecoder {
    AppleIdentityToken decode(String token);
}
