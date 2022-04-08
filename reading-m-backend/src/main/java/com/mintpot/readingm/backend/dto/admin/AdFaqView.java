package com.mintpot.readingm.backend.dto.admin;

import java.util.Date;

public interface AdFaqView {

    long getId();

    String getQuestion();

    String getAnswer();

    Date getCreatedOn();
}
