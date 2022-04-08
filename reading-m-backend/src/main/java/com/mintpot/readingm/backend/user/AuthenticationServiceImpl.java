package com.mintpot.readingm.backend.user;

import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.security.SecurityException;
import com.mintpot.readingm.backend.security.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

@Service
@Log4j2
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepo;
    private final RefreshTokenRepository refTokenRepo;
    private final AuthenticationFacade authFacade;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final ModelMapper modelMapper;

    @Value("${jwt.refreshToken.duration}")
    private long REFRESH_TOKEN_DURATION;

    @Override
    @Transactional
    public JwtResponse authenticateForToken(JwtRequest authRequest, Role role) {
        User user;
        switch (authRequest.getGrantType()) {
            case CLIENT_CREDENTIALS:
                String email = authRequest.getEmail();
                log.debug("Begin authenticate to generate JWT Token for email {}", email);
                user = userRepo.findByEmailAndRole(email, role)
                               .orElseThrow(() -> new SecurityException(ErrorCode.AUTH_WRONG_EMAIL));

                if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword()))
                    throw new SecurityException(ErrorCode.AUTH_WRONG_PASSWORD);
                log.debug("Authentication with email {} and password succeeded, begin generating JWT Token", email);
                break;
            case REFRESH_TOKEN:
                var refToken = refTokenRepo.findByRefreshToken(authRequest.getRefreshToken())
                                           .orElseThrow();

                if (refToken.getExpiredOn().before(new Date()))
                    throw new SecurityException(ErrorCode.REFRESH_TOKEN_EXPIRED);
                user = refToken.getUser();
                if (user == null || user.getStatus() != UserStatus.ACTIVATED)
                    throw new SecurityException(ErrorCode.USER_NOT_EXIST);
                break;
            default:
                throw new IllegalArgumentException("Grant type cannot be null");
        }

        return processJwtResponse(user.getId());
    }

    private JwtResponse processJwtResponse(long userId) {
        var user = userRepo.findById(userId).orElseThrow(() -> new SecurityException(ErrorCode.ENTITY_NOT_FOUND));
        var claims = new HashMap<String, Object>();
        claims.put("scopes", user.getRole().toString());
        claims.put("name", user.getName());
        var res = jwtUtils.generateToken(claims, String.valueOf(user.getId()));
        var usrRefToken = refTokenRepo.findById(user.getId());
        if (usrRefToken.isPresent() && usrRefToken.get().getExpiredOn().after(new Date())) {
            log.debug("Found a valid refresh token of user with email {}", user.getEmail());
            res.setRefreshToken(usrRefToken.get().getRefreshToken());
        } else {
            if (usrRefToken.isPresent()) {
                refTokenRepo.deleteById(user.getId());
            }
            log.debug("Did not find a valid refresh token or refresh token expired, creating a new refresh token for " +
                    "user with email: {}", user.getEmail());
            res.setRefreshToken(UUID.randomUUID().toString().replace("-", "").toLowerCase());
            Date expiredDate = new Date(System.currentTimeMillis() + REFRESH_TOKEN_DURATION * 1000);
            RefreshToken refTokenEnt = new RefreshToken(res.getRefreshToken(), user, expiredDate);
            refTokenRepo.save(refTokenEnt);
            log.debug("A refresh token was created successfully with expiredDate {} for user with email {}",
                    expiredDate, user.getEmail());
        }

        return res;
    }

    @Override
    @Transactional
    public void logout() {
        Object principal = authFacade.getPrincipal();
        if (principal instanceof UserDetails) {
            final var userId = ((UserDetails) principal).getUserId();
            if (refTokenRepo.existsById(userId)) {
                refTokenRepo.deleteById(userId);
            }
        }
    }
}
