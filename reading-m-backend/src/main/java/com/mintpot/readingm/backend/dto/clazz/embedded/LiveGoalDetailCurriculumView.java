package com.mintpot.readingm.backend.dto.clazz.embedded;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class LiveGoalDetailCurriculumView {
    private LocalDateTime start;

    private LocalDateTime end;

    private String name;
}
