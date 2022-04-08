package com.mintpot.readingm.backend.dto.admin;

import java.time.LocalDateTime;

public interface DavinciLogView {

    long getId();

    String getLectureName();

    String getLectureTitle();

    String getStudentName();

    String getIp();

    LocalDateTime getCreatedOn();
}
