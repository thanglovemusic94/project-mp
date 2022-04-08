package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.InquiryStatus;
import com.mintpot.readingm.backend.entity.constant.InquiryType;

import java.util.Date;

public interface AdInquiryView {

    long getId();

    String getTitle();

    InquiryType getType();

    InquiryStatus getStatus();

    UserRoleView getQuestioner();

    Date getCreatedOn();

    Date getUpdatedOn();

    String getQuestion();

    String getAnswer();
}
