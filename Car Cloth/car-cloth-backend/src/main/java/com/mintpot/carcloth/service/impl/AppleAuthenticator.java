package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.dto.SNSInfoDto;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.repository.RefreshTokenRepository;
import com.mintpot.carcloth.security.AuthenticationService;
import com.mintpot.carcloth.security.JwtUtils;
import com.mintpot.carcloth.service.UserService;
import org.springframework.stereotype.Component;

@Component
public class AppleAuthenticator extends AbstractAuthenticator {
    public AppleAuthenticator(JwtUtils jwtUtils,
                              RefreshTokenRepository refTokenRepo,
                              UserService userService,
                              AuthenticationService authService,
                              MemberRepository memberRepo) {
        super(jwtUtils, refTokenRepo, userService, authService, memberRepo);
    }

    @Override
    SNSInfoDto verifyToken(String token) {
        return null;
    }

    /*private final IdentityTokenDecoderImpl identityTokenDecoder;


    protected AppleAuthenticator(JwtUtils jwtUtils, RefreshTokenRepository refTokenRepo, UserService userService,
                                 AppleSigningKeyResolver appleAuthKeyResolver, UserRepository userRepo, IdentityTokenDecoderImpl identityTokenDecoder) {
        super(jwtUtils, refTokenRepo, userService, userRepo);
        this.identityTokenDecoder = identityTokenDecoder;
    }

    @Override
    SNSInfoDto verifyToken(String token) {
        AppleIdentityToken appleIdentityToken = identityTokenDecoder.decode(token);
        return new SNSInfoDto(appleIdentityToken.getSubject(), "", appleIdentityToken.getEmail(), SNSType.APPLE);
    }*/
}
