package com.mintpot.readingm.backend.dto.admin;

import java.time.LocalDateTime;

public interface AdBookTextModificationDto {
    long getId();

    LocalDateTime getCreatedOn();

    String getClassName();

    String getTutorName();

    String getReason();

    String getClassType();
}
