package com.mintpot.carcloth.security;


public interface AuthenticationFacade {

    UserDetails getAuthentication();

    boolean hasRole(String role);

    Object getPrincipal();
}
