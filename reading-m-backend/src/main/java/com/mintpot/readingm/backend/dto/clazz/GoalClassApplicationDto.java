package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.backend.dto.admin.UserNameView;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import com.mintpot.readingm.backend.entity.constant.QuestionStatus;

import java.time.LocalDateTime;

public interface GoalClassApplicationDto {
    long getId();

    UserNameView getApplicant();

    UserNameView getRespondent();

    String getTitle();

    String getRequest();

    String getAnswer();

    GoalClassCategory getCategory();

    QuestionStatus getStatus();

    LocalDateTime getCreatedOn();

    LocalDateTime getUpdatedOn();
}
