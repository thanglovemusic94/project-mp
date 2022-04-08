package com.mintpot.readingm.backend.dto.settlement;

import com.mintpot.readingm.backend.entity.constant.SettlementStatus;

import java.time.LocalDate;

public interface TutorSettlementDto {
    long getId();

    long getAmount();

    SettlementStatus getStatus();

    LiveClassView getLiveClass();

    interface LiveClassView {
        long getId();

        String getType();

        String getName();

        LocalDate getOpenDate();
    }
}
