package com.mintpot.readingm.backend.entity.tutorApplication;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Experience {

    private String occupation;

    private String companyName;

    private WorkPeriod workPeriod;

    private String position;

    private String responsibilities;
}
