package com.mintpot.readingm.backend.security;


public interface AuthenticationFacade {

    UserDetails getAuthentication();

    boolean hasRole(String role);

    Object getPrincipal();

    void assertAdmin();
}
