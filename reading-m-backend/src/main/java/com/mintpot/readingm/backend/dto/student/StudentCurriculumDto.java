package com.mintpot.readingm.backend.dto.student;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StudentCurriculumDto {
    private LocalDateTime start;

    private LocalDateTime end;

    private String content;

    private String material;

    private String notification;
}
