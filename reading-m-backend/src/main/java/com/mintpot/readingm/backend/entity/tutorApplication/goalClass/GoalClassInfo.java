package com.mintpot.readingm.backend.entity.tutorApplication.goalClass;

import com.mintpot.readingm.backend.entity.constant.ClassLevel;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoalClassInfo {

    private GoalClassCategory category;

    private ClassLevel level;

    private String title;

    private String topic;

    private CurriculumInfo curriculumInfo;
}
