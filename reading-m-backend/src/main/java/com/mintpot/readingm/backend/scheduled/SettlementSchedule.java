package com.mintpot.readingm.backend.scheduled;

import com.mintpot.readingm.backend.repository.LiveClassRepository;
import com.mintpot.readingm.backend.service.SettlementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Log4j2
@RequiredArgsConstructor
@Component
public class SettlementSchedule {

    private final SettlementService settlementService;

    private final LiveClassRepository liveClassRepo;

    @Scheduled(cron = "0 0 0 10 * *" , zone = "Asia/Seoul")
    @Transactional
    public void summarySettlementMonthly() {
        log.info(" Starting summary settlement.");
        liveClassRepo.findBySettled(false).forEach(c -> {
            if (c.hasStarted()) {
                log.info("Starting summary settlement for class: {}.", c.getId());
                settlementService.summarySettlementByClass(c);
                LocalDateTime end = c.getLastLessonTime();
                if (end != null && end.isBefore(LocalDateTime.now())) {
                    c.setSettled(true);
                    log.info("Class : {} has settled completely.", c.getId());
                }
            }
        });
    }
}
