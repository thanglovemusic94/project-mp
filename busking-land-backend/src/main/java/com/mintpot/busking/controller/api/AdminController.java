package com.mintpot.busking.controller.api;

import com.mintpot.busking.controller.ApiController;
import com.mintpot.busking.dto.JwtResponse;
import com.mintpot.busking.service.SNSAuthenticator;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController extends ApiController {

    private final SNSAuthenticator mockAuthenticator;

    public AdminController(SNSAuthenticator mockAuthenticator) {
        this.mockAuthenticator = mockAuthenticator;
    }

    @GetMapping("/admins/accessToken")
    JwtResponse getAccessTokenByUserId(@RequestParam int userId) {
        return mockAuthenticator.mockAuthenticate(String.valueOf(userId));
    }
}
