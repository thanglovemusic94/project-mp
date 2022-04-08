package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.BookGradeSerializer;
import com.mintpot.readingm.backend.converter.BookSchoolSerializer;

/**
 * View for book calendar
 *
 */
public interface BookCalendarView {

    @JsonProperty("B_idx")
    String getIdx();

    @JsonProperty("B_title")
    String getTitle();

    @JsonProperty("B_image")
    String getImage();

    @JsonProperty("B_writer")
    String getWriter();

    @JsonProperty("B_publisher")
    String getPublisher();

    @JsonProperty("B_school")
    @JsonSerialize(using = BookSchoolSerializer.class)
    Integer getSchool();

    @JsonProperty("B_grade")
    @JsonSerialize(using = BookGradeSerializer.class)
    Integer getGrade();
}
