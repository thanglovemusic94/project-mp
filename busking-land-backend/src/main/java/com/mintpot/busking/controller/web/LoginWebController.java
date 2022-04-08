package com.mintpot.busking.controller.web;

import com.mintpot.busking.dto.web.request.LoginRequest;
import com.mintpot.busking.dto.web.response.JwtResponseWeb;
import com.mintpot.busking.model.Favorite;
import com.mintpot.busking.model.SNSInfo;
import com.mintpot.busking.model.User;
import com.mintpot.busking.model.constant.SNSType;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.security.jwt.JwtUtilsWeb;
import com.mintpot.busking.security.services.UserDetailsImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;


@RestController
@Api(tags = {"Web Login Api"})
@CrossOrigin(origins = {"${settings.cors_origin}"})
@RequestMapping("/web/api/auth")
@Log4j2
public class LoginWebController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtilsWeb jwtUtilsWeb;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @ApiOperation("Signin")
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtilsWeb.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        System.out.println(userDetails.getUsername()+"--"+userDetails.getPassword());
        return ResponseEntity.ok(new JwtResponseWeb(jwt,userDetails.getId(), userDetails.getUsername(),userDetails.getEmail()));

    }
    @ApiOperation("Create Admin")
    @GetMapping("/createadmin")
    public ResponseEntity<?> authenticateUser() {
        User user = new User();
        user.setName("admin");
        user.setEmail("admin@gmail.com");
        SNSInfo snsInfo = new SNSInfo();
        snsInfo.setUser(user);
        snsInfo.setSnsId("");
        snsInfo.setType(SNSType.MAIL);

        user.setSnsInfo(snsInfo);
        user.setPointAmount(0);
        user.setAgreePolicy(true);
        user.setPassword(passwordEncoder.encode("adminadmin"));
        userRepository.save(user);
        return ResponseEntity.ok(user);

    }

}

