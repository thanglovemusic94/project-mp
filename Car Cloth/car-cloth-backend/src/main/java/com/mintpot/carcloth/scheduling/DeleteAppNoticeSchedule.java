package com.mintpot.carcloth.scheduling;

import com.mintpot.carcloth.repository.AppNoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Log4j2
public class DeleteAppNoticeSchedule {
    private final AppNoticeRepository noticeRepo;
    private final int KEPT_TIME_IN_DAYS = 30;

    @Scheduled(cron = "0 0 1 * * *", zone = "Asia/Seoul")
    public void removeNotice() {
        log.info("Starting delete old notices");
        noticeRepo.deleteNoticeOutDate(LocalDate.now().plusDays(-KEPT_TIME_IN_DAYS));
        log.info("Delete old notices done !");
    }
}
