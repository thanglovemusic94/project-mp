package com.mintpot.readingm.backend.dto.clazz;

import java.time.LocalDateTime;

/**
 * View for curriculums live goal + attended
 *
 */
public interface LiveGoalCurriculumsView {


    Integer getCurriculumIndex();

    String getName();

    LocalDateTime getStart();

    LocalDateTime getEnd();

    Boolean getPresent();

}
