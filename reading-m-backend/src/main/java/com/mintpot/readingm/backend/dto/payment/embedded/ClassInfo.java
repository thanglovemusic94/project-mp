package com.mintpot.readingm.backend.dto.payment.embedded;

import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClassInfo {
    private String type;

    private String name;

    private SchoolGrade targetStudentGrade;

    private String materials;

    private List<CurriculumView> curriculum;

    private String grade; // davinci class
}