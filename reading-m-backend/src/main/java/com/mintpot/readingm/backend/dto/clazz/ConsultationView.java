package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.backend.dto.admin.UserNameView;
import com.mintpot.readingm.backend.entity.constant.QuestionStatus;

import java.time.LocalDateTime;

public interface ConsultationView {
    long getId();

    UserNameView getQuestioner();

    UserNameView getRespondent();

    StudentView getStudent();

    String getTitle();

    String getQuestion();

    String getAnswer();

    QuestionStatus getStatus();

    LocalDateTime getCreatedOn();

    LocalDateTime getUpdatedOn();

    LiveClassView getClassInfo();

    interface LiveClassView {
        String getType();

        String getName();
    }


    interface StudentView {
        long getId();

        String getName();

        UserView getParent();
    }

    interface UserView  {
        long getId();

        String getName();
    }
}
