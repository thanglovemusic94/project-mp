package com.mintpot.readingm.backend.dto.clazz;

import com.sun.source.tree.Tree;

import java.time.LocalDateTime;
import java.util.TreeSet;

/**
 * View for curriculums live text book + attended
 *
 */
public interface LiveTextBookCurriculumsView {

    Integer getCurriculumIndex();

    String getClassBook();

    String getWriter();

    String getPublisher();

    LocalDateTime getStart();

    LocalDateTime getEnd();

    Boolean getPresent();

    String getActivity1();

    String getActivity2();

    String getActivityPaperT1();

    String getActivityPaperT2();
}
