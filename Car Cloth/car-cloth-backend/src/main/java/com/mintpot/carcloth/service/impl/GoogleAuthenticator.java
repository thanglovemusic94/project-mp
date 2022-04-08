package com.mintpot.carcloth.service.impl;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.mintpot.carcloth.api.google.GoogleApiClient;
import com.mintpot.carcloth.constant.SNSType;
import com.mintpot.carcloth.dto.SNSInfoDto;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.MemberRepository;
import com.mintpot.carcloth.repository.RefreshTokenRepository;
import com.mintpot.carcloth.security.AuthenticationService;
import com.mintpot.carcloth.security.JwtUtils;
import com.mintpot.carcloth.service.UserService;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.GeneralSecurityException;

@Component
public class GoogleAuthenticator extends AbstractAuthenticator {

    private final GoogleApiClient googleApiClient;
    private final GoogleIdTokenVerifier googleIdTokenVerifier;

    public GoogleAuthenticator(JwtUtils jwtUtils,
                               RefreshTokenRepository refTokenRepo,
                               UserService userService,
                               AuthenticationService authService,
                               MemberRepository memberRepo,
                               GoogleApiClient googleApiClient,
                               GoogleIdTokenVerifier googleIdTokenVerifier) {
        super(jwtUtils, refTokenRepo, userService, authService, memberRepo);
        this.googleApiClient = googleApiClient;
        this.googleIdTokenVerifier = googleIdTokenVerifier;
    }

    @Override
    SNSInfoDto verifyToken(String token) {
        /*UserInfo userInfo = googleApiClient.getUserInfo(token)
                                           .orElseThrow(() -> new CommonException(ErrorCode.AUTH_INVALID_TOKEN));*/

        GoogleIdToken idToken = null;
        try {
            idToken = googleIdTokenVerifier.verify(token);
        }  catch (GeneralSecurityException | IOException e) {
            throw new CommonException(ErrorCode.AUTH_INVALID_TOKEN, "Cannot verify Google IdToken");
        }

        if(idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            // Print user identifier
            String userId = payload.getSubject();
            System.out.println("User ID: " + userId);

            // Get profile information from payload
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            return new SNSInfoDto(userId, name, email, SNSType.GOOGLE);
        } else throw new CommonException(ErrorCode.AUTH_INVALID_TOKEN);

    }
}
