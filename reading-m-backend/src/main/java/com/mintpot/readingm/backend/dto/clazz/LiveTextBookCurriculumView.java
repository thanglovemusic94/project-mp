package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import com.mintpot.readingm.backend.converter.ListFileConverter;
import com.mintpot.readingm.backend.converter.SchoolGradeSerializer;
import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import com.mintpot.readingm.backend.dto.clazz.embedded.PresignedUrlDto;

import java.time.LocalDateTime;
import java.util.List;

/**
 * View for live book text class detail (class + curriculum)
 *
 */
public interface LiveTextBookCurriculumView {
    Long getClassId();

    String getClassName();

    SchoolGrade getTargetStudentGrade();

    String getClassType();

    String getTutorName();

    String getTutorImage();

    Long getCurIndex();

    LocalDateTime getStart();

    LocalDateTime getEnd();

    String getContent();

    String getMaterial();

    String getNotification();

    String getBookId();

    String getBookName();

    String getActivity1();

    String getActivity2();

    String getActivityPaperT1();

    String getActivityPaperT2();

    Integer getWeek();

    @JsonSerialize(converter = ListFileConverter.class)
    String getCmAttachFiles();

    @JsonSerialize(converter = ListFileConverter.class)
    String getAttachFiles();

    @JsonSerialize(converter = ListFileConverter.class)
    String getMyAttachFiles();

}