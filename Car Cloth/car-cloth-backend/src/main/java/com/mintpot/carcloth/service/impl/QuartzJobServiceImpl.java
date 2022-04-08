package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.entity.Company;
import com.mintpot.carcloth.entity.QuartzJob;
import com.mintpot.carcloth.repository.AppNoticeRepository;
import com.mintpot.carcloth.repository.CompanyGroupRepository;
import com.mintpot.carcloth.repository.CompanyRepository;
import com.mintpot.carcloth.repository.QuartzJobRepository;
import com.mintpot.carcloth.scheduling.CompanyUsageAutoExtensionJob;
import com.mintpot.carcloth.service.QuartzJobService;
import lombok.RequiredArgsConstructor;
import org.quartz.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;
import static org.quartz.TriggerKey.triggerKey;

@Service
@RequiredArgsConstructor
public class QuartzJobServiceImpl implements QuartzJobService {
    private final QuartzJobRepository quartzJobRepo;
    private final Scheduler scheduler;
    private final AppNoticeRepository appNoticeRepo;
    private final CompanyGroupRepository companyGroupRepo;
    private final CompanyRepository companyRepo;

    @Override
    public void schedule(QuartzJob quartzJob) throws SchedulerException {
        var jobDataMap = new JobDataMap();
        jobDataMap.put("company", quartzJob.getCompany());
        jobDataMap.put("companyRepo", companyRepo);
        jobDataMap.put("companyGroupRepo", companyGroupRepo);
        jobDataMap.put("appNoticeRepo", appNoticeRepo);

        var jobKey = jobKey(quartzJob);
        JobDetail job = newJob(CompanyUsageAutoExtensionJob.class)
                .withIdentity(jobKey.getName(), jobKey.getGroup())
                .usingJobData(jobDataMap)
                .build();

        var time = quartzJob.getCompany().getExpiredDateTime();
        Trigger trigger = newTrigger()
                .withIdentity(job.getKey().getName(), job.getKey().getGroup())
                .startAt(Date.from(time.atZone(ZoneId.systemDefault()).toInstant()))
                .withSchedule(simpleSchedule()
                        .withIntervalInHours(30*24).repeatForever()
                        .withMisfireHandlingInstructionFireNow()
                )
                .build();

        scheduler.scheduleJob(job, trigger);
    }

    @Override
    @Transactional
    public void create(QuartzJob quartzJob) throws SchedulerException {
        quartzJobRepo.save(quartzJob);
        schedule(quartzJob);
    }

    @Override
    public void updateExtendedTime(QuartzJob quartzJob, LocalDateTime extendTime) throws SchedulerException {
        // retrieve the trigger
        var jobKey = jobKey(quartzJob);
        var oldTrigger = scheduler.getTrigger(triggerKey(jobKey.getName(), jobKey.getGroup()));
        // obtain a builder that would produce the trigger
        TriggerBuilder tb = oldTrigger.getTriggerBuilder();

        // update the schedule associated with the builder, and build the new trigger
        // (other builder methods could be called, to change the trigger in any desired way)
        Trigger newTrigger = tb
                .startAt(Date.from(extendTime.atZone(ZoneId.systemDefault()).toInstant()))
                .build();

        scheduler.rescheduleJob(oldTrigger.getKey(), newTrigger);
    }

    @Override
    @Transactional
    public void remove(QuartzJob quartzJob) throws SchedulerException {
        quartzJobRepo.delete(quartzJob);
        scheduler.deleteJob(jobKey(quartzJob));
    }

    @Override
    public QuartzJob fromCompany(Company company) {
        return quartzJobRepo.findByCompany(company).orElse(null);
    }

    private JobKey jobKey(QuartzJob quartzJob) {
        return JobKey.jobKey("company-usage" + quartzJob.getCompany().getId(), "company-usage");
    }
}
