package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.ClassType;

import java.time.LocalDateTime;

public interface PaidClassLectureListView {

    LocalDateTime getCreatedOn();

    ClassType getClassType();

    String getStatus();

    ClassDetail getClassInformation();


    interface ClassDetail{
        String getName();
        String getGrade();
        String getMaterials();
    }

}
