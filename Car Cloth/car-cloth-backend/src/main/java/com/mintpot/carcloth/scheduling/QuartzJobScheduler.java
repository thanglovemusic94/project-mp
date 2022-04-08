package com.mintpot.carcloth.scheduling;

import com.mintpot.carcloth.repository.QuartzJobRepository;
import com.mintpot.carcloth.service.QuartzJobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.quartz.SchedulerException;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
@Log4j2
public class QuartzJobScheduler {
    private final QuartzJobRepository quartzJobRepo;
    private final QuartzJobService quartzJobService;

    @PostConstruct
    public void loadJob() throws SchedulerException {
        var jobs = quartzJobRepo.findAll();
        for (var job : jobs) {
            quartzJobService.schedule(job);
        }
    }
}
