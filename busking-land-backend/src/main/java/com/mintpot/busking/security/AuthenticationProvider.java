package com.mintpot.busking.security;

import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.service.UserService;
import com.mintpot.busking.utils.JwtUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@Log4j2
public class AuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

    private final UserService userService;

    private final JwtUtils jwtUtils;

    public AuthenticationProvider(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void additionalAuthenticationChecks(org.springframework.security.core.userdetails.UserDetails userDetails
            , UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {
    }

    @Override
    protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException, BusinessException {
        String jwtToken = authentication.getCredentials().toString();
        try {
            if (jwtUtils.isTokenExpired(jwtToken))
                throw new AccountExpiredException("Login token is expired");
        } catch (Exception exception) {
            throw new AccountExpiredException("Login token is expired 2");
        }
        int userId = Integer.parseInt(jwtUtils.getSubject(jwtToken));
        if (StringUtils.isEmpty(userId))
            throw new UsernameNotFoundException("Login token does not contain userId");

        // Once we get the token validate it.
        log.debug("Querying user info with info from the token");

        var user = userService.getUserDetails(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // if token is valid configure Spring Security to manually set
        // authentication
        log.debug("Found user with details from Bearer token, returning UserDetails");
        var userDetails = new UserDetails(user);
//        userDetails.setAuthorities();
        //check in table admin if userId exists - set user authorities to admin
        return userDetails;
    }
}
