package com.mintpot.readingm.backend.dto.clazz;


public interface ClassAvailableReview {
    long getClassId();

    String getClassType();

    String getClassName();

    long getTutorId();

    String getMemberId();

    String getTutorName();

    String getTutorPhone();
}
