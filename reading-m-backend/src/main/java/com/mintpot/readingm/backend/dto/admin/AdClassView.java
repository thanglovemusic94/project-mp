package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.ClassSource;
import com.mintpot.readingm.backend.entity.constant.ClassStatus;
import com.mintpot.readingm.backend.entity.constant.ClassType;

import java.time.LocalDate;

public interface AdClassView {

    long getId();

    ClassSource getSource();

    String getName();

    UserNameView getTutor();

    long getTuitionFee();

    String getType();

    LocalDate getOpenDate();

    ClassStatus getStatus();
}
