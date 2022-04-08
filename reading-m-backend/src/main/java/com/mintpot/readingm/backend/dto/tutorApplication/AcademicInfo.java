package com.mintpot.readingm.backend.dto.tutorApplication;

import com.mintpot.readingm.backend.dto.tutorApplication.period.EnrollPeriod;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AcademicInfo {

    private UniversityType uniType;

    private String uniName;

    private EnrollPeriod enrollPeriod;

    private List<Major> majors;

}
