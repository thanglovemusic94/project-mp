package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.backend.dto.clazz.embedded.LiveClassViewFullCurriculumDto;
import com.mintpot.readingm.backend.dto.clazz.embedded.StudentInfo;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class LiveClassViewFullDto {

    private String type;

    private String name;

    private String materials;

    private LocalDate openDate;

    private TutorLiveClassView tutor;

    private GoalClassCategory category;

    private List<StudentInfo> students;

    private List<LiveClassViewFullCurriculumDto> curriculum;
}
