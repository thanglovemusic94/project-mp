package com.mintpot.busking.api.apple.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

@Component
public class  IdentityTokenDecoderImpl implements IdentityTokenDecoder {

    private final String AUDIENCE;
    private final String ISSUER;

    {
        AUDIENCE = "app.mintpot.BuskingLand";
        ISSUER = "https://appleid.apple.com";
    }

    private final AppleSigningKeyResolver appleAuthKeyResolver;

    public IdentityTokenDecoderImpl(AppleSigningKeyResolver appleAuthKeyResolver) {
        this.appleAuthKeyResolver = appleAuthKeyResolver;
    }

    @Override
    public AppleIdentityToken decode(String token) {
        Claims claims;
        try {
            claims = Jwts.parser().setSigningKeyResolver(appleAuthKeyResolver).setAllowedClockSkewSeconds(30)
                    .requireIssuer(ISSUER).requireAudience(AUDIENCE).parseClaimsJws(token).getBody();
        } catch(ExpiredJwtException ex) {
            // in case the account has been used to signup before but fail, client still return the old JWT so it has
            // expired, but we still use this to validate and create new account.
            claims = ex.getClaims();
        }
        /*if(!claims.get("nonce_supported", Boolean.class))
            throw new BusinessException(ErrorCode.APPLE_ID_VERIFICATION_FAILED_NONCE_FALSE);*/
        return new AppleIdentityToken(claims);
    }
}
