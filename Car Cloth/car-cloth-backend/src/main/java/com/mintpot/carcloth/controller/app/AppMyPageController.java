package com.mintpot.carcloth.controller.app;

import com.mintpot.carcloth.dto.*;
import com.mintpot.carcloth.dto.term.PrivacyDto;
import com.mintpot.carcloth.dto.term.TermDto;
import com.mintpot.carcloth.entity.embeddable.NoticeSetting;
import com.mintpot.carcloth.security.AuthenticationService;
import com.mintpot.carcloth.service.MyPageService;
import com.mintpot.carcloth.service.NotificationService;
import com.mintpot.carcloth.service.TermsPolicyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/app/my-page")
@Api(tags = {"My Page"})
@RequiredArgsConstructor
public class AppMyPageController {

    private final TermsPolicyService termsPolicyService;
    private final MyPageService myPageService;
    private final NotificationService notificationService;
    private final AuthenticationService authenticationService;
    private final ModelMapper mapper;

    @GetMapping("/member-info")
    @ApiOperation(value = "api for app get member info")
    @ResponseStatus(HttpStatus.OK)
    public MemberInfo getMemberInfo() {

        return myPageService.getMemberInfo();
    }

    @GetMapping("/notification")
    @ApiOperation(value = "api for app get all notification")
    @ResponseStatus(HttpStatus.OK)
    public Page<NotificationList> getNotification(Pageable pageable) {

        return notificationService.getMyPageNotifications(pageable);
    }

    @GetMapping("/notification/{id}")
    @ApiOperation(value = "api for app get notification detail")
    @ResponseStatus(HttpStatus.OK)
    public NotificationDetail getNotificationDetail(@PathVariable long id) {

        return notificationService.getNotificationDetail(id);
    }

    @GetMapping("/faq")
    @ApiOperation(value = "api for app get FAQ list")
    @ResponseStatus(HttpStatus.OK)
    public Page<FAQInfo> getFAQs(Pageable pageable) {

        return myPageService.getFAQs(pageable);
    }

    @GetMapping("/setting/account")
    @ApiOperation(value = "api for app get account info")
    @ResponseStatus(HttpStatus.OK)
    public AccountSetting getAccountInfo() {

        return myPageService.getAccountInfo();
    }

    @GetMapping("/setting/notice")
    @ApiOperation(value = "api for app get notice setting")
    @ResponseStatus(HttpStatus.OK)
    public NoticeSetting getNoticeSetting() {

        return myPageService.getNoticeSetting();
    }

    @PutMapping("/setting/notice")
    @ApiOperation(value = "api for app setup notice setting")
    @ResponseStatus(HttpStatus.OK)
    public void setupNoticeSetting(@RequestBody NoticeSetting setting) {

        myPageService.setupNoticeSetting(setting);
    }

    @GetMapping("/setting/term-of-use")
    @ApiOperation(value = "api for app get term of use")
    @ResponseStatus(HttpStatus.OK)
    public TermDto getTermOfUse() {

        return mapper.map(termsPolicyService.getTermsPolicy(), TermDto.class);
    }

    @GetMapping("/setting/privacy-policy")
    @ApiOperation(value = "api for app get privacy policy")
    @ResponseStatus(HttpStatus.OK)
    public PrivacyDto getPrivacyPolicy() {

        return mapper.map(termsPolicyService.getTermsPolicy(), PrivacyDto.class);
    }

    @DeleteMapping("/setting/withdraw")
    @ApiOperation(value = "api for member withdraw")
    @ResponseStatus(HttpStatus.OK)
    public void withdraw() {

        myPageService.withdraw();
    }

    @DeleteMapping("/logout")
    @ApiOperation(value = "api for member logout")
    @ResponseStatus(HttpStatus.OK)
    public void logout() {

        authenticationService.logout();
    }
}
