package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.WithdrawReqDto;
import com.mintpot.readingm.backend.dto.admin.WithdrawalDto;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.WithdrawalService;
import com.mintpot.readingm.backend.user.AuthenticationService;
import com.mintpot.readingm.backend.user.Role;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/withdrawal")
@Api(tags = {"Withdrawal"})
@RequiredArgsConstructor
public class WithdrawalController {

    private final WithdrawalService withdrawalService;
    private final AuthenticationService authService;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping
    public Page<WithdrawalDto> getList(@RequestParam(required = false) Role memberType,
                                       @RequestParam(required = false) String optionSearch,
                                       @RequestParam(required = false) String term,
                                       Pageable page)  {

        authenticationFacade.assertAdmin();
        return withdrawalService.find(memberType, optionSearch, term, page);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("isAuthenticated()")
    public void requestWithdraw(@RequestBody @Valid WithdrawReqDto dto) {
        long userId = authenticationFacade.getAuthentication().getUserId();
        withdrawalService.requestWithdraw(userId, dto);
        authService.logout();
    }

    @PatchMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void approveTutorWithdrawal(@RequestParam Long id) {
        authenticationFacade.assertAdmin();
        withdrawalService.approveTutorWithdrawal(id);
    }
}
