package com.mintpot.readingm.backend.security;

import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.user.JwtResponse;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtUtils {

    @Value("${jwt.accessToken.duration}")
    private long JWT_ACCESS_TOKEN_VALIDITY;

    @Value("${jwt.secret}")
    private String secret;

    private Key secretKey;

    @PostConstruct
    private void postLoad() {
        secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String getSubjectFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // retrieve expiration date from jwt token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    // for retrieving any information from token we will need the secret key
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    // check if the token has expired
    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public JwtResponse generateToken(Authentication authentication) {
        final String authorities = authentication.getAuthorities().stream()
                                                 .map(GrantedAuthority::getAuthority)
                                                 .collect(Collectors.joining(","));
        return JwtResponse.builder().accessToken(Jwts.builder()
                                                     .setSubject(authentication.getName())
                                                     .claim("scopes", authorities)
                                                     .signWith(secretKey)
                                                     .setIssuedAt(new Date(System.currentTimeMillis()))
                                                     .setExpiration(new Date(System.currentTimeMillis() + JWT_ACCESS_TOKEN_VALIDITY * 1000))
                                                     .compact()).build();

    }

    public JwtResponse generateToken(Map<String, Object> claims, String subject) {
        return JwtResponse.builder().accessToken(doGenerateToken(claims, subject, JWT_ACCESS_TOKEN_VALIDITY)).build();
    }

    private String doGenerateToken(Map<String, Object> claims, String subject, long expirationDuration) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                   .setExpiration(new Date(System.currentTimeMillis() + expirationDuration * 1000)).signWith(secretKey)
                   .compact();
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature token: {}", e.getMessage());
            throw new SecurityException(ErrorCode.AUTH_JWT_INVALID_SIGNATURE);
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            throw new SecurityException(ErrorCode.AUTH_JWT_INVALID_TOKEN);
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
            throw new SecurityException(ErrorCode.AUTH_JWT_EXPIRED);
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
            throw new SecurityException(ErrorCode.AUTH_JWT_UNSUPPORTED);
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
            throw new SecurityException(ErrorCode.AUTH_JWT_CLAIM_EMPTY);
        }
    }
}
