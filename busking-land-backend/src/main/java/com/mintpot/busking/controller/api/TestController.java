package com.mintpot.busking.controller.api;

import com.mintpot.busking.api.apple.inapp.AppStoreService;
import com.mintpot.busking.api.apple.inapp.VerifyReceiptReq;
import com.mintpot.busking.api.facebook.FacebookApiClient;
import com.mintpot.busking.api.google.GoogleApiClient;
import com.mintpot.busking.api.google.GoogleApiClientImpl;
import com.mintpot.busking.api.google_inapp.GoogleInAppClient;
import com.mintpot.busking.api.google_inapp.dto.GoogleReceipt;
import com.mintpot.busking.api.google_inapp.dto.ReceiptInfo;
import com.mintpot.busking.api.kakao.KakaoApiClient;
import com.mintpot.busking.api.naver.NaverApiClient;
import com.mintpot.busking.api.naver.UserInfo;
import com.mintpot.busking.api.naver_stream.NaverStreamingApiClient;
import com.mintpot.busking.api.naver_stream.dto.NaverChannelInfo;
import com.mintpot.busking.api.naver_stream.dto.NaverQualitySetList;
import com.mintpot.busking.api.solapi.SolapiApiClient;
import com.mintpot.busking.api.solapi.dto.Message;
import com.mintpot.busking.controller.ApiController;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.repository.PointChargeTypeRepository;
import com.mintpot.busking.service.BuskingService;
import com.mintpot.busking.service.EmailService;
import com.mintpot.busking.service.ExcelImportService;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.MessageSource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

@RestController
@Log4j2
public class TestController extends ApiController {

    private final SolapiApiClient solapiApiClient;
    private final NaverApiClient naverApiClient;
    private final KakaoApiClient kakaoApiClient;
    private final FacebookApiClient facebookApiClient;
    private final GoogleApiClient googleAuthenticator;
    private final GoogleInAppClient googleInAppClient;
    private final PointChargeTypeRepository pChargeTypeRepo;
    private final MessageSource messageSource;
    private final BuskingService buskingService;
    private final NaverStreamingApiClient naverStreamingApiClient;
    private final AppStoreService appStoreService;
    private final ExcelImportService excelImportService;
    private final EmailService emailService;


    public TestController(SolapiApiClient solapiApiClient, NaverApiClient naverApiClient, KakaoApiClient kakaoApiClient,
                          FacebookApiClient facebookApiClient, GoogleApiClientImpl googleApiClient, GoogleInAppClient googleInAppClient, PointChargeTypeRepository pChargeTypeRepo, MessageSource messageSource, BuskingService buskingService, NaverStreamingApiClient naverStreamingApiClient, AppStoreService appStoreService, ExcelImportService excelImportService, EmailService emailService) {
        this.solapiApiClient = solapiApiClient;
        this.naverApiClient = naverApiClient;
        this.kakaoApiClient = kakaoApiClient;
        this.facebookApiClient = facebookApiClient;
        this.googleAuthenticator = googleApiClient;
        this.googleInAppClient = googleInAppClient;
        this.pChargeTypeRepo = pChargeTypeRepo;
        this.messageSource = messageSource;
        this.buskingService = buskingService;
        this.naverStreamingApiClient = naverStreamingApiClient;
        this.appStoreService = appStoreService;
        this.excelImportService = excelImportService;
        this.emailService = emailService;
    }

    @PostMapping("/tests")
    String test(@RequestParam("date")
                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
    }

    @PostMapping("/tests/sms/send")
    void sendSMS(
            @RequestBody String text) {
        Message message = Message.builder().text(text).to("01028567791").build();
        var resp = solapiApiClient.sendSingleMessage(message);
        log.info("Call API Solapi: " + resp.getStatusMessage());
    }

    @PostMapping("/tests/naver")
    UserInfo naverLogin (@RequestBody String naverToken) {
        return naverApiClient.getUserInfo(naverToken).get();
    }

    @PostMapping("/tests/kakao")
    void kakaoLogin (@RequestBody String kakaoToken) {
        kakaoApiClient.getUserInfo(kakaoToken);
    }

    @PostMapping("/tests/facebook")
    void facebookLogin (@RequestBody String facebookToken) {facebookApiClient.getUserInfo(facebookToken);}

    @PostMapping("/tests/google")
    void googleLogin (@RequestBody String googleToken) {
        googleAuthenticator.getUserInfo(googleToken);
    }

    @GetMapping("/tests/findBusking")
    void findBusking (@RequestParam("lat") Double lat, @RequestParam("lng") Double lng) {
        buskingService.getBuskingLiveInNearBy(lat, lng);
    }

    @GetMapping("/tests/naverChannelList")
    void naverChannelList () {
        naverStreamingApiClient.getNaverChannels();
    }

    @PostMapping("/tests/naverCreateChannel")
    NaverChannelInfo naverCreateChannel (@RequestBody String channelId) {
        return naverStreamingApiClient.createNaverChannel(channelId);
    }

    @GetMapping("/tests/naverQualitySetList")
    NaverQualitySetList naverQualitySetLis () { return naverStreamingApiClient.getNaverQualitySets(); }

    @PostMapping("/tests/iosChargePoint")
    void iosChargePoint (VerifyReceiptReq receiptData) {
        var receiptInfo = appStoreService.verifyReceipt(receiptData);
        log.error(receiptInfo.getTransactionId());
        log.error(receiptInfo.getProductId());
    }

    @PostMapping("/tests/buskinglands_import")
    void importExcelLands (@RequestParam("file") MultipartFile file) {
        try {
            excelImportService.excelLands(file.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/tests/base64decode")
    String base64Decode (@RequestBody String signature) {
//        ReceiptInfo receiptInfo = googleInAppClient.verifyPurchase(googleReceipt);
//        byte[] dataBytes = Base64.getEncoder().encode(googleReceipt.getSignature().getBytes(StandardCharsets.UTF_8));
        byte[] signatureBytes = Base64.getDecoder().decode(signature);
        signatureBytes = Base64.getDecoder().decode(signatureBytes);
        return "SUCCESS" + new String(signatureBytes);
    }

    @PostMapping("/tests/googleInApp")
    String googleInAppVerify (@RequestBody GoogleReceipt googleReceipt) {
        ReceiptInfo receiptInfo = googleInAppClient.verifyPurchase(googleReceipt);
        var chargeType = pChargeTypeRepo.findById(receiptInfo.getProductId().replace("busking_", ""))
                .orElseThrow(() -> new BusinessException(ErrorCode.APPSTORE_PRODUCT_ID_NOT_FOUND));
        return "SUCCESS " + receiptInfo.getProductId() + ", charge: " + chargeType.getPointAmount();
    }

    @PostMapping("/tests/approveBusking")
    void approveBusking (@RequestBody int buskingId) {
        buskingService.approved(buskingId);
    }

    @PostMapping("/tests/sendMail")
    void sendMail (@RequestBody String message) {
        emailService.sendTestMail();
    }
}
