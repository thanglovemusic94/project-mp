package com.mintpot.pii.service;

import com.mintpot.pii.security.JwtRequest;
import com.mintpot.pii.security.JwtResponse;

public interface AuthenticationService {

    JwtResponse authenticateForToken(JwtRequest authRequest);

    void logout();
}
