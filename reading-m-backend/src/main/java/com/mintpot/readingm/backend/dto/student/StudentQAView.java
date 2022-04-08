package com.mintpot.readingm.backend.dto.student;

import java.time.LocalDateTime;

/**
 * View for QA by Student
 *
 */
public interface StudentQAView {

    long getId();
    String getTitle();
    String getContent();
    String getAnswer();
    boolean getIsSecret();
    LocalDateTime getCreatedOn();
    LocalDateTime getUpdatedOn();

    Class getClassInfo();

    interface Class {
        String getType();
        String getName();
        Tutor getTutor();
    }

    interface Tutor {
        String getId();
        String getName();
    }

}
