package com.mintpot.readingm.backend.entity.clazz;

import com.mintpot.readingm.api.rams.book.Grade;
import com.mintpot.readingm.backend.entity.constant.SchoolStage;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;

@Embeddable
@Setter
@Getter
public class Course {

    @NotBlank
    private String name;

    @NotBlank
    private String material;

    private SchoolStage schoolTarget;

    private Grade gradeTarget;

    @NotBlank
    private String urlVideo;

    @NotBlank
    private Long time;
}
