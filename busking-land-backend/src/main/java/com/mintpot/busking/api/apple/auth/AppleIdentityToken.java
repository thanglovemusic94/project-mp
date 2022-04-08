package com.mintpot.busking.api.apple.auth;

import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class AppleIdentityToken {

    private String issuer;

    private String audience;

    private Date expiration;

    private Date issueAt;

    // Authorization Code hashed value
    private String cHash;

    private String email;

    private boolean emailVerified;

    private Date authTime;

    private boolean nonceSupported;

    private String subject;

    private String name;

    public AppleIdentityToken(Claims claims) {
        this.name = claims.get("name", String.class);
        this.email = claims.get("email", String.class);
        this.subject = claims.getSubject();
        this.cHash = claims.get("c_hash", String.class);
        this.issuer = claims.getIssuer();
        this.audience = claims.getAudience();
        this.expiration = claims.getExpiration();
        this.issueAt = claims.getIssuedAt();
        this.emailVerified = Boolean.parseBoolean(claims.get("email_verified", String.class));
        this.authTime = new Date(claims.get("auth_time", Long.class));
        this.nonceSupported = claims.get("nonce_supported", Boolean.class);

    }
}
