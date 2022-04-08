package com.mintpot.readingm.backend.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserUtils {

    public String currentUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = "";
        if (authentication != null) {
            currentPrincipalName = authentication.getName();
        }

        return currentPrincipalName;
    }
}
