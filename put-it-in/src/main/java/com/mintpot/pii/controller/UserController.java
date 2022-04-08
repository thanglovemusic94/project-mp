package com.mintpot.pii.controller;

import com.github.javafaker.Faker;
import com.mintpot.pii.dto.PhoneVerfDto;
import com.mintpot.pii.dto.ResetPswdRequestDto;
import com.mintpot.pii.dto.UserDto;
import com.mintpot.pii.entity.User;
import com.mintpot.pii.entity.constant.UserStatus;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.repository.UserRepository;
import com.mintpot.pii.utils.AesUtils;
import com.mintpot.solapi.SolapiApiClient;
import com.mintpot.solapi.constants.MessageType;
import com.mintpot.solapi.dto.Message;
import io.swagger.annotations.Api;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("/api/users")
@Api("Users")
public class UserController {

    private final int VERIFICATION_NO_DIGITS = 4;

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final Faker krFaker;
    private final AesUtils aesUtils;
    private final SolapiApiClient solapiApiClient;
    private final ModelMapper modelMapper;

    public UserController(PasswordEncoder passwordEncoder, UserRepository userRepo, Faker krFaker, AesUtils aesUtils,
                          SolapiApiClient solapiApiClient, ModelMapper modelMapper) {
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
        this.krFaker = krFaker;
        this.aesUtils = aesUtils;
        this.solapiApiClient = solapiApiClient;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    void signUp(@RequestBody UserDto userDto) {
        if (!StringUtils.isEmpty(userDto.getPassword())) {
            userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        userDto.setStatus(UserStatus.ACTIVATED);
        userRepo.save(modelMapper.map(userDto, User.class));
    }

    @GetMapping(
            path = "/verify/phone",
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    @PreAuthorize("permitAll()")
    String sendPhoneVerification(@RequestParam String phoneNo) throws Exception {
        final var verfStr = krFaker.regexify("[0-9]{" + VERIFICATION_NO_DIGITS + "}");
        Message msg = Message.builder()
                .text("Your verification number is: " + verfStr)
                .type(MessageType.SMS)
                .to(phoneNo)
                .build();
        solapiApiClient.sendSingleMessage(msg);
        log.info("Phone Verification requested for phone number {} and verification number is: {}", phoneNo, verfStr);
        return aesUtils.encryptWithPrefixIV(verfStr + phoneNo);
    }

    @PostMapping(
            path = "/verify/phone",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    @PreAuthorize("permitAll()")
    ResponseEntity<Void> confirmVerificationNo(@RequestBody PhoneVerfDto phoneVerfDto) throws Exception {
        final var verfStr = aesUtils.encryptWithPrefixIV(phoneVerfDto.getVerfNo() + phoneVerfDto.getPhoneNo());

        if (verfStr.equalsIgnoreCase(phoneVerfDto.getSig()))
            return ResponseEntity.noContent().build();
        else return ResponseEntity.badRequest().build();
    }

    @GetMapping("/search/existsByEmail")
    @PreAuthorize("permitAll()")
    boolean existsByEmail(@RequestParam String email) {
        return userRepo.existsByEmail(email);
    }

//    @GetMapping("/search/existsByPhone")
//    @PreAuthorize("permitAll()")
//    ResponseEntity<User> existsByPhone(@RequestParam String phone) {
//        Optional<User> user = userRepo.findByPhoneAndStatus(phone, UserStatus.ACTIVATED);
//        if (user.isEmpty()) {
//            return new ResponseEntity<User>(new User(), HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<User>(user.get(), HttpStatus.FOUND);
//    }

    @PostMapping(
            path = "/verify/existsByPhone",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    @PreAuthorize("permitAll()")
    ResponseEntity<User> confirmVerificationNoAndPhoneNo(@RequestBody PhoneVerfDto phoneVerfDto) throws Exception {
        final var verfStr = aesUtils.encryptWithPrefixIV(phoneVerfDto.getVerfNo() + phoneVerfDto.getPhoneNo());

        if (verfStr.equalsIgnoreCase(phoneVerfDto.getSig()))
        {
            Optional<User> user = userRepo.findByPhoneAndStatus(phoneVerfDto.getPhoneNo(), UserStatus.ACTIVATED);
            if (user.isEmpty()) {
                return new ResponseEntity<User>(new User(), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<User>(user.get(), HttpStatus.OK);
        }
        else return ResponseEntity.badRequest().build();
    }

    @PostMapping("/resetPswd")
    @PreAuthorize("permitAll()")
    ResponseEntity<?> resetPassword(@RequestBody ResetPswdRequestDto rstPswdDto) throws Exception {
        final var verfStr = aesUtils.encryptWithPrefixIV(rstPswdDto.getVerfNo() + rstPswdDto.getPhoneNo());
        if (!verfStr.equalsIgnoreCase(rstPswdDto.getSig())) {
            return ResponseEntity.badRequest().build();
        }
        if (!userRepo.existsByEmailAndNameAndPhoneAndStatus(rstPswdDto.getEmail(), rstPswdDto.getName(), rstPswdDto.getPhoneNo(),
                UserStatus.ACTIVATED))
            return ResponseEntity.badRequest().build();

        var expiredOn = new Date().getTime() + 5 * 60 * 1000;
        return ResponseEntity.ok(aesUtils.encryptWithPrefixIV(rstPswdDto.getEmail() + "@" + expiredOn));
    }

    @PostMapping("/resetPswd/confirm")
    @PreAuthorize("permitAll()")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void changePassword(@RequestParam String sig, @RequestBody Map<String, Object> newPswd) throws Exception {
        final var decSig = aesUtils.decryptWithPrefixIV(sig);
        final var expiredOn = new Date(Long.parseLong(decSig.split("@")[2]));
        if (expiredOn.before(new Date()))
            throw new BusinessException(ErrorCode.AUTH_RESET_PASSWORD_SIG_EXPIRED);

        final var email = decSig.split("@")[0] + "@" + decSig.split("@")[1];
        final var newPassword = newPswd.get("newPassword").toString();
        userRepo.updatePasswordByEmail(email, passwordEncoder.encode(newPassword));
    }
}
