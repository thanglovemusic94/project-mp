package com.mintpot.busking.task;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.mintpot.busking.dto.NoticeDto;
import com.mintpot.busking.model.Busking;
import com.mintpot.busking.model.FcmToken;
import com.mintpot.busking.model.User;
import com.mintpot.busking.model.constant.NotificationType;
import com.mintpot.busking.repository.BuskingRepository;
import com.mintpot.busking.repository.FCMTokenRepository;
import com.mintpot.busking.repository.UserRepository;
import com.mintpot.busking.service.FCMService;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
@Log4j2
public class NoticeBeforeLiveTask {

    private final BuskingRepository buskingRepository;

    private final UserRepository userRepository;

    private final FCMTokenRepository fcmTokenRepository;

    private final FCMService fcmService;

    public NoticeBeforeLiveTask(BuskingRepository buskingRepository, UserRepository userRepository, FCMTokenRepository fcmTokenRepository, FCMService fcmService) {
        this.buskingRepository = buskingRepository;
        this.userRepository = userRepository;
        this.fcmTokenRepository = fcmTokenRepository;
        this.fcmService = fcmService;
    }

    @Scheduled(fixedRate = 1000 * 60)
    void checkNoticeAndSend () {
        ObjectMapper objectMapper = new ObjectMapper();
        var startTime = Date.from(Instant.now().plus(Duration.ofMinutes(10)));
        var endTime = Date.from(startTime.toInstant().plus(Duration.ofSeconds(59)));
        log.error("start time: " + startTime);
        List<Busking> listBuskingNeedNotice = buskingRepository.getBuskingNeedToNotice(startTime, endTime);
        log.error("busking need notice: " + listBuskingNeedNotice.size());
        listBuskingNeedNotice.forEach(busking -> {
            log.error("busking: " + busking.getName());
            boolean userEnableNotice = true;
            try {
                userEnableNotice = busking.getUser().enableNoticeLive();
            } catch (Exception ignored) {}
            int userId = busking.getUser().getId();
            FcmToken fcmToken = fcmTokenRepository.findByUserId(userId);
            if(!StringUtils.isEmpty(fcmToken) && userEnableNotice) {
                // send push
                try {
                    NoticeDto noticeDto = new NoticeDto();
                    noticeDto.setNotiType(NotificationType.NOTIFICATION_10_TO_LIVE);
                    noticeDto.setFcmToken(fcmToken.getToken());
                    noticeDto.setContent("라이브 10분전");
                    noticeDto.setTitle("버스킹 공지사항");
                    fcmService.sendPushNoticeToDevice(fcmToken.getToken(), "버스킹 공지사항", "라이브 10분전", objectMapper.writeValueAsString(noticeDto));
                } catch (FirebaseMessagingException | JsonProcessingException e) {
                    log.error(e.getMessage());
                }
            }
            busking.setIsNoticed(1);
        });

        buskingRepository.saveAll(listBuskingNeedNotice);
    }

}
