package com.mintpot.readingm.backend.dto.clazz;

import java.time.LocalDateTime;

/**
 * View for class review
 *
 */
public interface ClassQAView {

    long getId();

    String getTitle();

    String getContent();

    String getAnswer();

    boolean getIsSecret();

    StudentInfo getQuestioner();

    ClassInfo getClassInfo();

    LocalDateTime getCreatedOn();

    LocalDateTime getUpdatedOn();

    interface StudentInfo {
        long getId();
        String getName();
    }

    interface ClassInfo {
        String getType();

        String getName();
    }
}
