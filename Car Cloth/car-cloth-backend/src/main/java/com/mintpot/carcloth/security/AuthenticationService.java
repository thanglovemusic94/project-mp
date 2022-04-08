package com.mintpot.carcloth.security;

import com.mintpot.carcloth.constant.Role;
import org.springframework.transaction.annotation.Transactional;

public interface AuthenticationService {

    JwtResponse authenticateForToken(JwtRequest authRequest, Role role);

    JwtResponse processJwtResponse(long userId);

    void logout();
}
