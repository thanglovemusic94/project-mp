package com.mintpot.busking.filter;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

import javax.servlet.http.HttpServletRequest;

/**
 * Configuration to log request data during development, and skip in production.
 */

@Component
@Profile("!prd")
public class CustomRequestLoggingFilter extends CommonsRequestLoggingFilter {

    public static final String[] API_DOCS_PATHS = {
            "/v2/api-docs"
            , "/swagger-resources"
            , "/swagger-resources/**"
            , "/swagger-ui.html"
            , "/webjars/**"
            , "/csrf"
    };

    public CustomRequestLoggingFilter() {
        this.setIncludeQueryString(true);
        this.setIncludePayload(true);
        this.setMaxPayloadLength(10000);
        this.setIncludeHeaders(false);
        this.setAfterMessagePrefix("REQUEST DATA: ");
    }

    @Override
    protected boolean shouldLog(HttpServletRequest request) {
        String reqPath = request.getServletPath();
        if(!doMatch(reqPath, API_DOCS_PATHS)) {
            return logger.isDebugEnabled();
        } else return false;
    }

    @Override
    protected void beforeRequest(HttpServletRequest request, String message) {
        // Disable before request logging
    }

    private boolean doMatch(String path, String... antPaths) {
        AntPathMatcher antMatcher = new AntPathMatcher();
        for(String antPath : antPaths) {
            if(antMatcher.match(antPath, path)) return true;
        }

        return false;
    }
}
