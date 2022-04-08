package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.CourseStatusSerializer;
import com.mintpot.readingm.backend.converter.GradeSerializer;
import com.mintpot.readingm.backend.converter.SchoolStageSerializer;

import java.time.LocalDate;

public interface DavinciCourseView {

    int getCourseIndex();

    String getGrade();

    String getMaterials();

    String getCourseName();

    String getUrlVideo();

    Long getTime();

    @JsonSerialize(using = CourseStatusSerializer.class)
    String getStatus();

    LocalDate getPaymentDate();
}
