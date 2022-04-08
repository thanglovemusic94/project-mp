package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.ShowStatus;

import java.util.Date;

public interface AdClassReviewView {

    ClassInfoView getClassInfo();

    int getRating();

    String getContent();

    UserNameView getWriter();

    Date getCreatedOn();

    ShowStatus getStatus();
}
