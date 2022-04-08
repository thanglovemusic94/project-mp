package com.mintpot.busking.filter;

import org.slf4j.MDC;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@Component
@Order(2)
@Profile("!dev")
public class Slf4jMDCFilter extends OncePerRequestFilter {

    public static final String RESPONSE_TOKEN_HEADER = "X-REQUEST-ID";
    public static final String MDC_UUID_TOKEN_KEY = "REQUEST_ID";
    public static final String REQUEST_TOKEN_HEADER = "X-REQUEST-ID";

    @Override
    protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response, final FilterChain chain)
            throws java.io.IOException, ServletException {
        try {
            final String token;
            if (!StringUtils.isEmpty(REQUEST_TOKEN_HEADER) && !StringUtils.isEmpty(request.getHeader(REQUEST_TOKEN_HEADER))) {
                token = request.getHeader(REQUEST_TOKEN_HEADER);
            } else {
                token = UUID.randomUUID().toString().toUpperCase().replace("-", "");
            }
            MDC.put(MDC_UUID_TOKEN_KEY, token);
            if (!StringUtils.isEmpty(RESPONSE_TOKEN_HEADER)) {
                response.addHeader(RESPONSE_TOKEN_HEADER, token);
            }
            chain.doFilter(request, response);
        } finally {
            MDC.remove(MDC_UUID_TOKEN_KEY);
        }
    }
}
