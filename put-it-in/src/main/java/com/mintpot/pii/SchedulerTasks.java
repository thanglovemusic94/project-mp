package com.mintpot.pii;

import com.mintpot.pii.service.ReservationService;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Log4j2
public class SchedulerTasks {

    private final ReservationService reservationService;

    public SchedulerTasks(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @Scheduled(cron = "0 0 1 * * *")
    public void jobUpdateReservationStatus() {
        log.info("[BEGIN JOB] Update Reservation complete to In use. Time: " +  new Date());
        reservationService.udpReservationStatus();
        log.info("[FINISH JOB] Update Reservation complete to In use");
    }
}
