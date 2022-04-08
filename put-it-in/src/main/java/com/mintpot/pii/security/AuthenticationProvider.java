package com.mintpot.pii.security;

import com.mintpot.pii.entity.constant.UserStatus;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.repository.UserRepository;
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

    private final UserRepository userRepo;

    private final JwtUtils jwtUtils;

    public AuthenticationProvider(UserRepository userRepo, JwtUtils jwtUtils) {
        this.userRepo = userRepo;
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void additionalAuthenticationChecks(org.springframework.security.core.userdetails.UserDetails userDetails, UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {

    }

    @Override
    protected UserDetails retrieveUser(String username,
                                       UsernamePasswordAuthenticationToken authentication) throws AuthenticationException, BusinessException {
        String jwtToken = authentication.getCredentials().toString();
        if (jwtUtils.isTokenExpired(jwtToken))
            throw new AccountExpiredException("Login token is expired");
        String email = jwtUtils.getUserEmailFromToken(jwtToken);

        if (StringUtils.isEmpty(email))
            throw new UsernameNotFoundException("Login token does not contain user email");

        // Once we get the token validate it.
        log.debug("Querying user info with info from the token");

        var user = userRepo.findByEmailAndStatus(email, UserStatus.ACTIVATED)
                .orElseThrow(() -> new UsernameNotFoundException("Could not find user with email " + email));

        // if token is valid configure Spring Security to manually set
        // authentication
        log.debug("Found user with details from Bearer token, returning UserDetails");
        return new UserDetails(user);
    }
}
