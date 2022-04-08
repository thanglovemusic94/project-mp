package com.mintpot.readingm.backend.dto.student;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentTextBookCurriculumDto extends StudentCurriculumDto {
    private String book;
}
