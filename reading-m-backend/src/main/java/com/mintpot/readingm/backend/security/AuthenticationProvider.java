package com.mintpot.readingm.backend.security;

import com.mintpot.readingm.backend.user.UserRepository;
import com.mintpot.readingm.backend.user.UserStatus;
import io.jsonwebtoken.ExpiredJwtException;
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
    protected void additionalAuthenticationChecks(org.springframework.security.core.userdetails.UserDetails userDetails,
                                                  UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken)
        throws AuthenticationException {

    }

    @Override
    protected UserDetails retrieveUser(String username,
                                       UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        log.debug(">>load user detail from DB: for user_name:" + username);
        String jwtToken = authentication.getCredentials().toString();
        try {
            long userId = Long.parseLong(jwtUtils.getSubjectFromToken(jwtToken));

            if (StringUtils.isEmpty(userId))
                throw new UsernameNotFoundException("Login token does not contain user email");

            // Once we get the token validate it.
            log.debug("Querying user info with info from the token");

            var user = userRepo.findById(userId).filter(opt -> opt.getStatus() == UserStatus.ACTIVATED)
                               .orElseThrow(
                                       () -> new UsernameNotFoundException("Could not find user with userId " + userId));

            // if token is valid configure Spring Security to manually set
            // authentication
            log.debug("Found user with details from Bearer token, returning UserDetails");
            UserDetails uDetail = new UserDetails(user);
            log.debug("create uDetail success, userDetail:" + uDetail);
            return uDetail;
        } catch (ExpiredJwtException ex) {
            throw new AccountExpiredException("Login token is expired");
        }
    }
}
