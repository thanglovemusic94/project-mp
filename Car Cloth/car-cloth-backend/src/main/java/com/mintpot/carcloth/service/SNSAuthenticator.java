package com.mintpot.carcloth.service;

import com.mintpot.carcloth.security.JwtResponse;

public interface SNSAuthenticator {

    JwtResponse authenticate(String token);

    JwtResponse authenticate(String token, String userName);

    /*JwtResponse emailAuthenticate(String username, String password);

    JwtResponse mockAuthenticate (String userId);*/
}
