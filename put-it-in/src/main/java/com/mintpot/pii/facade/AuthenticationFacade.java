package com.mintpot.pii.facade;


import com.mintpot.pii.security.UserDetails;

public interface AuthenticationFacade {

    UserDetails getAuthentication();

    boolean hasRole(String role);
}
