package com.mintpot.busking.facade.impl;

import com.mintpot.busking.facade.AuthenticationFacade;
import com.mintpot.busking.security.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacadeImpl implements AuthenticationFacade {

    @Override
    public UserDetails getAuthentication() {
        return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
