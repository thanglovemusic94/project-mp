package com.mintpot.busking.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.mintpot.busking.dto.NoticeDto;
import com.mintpot.busking.facade.AuthenticationFacade;
import com.mintpot.busking.model.FcmToken;
import com.mintpot.busking.model.User;
import com.mintpot.busking.model.constant.NotificationType;
import com.mintpot.busking.repository.FCMTokenRepository;
import com.mintpot.busking.service.FCMService;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class FCMServiceImpl implements FCMService {

    private final AuthenticationFacade authenticationFacade;
    private final FCMTokenRepository fcmTokenRepository;
    private final MessageSource messageSource;


    public FCMServiceImpl(AuthenticationFacade authenticationFacade, FCMTokenRepository fcmTokenRepository, MessageSource messageSource) {
        this.authenticationFacade = authenticationFacade;
        this.fcmTokenRepository = fcmTokenRepository;
        this.messageSource = messageSource;
    }

    @Override
    public void broadcastAnnouncementCreated() {
        var res = "새로운 공지사항이 있습니다.";

        ObjectMapper objectMapper = new ObjectMapper();
        List<FcmToken> fcmTokenList = fcmTokenRepository.findAll();
        fcmTokenList.forEach(fcmToken -> {
            NoticeDto noticeDto = new NoticeDto();
            noticeDto.setNotiType(NotificationType.NOTIFICATION_NEW_ANNOUNCEMENT);
            noticeDto.setFcmToken(fcmToken.getToken());
            noticeDto.setContent(res);
            try {
                if(fcmToken.getUser().enableNoticeAnnouncement()) {
                    sendPushNoticeToDevice(fcmToken.getToken(), null, res,
                            objectMapper.writeValueAsString(noticeDto));
                }
            } catch (FirebaseMessagingException | JsonProcessingException ex){
                log.error("Push FCM Notice failed.", ex);
            }
        });
    }

    @Override
    public String sendPushNoticeToDevice(String fcmToken, String title, String body, String data) throws FirebaseMessagingException {
        Message message = Message.builder().setToken(fcmToken)
                .setNotification(Notification.builder().setTitle(title != null ? title : "").setBody(body).build())
                .putData("data", data).build();
        return FirebaseMessaging.getInstance().send(message);
    }

    @Override
    public void putFCMToken(String token) {
        final var userId = authenticationFacade.getAuthentication().getUserId();
        FcmToken fcmToken = fcmTokenRepository.findById(userId).orElse(new FcmToken(new User(userId)));
        fcmToken.setToken(token);
        fcmTokenRepository.save(fcmToken);
    }
}
