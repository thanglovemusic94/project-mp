package com.mintpot.readingm.backend.dto.student;

import com.mintpot.readingm.backend.entity.constant.ClassType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StudentGoalClassDetail extends StudentLiveClassDetail {
    private final ClassType classType;

    private List<StudentGoalClassCurriculumDto> curriculum;

    public StudentGoalClassDetail() {
        this.classType = ClassType.LIVE_GOAL;
    }
}
