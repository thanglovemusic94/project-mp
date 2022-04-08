package com.mintpot.readingm.backend;

import com.mintpot.readingm.backend.security.AuthEntryPoint;
import com.mintpot.readingm.backend.security.AuthenticationFilter;
import com.mintpot.readingm.backend.security.AuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.Arrays;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    // @formatter:off
    public static final String[] AUTH_WHITELIST = {
            "/v2/api-docs"
            , "/swagger-resources"
            , "/swagger-resources/**"
            , "/configuration/ui"
            , "/configuration/security"
            , "/swagger-ui.html"
            , "/webjars/**"
            , "/csrf"
            , "/error"
            /* , "/api/users/**"
             , "/api/users/authenticate"
             , "/api/users/logout"*/
    };

    public static final String[] API_DOCS_PATHS = {
            "/v2/api-docs"
            , "/swagger-resources"
            , "/swagger-resources/**"
            , "/swagger-ui.html"
            , "/webjars/**"
            , "/csrf"
    };
    // @formatter:on
    private final AuthenticationProvider provider;

    @Autowired
    private AuthEntryPoint unauthorizedHandler;

    public SecurityConfiguration(AuthenticationProvider provider) {
        super();
        this.provider = provider;
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(provider);
    }

    @Bean
    AuthenticationFilter authenticationFilter() throws Exception {
        RequestMatcher rm = new NegatedRequestMatcher(new OrRequestMatcher(Arrays.stream(AUTH_WHITELIST)
                .map(AntPathRequestMatcher::new)
                .collect(Collectors.toList())));
        final var filter = new AuthenticationFilter(rm);
        filter.setAuthenticationManager(authenticationManager());
        return filter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().httpBasic().disable()
                .exceptionHandling()
                    .authenticationEntryPoint(unauthorizedHandler).and()
                .authenticationProvider(provider)
                .addFilterAfter(authenticationFilter(), AnonymousAuthenticationFilter.class)
                .authorizeRequests()
                /*.antMatchers(AUTH_WHITELIST).permitAll()
                .anyRequest().authenticated()*/
                .anyRequest().permitAll()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.headers().frameOptions().disable();
        http.cors();
    }
}