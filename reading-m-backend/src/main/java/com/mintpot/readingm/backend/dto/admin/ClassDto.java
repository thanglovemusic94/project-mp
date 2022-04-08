package com.mintpot.readingm.backend.dto.admin;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ClassDto {
    private long id;

    private String type;

    private String name;

    private String targetStudentGrade;

    private String materials;

    private LocalDate openDate;

    private String tutorName;

    private List<Curriculum> curriculum;
}

@Getter
@Setter
class Curriculum {

    private LocalDateTime start;

    private LocalDateTime end;
}