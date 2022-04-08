package com.mintpot.readingm.backend.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class ZoomApiUtils {
    @Value("${zoomApi.key}")
    private String zoomApiKey;

    @Value("${zoomApi.secret}")
    private String zoomSecret;

    @Value("${zoomApi.token-duration}")
    private String duration;

    private long expiration;

    private String token;

    public synchronized String getToken() {
        if (token == null || System.currentTimeMillis() >= expiration - 30 * 1000) { // refresh token before expire 30 seconds
            generateNewToken();
        }

        return token;
    }

    private void generateNewToken() {
        Key secretKey = Keys.hmacShaKeyFor(zoomSecret.getBytes(StandardCharsets.UTF_8));
        expiration = System.currentTimeMillis() + Long.parseLong(duration) *60 * 1000;
        token = Jwts.builder()
                .signWith(secretKey)
                .setIssuer(zoomApiKey)
                .setIssuedAt(new Date())
                .setExpiration(new Date(expiration))
                .compact();
    }
}
