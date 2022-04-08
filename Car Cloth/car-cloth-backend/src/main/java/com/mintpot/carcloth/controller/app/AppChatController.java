package com.mintpot.carcloth.controller.app;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.mintpot.carcloth.constant.UserStatus;
import com.mintpot.carcloth.constant.enums.ENoticeType;
import com.mintpot.carcloth.dto.*;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.CompanyQuoteRepository;
import com.mintpot.carcloth.security.AuthenticationFacade;
import com.mintpot.carcloth.security.UserDetails;
import com.mintpot.carcloth.service.NoticeService;
import com.mintpot.carcloth.utils.StorageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URL;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/app/chat")
@Api(tags = {"Chat"})
@RequiredArgsConstructor
public class AppChatController {
    private static final String STORAGE_PATH = "chat/%s/";
    private static final String NOTICE_FIRST_MESS = "고객님이 상담을 요청했습니다.";
    private static final String NOTICE_NEW_MESS = "메시지가 도착했습니다.";

    private final FirebaseAuth firebaseAuth;
    private final CompanyQuoteRepository companyQuoteRepo;
    private final StorageService storageService;
    private final NoticeService noticeService;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping("/token")
    @ApiOperation(value = "api for app get custom token to authenticate with firebase")
    @ResponseStatus(HttpStatus.OK)
    public FirebaseToken getTokenFirebase() throws FirebaseAuthException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails member = (UserDetails) authentication.getPrincipal();

        //joining authority
        String authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        String customToken = firebaseAuth.createCustomToken(member.getMemberId(),
                Collections.singletonMap("authorities", authorities));

        return new FirebaseToken(customToken);
    }

    @GetMapping("/{channelId}/check-available")
    @ApiOperation(value = "api for app check available when go to chatting screen")
    @ResponseStatus(HttpStatus.OK)
    public AvailableChat checkAvailable(@PathVariable long channelId) {

        var companyQuote = companyQuoteRepo.findById(channelId)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        var companyUser = companyQuote.getCompany().getRequestUser();
        var requester = companyQuote.getTransaction().getRequester();

        AvailableChat rs = new AvailableChat(true, companyQuote.getStatus());

        if(companyUser.getStatus() == UserStatus.INACTIVATED ||
        requester.getStatus() == UserStatus.INACTIVATED) {
            rs.setAvailable(false);
        }

        return rs;
    }

    @GetMapping(value = "/presigned-url/{channelId}")
    @ApiOperation(value = "api get presigned url for image")
    public FileInfoChat getPresignedUrl(@PathVariable long channelId) {
        final String objectKey = String.format(STORAGE_PATH, channelId)
                + System.currentTimeMillis() + "_image.jpg";

        return new FileInfoChat(storageService.getPresignedUrl(objectKey, true), objectKey);
    }

    @PostMapping(value = "/{channelId}/push-notice")
    @ApiOperation(value = "api push notice for message chat")
    public void pushNotice(@PathVariable long channelId, @Valid @RequestBody ChattingPushNoticeReq req) {

        var companyQuote = companyQuoteRepo.findById(channelId)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        var companyUser = companyQuote.getCompany().getRequestUser();
        var requester = companyQuote.getTransaction().getRequester();

        var userId = authenticationFacade.getAuthentication().getUserId();

        if(req.isFirstMess()) {
            if(userId == requester.getId()) {
                if(companyUser.getNoticeSetting().isChattingNotice()) {
                    noticeService.createNotice(ENoticeType.CHAT_MESSAGE, companyUser, NOTICE_FIRST_MESS, channelId);
                }
            }
        } else {
            if(userId == requester.getId()) {
                if(companyUser.getNoticeSetting().isChattingNotice()) {
                    noticeService.createNotice(ENoticeType.CHAT_MESSAGE, companyUser, NOTICE_NEW_MESS, channelId);
                }
            } else {
                if(requester.getNoticeSetting().isChattingNotice()) {
                    noticeService.createNotice(ENoticeType.CHAT_MESSAGE, requester, NOTICE_NEW_MESS, channelId);
                }
            }
        }
    }

    @GetMapping("/{channelId}/name-info-chat")
    @ApiOperation(value = "api for app get name info when go to chatting screen")
    @ResponseStatus(HttpStatus.OK)
    public List<NameInfoChat> nameInfoChat(@PathVariable long channelId) {

        var companyQuote = companyQuoteRepo.findById(channelId)
                .orElseThrow(() -> new CommonException(ErrorCode.QUOTATION_NOT_FOUND));

        var user = companyQuote.getTransaction().getRequester();
        var company = companyQuote.getCompany();

        return Arrays.asList(new NameInfoChat(user.getMemberId(), user.getName()),
                new NameInfoChat(company.getRequestUser().getMemberId(), company.getCompanyName()));
    }

    @GetMapping("/get-url-by-object-key")
    @ApiOperation(value = "api for app get get url by object key")
    @ResponseStatus(HttpStatus.OK)
    public URL getUrlFileByObjectKey(@RequestParam String objectKey) {

        URL url = null;

        if(!StringUtils.isEmpty(objectKey)) {
            url = storageService.generateAbsoluteUrl(objectKey);
        }

        return url;
    }
}
