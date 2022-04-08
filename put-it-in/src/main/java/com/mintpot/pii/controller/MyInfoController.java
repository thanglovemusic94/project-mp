package com.mintpot.pii.controller;

import com.mintpot.pii.dto.ChangePasswordDto;
import com.mintpot.pii.dto.PasswordDto;
import com.mintpot.pii.entity.Bookmark;
import com.mintpot.pii.entity.Inquiry;
import com.mintpot.pii.entity.Reservation;
import com.mintpot.pii.entity.User;
import com.mintpot.pii.entity.UserCard;
import com.mintpot.pii.entity.constant.ReservationStatus;
import com.mintpot.pii.entity.constant.UserStatus;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.facade.AuthenticationFacade;
import com.mintpot.pii.repository.BookmarkRepository;
import com.mintpot.pii.repository.InquiryRepository;
import com.mintpot.pii.repository.ReservationRepository;
import com.mintpot.pii.repository.UserCardRepository;
import com.mintpot.pii.repository.UserRepository;
import com.mintpot.pii.security.JwtRequest;
import com.mintpot.pii.security.JwtResponse;
import com.mintpot.pii.service.AuthenticationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/me")
@PreAuthorize("hasRole('ROLE_USER')")
@Api(tags = {"My Info"})
@RequiredArgsConstructor
public class MyInfoController {

    private final AuthenticationService authService;

    private final UserRepository userRepo;
    private final UserCardRepository cardRepo;
    private final ReservationRepository reservationRepo;
    private final BookmarkRepository bookmarkRepo;
    private final InquiryRepository inquiryRepo;

    private final AuthenticationFacade authFacade;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    Optional<User> getMyUserInfo() {
        final var userId = authFacade.getAuthentication().getUserId();

        return userRepo.findById(userId);
    }

    @PostMapping(path = "/authenticate")
    @PreAuthorize("permitAll()")
    /*@ApiOperation(value = "User's Authentication.", notes = "API to authenticate, depends on grant type will proceed " +
            "authenticating user and return a JWT access token and refresh token")*/
    JwtResponse login(@RequestBody JwtRequest authRequest) {
        return authService.authenticateForToken(authRequest);
    }

    @PostMapping(path = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void logout() {
        authService.logout();
    }

    @PatchMapping("/password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void changePassword(@RequestBody ChangePasswordDto chgPswdDto) {
        final var userId = authFacade.getAuthentication().getUserId();

        this.verifyPassword(chgPswdDto);

        final var newPswd = chgPswdDto.getNewPassword();
        var user = userRepo.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_TOKEN_USER_NOT_FOUND));

        user.setPassword(passwordEncoder.encode(newPswd));
        userRepo.save(user);
    }

    @PostMapping("/password/verify")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(
            value = "Verify Password",
            notes = "Verify password of logged in user, used when it's needed to reauthorize user (i.e. My Information screen's prompt for password)")
    void verifyPassword(@RequestBody PasswordDto reqBdy) {
        final var userId = authFacade.getAuthentication().getUserId();

        var user = userRepo.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_TOKEN_USER_NOT_FOUND));

        if (user.getStatus() != UserStatus.ACTIVATED)
            throw new BusinessException(ErrorCode.USER_ILLEGAL_STATUS);

        final var curPswd = reqBdy.getCurPassword();

        // Compare user pswd in database with input current pswd. if they matches then change password to the new one.
        if (!passwordEncoder.matches(curPswd, user.getPassword()))
            throw new BusinessException(ErrorCode.USER_WRONG_CURRENT_PASSWORD);
    }

    @GetMapping("/cards")
    @ApiOperation("My Cards")
    List<UserCard> getMyCards() {
        final var userId = authFacade.getAuthentication().getUserId();
        return cardRepo.findByUserId(userId);
    }

    @GetMapping("/reservations")
    @ApiOperation("My Usage History")
    List<Reservation> getMyUsageHistory() {
        final var userId = authFacade.getAuthentication().getUserId();
        return reservationRepo.findByUserIdAndStatusNot(userId, ReservationStatus.PENDING);
    }

    @GetMapping("/inquiries")
    @ApiOperation("My 1:1 Inquiries")
    Page<Inquiry> getMyInquiries(Pageable page) {
        final var userId = authFacade.getAuthentication().getUserId();
        return inquiryRepo.findByUserId(userId, page);
    }
}
