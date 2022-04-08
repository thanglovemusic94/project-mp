package com.mintpot.busking.service;

import com.mintpot.busking.dto.JwtResponse;

public interface SNSAuthenticator {

    JwtResponse authenticate(String token);

    JwtResponse authenticate(String token, String userName);

    JwtResponse emailAuthenticate(String username, String password);

    JwtResponse mockAuthenticate (String userId);
}
