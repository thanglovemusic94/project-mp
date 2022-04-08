package com.mintpot.readingm.backend.dto.settlement;

import com.mintpot.readingm.backend.entity.constant.SettlementStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface SettlementListDto {

    long getId();

    long getFee();

    long getTax();

    long getPgFee();

    long getAmount();

    int getPayerNumber();

    SettlementStatus getStatus();

    LiveClassView getLiveClass();

    interface LiveClassView {

        long getId();

        String getType();

        long getTuitionFee();

        LocalDate getOpenDate();

        String getName();

        TutorViewDto getTutor();

        interface TutorViewDto {
            String getName();
        }
    }
}


