package com.mintpot.busking.controller.api;

import com.mintpot.busking.api.apple.auth.dto.AppleJwtRequest;
import com.mintpot.busking.api.nice_id.NiceClient;
import com.mintpot.busking.api.nice_id.dto.NiceVerfDataDto;
import com.mintpot.busking.controller.ApiController;
import com.mintpot.busking.dto.JwtRequest;
import com.mintpot.busking.dto.JwtResponse;
import com.mintpot.busking.dto.JwtUserNamePassRequest;
import com.mintpot.busking.dto.UserRegDto;
import com.mintpot.busking.model.User;
import com.mintpot.busking.service.SNSAuthenticator;
import com.mintpot.busking.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/auth")
@Api(tags = {"Authentication"})
@Log4j2
public class AuthenticationController extends ApiController {

    private final SNSAuthenticator googleAuthenticator;

    private final SNSAuthenticator appleAuthenticator;

    private final SNSAuthenticator naverAuthenticator;

    private final SNSAuthenticator kakaoAuthenticator;

    private final SNSAuthenticator facebookAuthenticator;

    private final SNSAuthenticator mailAuthenticator;

    private final SNSAuthenticator mockAuthenticator;

    private final SNSAuthenticator refreshTokenAuthenticator;

    private final NiceClient niceClient;

    private final UserService userService;


    public AuthenticationController(SNSAuthenticator googleAuthenticator
            , SNSAuthenticator appleAuthenticator
            , SNSAuthenticator naverAuthenticator
            , SNSAuthenticator kakaoAuthenticator
            , SNSAuthenticator facebookAuthenticator
            , SNSAuthenticator mailAuthenticator
            , SNSAuthenticator refreshTokenAuthenticator
            , SNSAuthenticator mockAuthenticator, NiceClient niceClient, UserService userService) {
        this.googleAuthenticator = googleAuthenticator;
        this.appleAuthenticator = appleAuthenticator;
        this.naverAuthenticator = naverAuthenticator;
        this.kakaoAuthenticator = kakaoAuthenticator;
        this.facebookAuthenticator = facebookAuthenticator;
        this.mailAuthenticator = mailAuthenticator;
        this.refreshTokenAuthenticator = refreshTokenAuthenticator;
        this.mockAuthenticator = mockAuthenticator;
        this.niceClient = niceClient;
        this.userService = userService;
    }

    @PostMapping("/google")
    @ApiOperation("Google Sign In")
    JwtResponse googleAuthentication(@RequestBody JwtRequest req) {
        return googleAuthenticator.authenticate(req.getToken());
    }

    @PostMapping("/apple")
    @ApiOperation("Apple Sign In")
    JwtResponse appleAuthentication(@RequestBody AppleJwtRequest req) {
        return appleAuthenticator.authenticate(req.getToken(), req.getAppleUserName());
    }

    @PostMapping("/naver")
    @ApiOperation("Naver Sign In")
    JwtResponse naverAuthentication(@RequestBody JwtRequest req) {
        return naverAuthenticator.authenticate(req.getToken());
    }

    @PostMapping("/kakao")
    @ApiOperation("Kakao Sign In")
    JwtResponse kakaoAuthentication(@RequestBody JwtRequest req) {
        return kakaoAuthenticator.authenticate(req.getToken());
    }

    @PostMapping("/facebook")
    @ApiOperation("Facebook Sign In")
    JwtResponse facebookAuthentication(@RequestBody JwtRequest req) {
        return facebookAuthenticator.authenticate(req.getToken());
    }

    @PostMapping("/mail")
    @ApiOperation("Mail Sign In")
    JwtResponse mailAuthentication (@RequestBody JwtUserNamePassRequest req) {
        return mailAuthenticator.emailAuthenticate(req.getUsername(), req.getPassword());
    }

    @PostMapping("/refresh")
    @ApiOperation("Refresh Token")
    JwtResponse refreshToken(@RequestBody JwtRequest req) {
        return refreshTokenAuthenticator.authenticate(req.getToken());
    }

    @GetMapping("/accessToken")
    JwtResponse getAccessTokenByUserId(@RequestParam int userId) {
        return mockAuthenticator.mockAuthenticate(String.valueOf(userId));
    }

    @GetMapping("niceId")
    NiceVerfDataDto personalVerification() {
        return niceClient.personalVerification();
    }

    @PostMapping(value = "/registration/mail")
    @ApiOperation("Registration User Email Type")
    @ResponseStatus(HttpStatus.CREATED)
    JwtResponse registrationUser (@RequestBody UserRegDto regDto) {
        User user = userService.createUser(regDto);
        if(user.getId() > 0) {
            // after create user success >> login
            return mailAuthenticator.emailAuthenticate(regDto.getEmail(), regDto.getPassword());
        }
        return null;
    }

}
