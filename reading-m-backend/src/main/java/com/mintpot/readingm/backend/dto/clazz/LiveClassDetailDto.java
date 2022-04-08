package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.readingm.backend.dto.clazz.embedded.LiveClassCurriculumDetailDto;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class LiveClassDetailDto {
    private String tutorName;

    private String introduction;

    private String name;

    private String materials;

    private long tuitionFee;

    private LocalDate openDate;

    @JsonProperty("numberOfPeople")
    private int stdNo;

    private String guide;

    private List<LiveClassCurriculumDetailDto> curriculum;

    private GoalClassCategory category;

    @JsonProperty("targetStudent")
    private SchoolGrade targetStudentGrade;
}

