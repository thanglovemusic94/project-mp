package com.mintpot.readingm.backend.entity.tutorApplication.goalClass;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CurriculumInfo {

    private int totalDays;

    private int minutesPerDay;

    private List<String> curriculum;

    private String materials;

    private List<String> matSampleUrls;

}
