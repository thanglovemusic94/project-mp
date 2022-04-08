package com.mintpot.readingm.backend.user;

import org.springframework.transaction.annotation.Transactional;

public interface AuthenticationService {

    @Transactional
    default JwtResponse authenticateForToken(JwtRequest authRequest) {
        return authenticateForToken(authRequest, null);
    }

    JwtResponse authenticateForToken(JwtRequest authRequest, Role role);

    void logout();
}
