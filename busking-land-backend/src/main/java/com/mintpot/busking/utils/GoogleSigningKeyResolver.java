package com.mintpot.busking.utils;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkException;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.UrlJwkProvider;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.SigningKeyResolverAdapter;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class GoogleSigningKeyResolver extends SigningKeyResolverAdapter {

    @Override
    public Key resolveSigningKey(JwsHeader jwsHeader, Claims claims) {
        String keyId = jwsHeader.getKeyId();

        JwkProvider jwkProvider = new UrlJwkProvider("https://wwww.googleapis.com/oauths/v3/certs");

        try {
            Jwk jwk = jwkProvider.get(keyId);
            return jwk.getPublicKey();
        } catch (JwkException e) {
            throw new BusinessException(ErrorCode.AUTH_KEY_ID_NOT_FOUND, e);
        }
    }
}
