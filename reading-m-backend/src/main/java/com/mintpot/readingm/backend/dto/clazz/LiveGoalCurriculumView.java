package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.readingm.backend.converter.GoalClassCategorySerializer;
import com.mintpot.readingm.backend.converter.ImageUrlSerializer;
import com.mintpot.readingm.backend.converter.ListFileConverter;
import com.mintpot.readingm.backend.dto.clazz.embedded.PresignedUrlDto;

import java.time.LocalDateTime;
import java.util.List;

/**
 * View for live goal class detail (class + curriculum)
 *
 */
public interface LiveGoalCurriculumView {
    Long getClassId();

    String getClassName();

    @JsonSerialize(using = GoalClassCategorySerializer.class)
    String getClassCategory();

    String getClassType();

    String getTutorName();

    @JsonSerialize(using = ImageUrlSerializer.class)
    String getTutorImage();

    Long getCurIndex();

    String getCurName();

    LocalDateTime getStart();

    LocalDateTime getEnd();

    String getContent();

    String getMaterial();

    String getNotification();

    @JsonSerialize(converter = ListFileConverter.class)
    String getCmAttachFiles();

    @JsonSerialize(converter = ListFileConverter.class)
    String getAttachFiles();

    @JsonSerialize(converter = ListFileConverter.class)
    String getMyAttachFiles();

}