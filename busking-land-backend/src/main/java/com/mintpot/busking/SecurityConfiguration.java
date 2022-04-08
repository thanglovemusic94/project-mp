package com.mintpot.busking;

import com.mintpot.busking.filter.AuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationProvider;
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
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.stream.Collectors;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(2)
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
			, "/users/password_reset"
			, "/users/find_by_phone"
			, "/api/auth/**"
			, "/api/admins/**"
			, "/favorite/**"
			, "/auth/**"
			, "/error"
			, "/static/**"
			, "/css/**"
			, "/js/**"
			, "/img/**"
			, "/plugins/**"
			, "/api/tests/**"
			, "/web/**"
			, "/users/existByMail"
			, "/users/existByPhone"
			, "/busking_land/provinces"
			, "/busking_land/cities"

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
        RequestMatcher rm = new NegatedRequestMatcher(new OrRequestMatcher(Arrays.stream(AUTH_WHITELIST).map(AntPathRequestMatcher::new).collect(Collectors.toList())));
        final var filter = new AuthenticationFilter(rm);
       	filter.setAuthenticationManager(authenticationManager());
        return filter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().httpBasic().disable()
				.authenticationProvider(provider)
				.addFilterAfter(authenticationFilter(), AnonymousAuthenticationFilter.class)
				.authorizeRequests()
				.antMatchers(AUTH_WHITELIST).permitAll()
				.antMatchers("/admin/login").authenticated()
                .anyRequest().authenticated()
				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.headers().frameOptions().disable();

    }
}