package com.mintpot.readingm.backend.dto.tutorApplication;

import com.mintpot.readingm.api.rams.book.School;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RegStudentDto extends RegUserDto {

    private String school;

    private int grade;

    private School clazz;
}
