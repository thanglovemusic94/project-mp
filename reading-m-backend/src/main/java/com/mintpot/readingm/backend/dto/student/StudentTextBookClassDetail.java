package com.mintpot.readingm.backend.dto.student;

import com.mintpot.readingm.backend.entity.constant.ClassType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StudentTextBookClassDetail extends StudentLiveClassDetail {
    private final ClassType classType;

    private List<StudentTextBookCurriculumDto> curriculum;

    public StudentTextBookClassDetail() {
        this.classType = ClassType.LIVE_BOOK;
    }
}
