package com.mintpot.busking.facade;

import com.mintpot.busking.security.UserDetails;

public interface AuthenticationFacade {

    UserDetails getAuthentication();
}
