package com.mintpot.busking.controller.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.mintpot.busking.controller.ApiController;
import com.mintpot.busking.dto.api.FcmTokenDto;
import com.mintpot.busking.dto.NoticeDto;
import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.model.constant.NotificationType;
import com.mintpot.busking.service.FCMService;
import io.swagger.annotations.Api;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = { "FCM Token" })
@RequestMapping(path = "/fcm")
@Log4j2
public class FcmTokenController extends ApiController {

    private final FCMService fcmService;

    public FcmTokenController(FCMService fcmService) {
        this.fcmService = fcmService;
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    void putFcmToken(@RequestBody FcmTokenDto dto) {
        fcmService.putFCMToken(dto.getToken());
    }

    @PostMapping("/test")
    @ResponseStatus(HttpStatus.CREATED)
    void sendTestFcm (@RequestBody NoticeDto noticeDto) {
        noticeDto.setNotiType(NotificationType.NOTIFICATION_NEW_ANNOUNCEMENT);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            fcmService.sendPushNoticeToDevice(noticeDto.getFcmToken(), null, noticeDto.getContent(),
                    objectMapper.writeValueAsString(noticeDto));
        } catch (FirebaseMessagingException | JsonProcessingException ex) {
            log.error("Push FCM Notice failed.", ex);
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

}
