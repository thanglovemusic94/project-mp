package com.mintpot.busking.service.impl;

import com.mintpot.busking.api.SNSInfoDto;
import com.mintpot.busking.api.apple.auth.AppleIdentityToken;
import com.mintpot.busking.api.apple.auth.AppleSigningKeyResolver;
import com.mintpot.busking.api.apple.auth.IdentityTokenDecoderImpl;
import com.mintpot.busking.model.constant.SNSType;
import com.mintpot.busking.repository.RefreshTokenRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.UserService;
import com.mintpot.busking.utils.GoogleSigningKeyResolver;
import com.mintpot.busking.utils.JwtUtils;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

@Component
public class AppleAuthenticator extends AbstractAuthenticator {

    private final IdentityTokenDecoderImpl identityTokenDecoder;


    protected AppleAuthenticator(JwtUtils jwtUtils, RefreshTokenRepository refTokenRepo, UserService userService,
                                 AppleSigningKeyResolver appleAuthKeyResolver, UserRepository userRepo, IdentityTokenDecoderImpl identityTokenDecoder) {
        super(jwtUtils, refTokenRepo, userService, userRepo);
        this.identityTokenDecoder = identityTokenDecoder;
    }

    @Override
    SNSInfoDto verifyToken(String token) {
        AppleIdentityToken appleIdentityToken = identityTokenDecoder.decode(token);
        return new SNSInfoDto(appleIdentityToken.getSubject(), "", appleIdentityToken.getEmail(), SNSType.APPLE);
    }
}
