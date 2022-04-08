package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.TutorApplicationStatus;

import java.util.Date;

public interface AdTutorApplicationView {

    long getId();

    TutorView getTutor();

    Date getCreatedOn();

    TutorApplicationStatus getStatus();

    interface TutorView {

        String getName();

        String getPhone();

        String getEmail();
    }
}
