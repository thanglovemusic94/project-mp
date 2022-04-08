package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.user.Role;

import java.util.Date;

public interface AdNoticeView {

    long getId();

    String getTitle();

    String getContent();

    String getFileUrl();

    String getFileName();

    Role getRole();

    Date getCreatedOn();

    boolean getNotAllowedDelete();
}
