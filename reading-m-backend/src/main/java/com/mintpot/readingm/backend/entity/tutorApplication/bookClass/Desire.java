package com.mintpot.readingm.backend.entity.tutorApplication.bookClass;

import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import com.mintpot.readingm.backend.entity.constant.SchoolStage;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class Desire {

    private SchoolStage school;

    private Set<SchoolGrade> grade;

    private String reason;
}
