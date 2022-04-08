package com.mintpot.pii.security;

import com.mintpot.pii.SecurityConfiguration;
import lombok.extern.log4j.Log4j2;
import org.springframework.util.AntPathMatcher;

@Log4j2
public class SecurityUtils {

    private static final AntPathMatcher pathMatcher = new AntPathMatcher();

    public static boolean belongToWhitelist(String requestPath) {
        boolean isWhitelistPath = false;
        for (String whitelistPath : SecurityConfiguration.AUTH_WHITELIST) {
            if (pathMatcher.match(whitelistPath, requestPath)) {
                log.trace("Request path {} matches auth whitelist {}", requestPath, whitelistPath);
                isWhitelistPath = true;
                break;
            }
        }

        return isWhitelistPath;
    }
}
