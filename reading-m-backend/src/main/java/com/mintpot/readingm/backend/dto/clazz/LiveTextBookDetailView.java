package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.backend.dto.clazz.embedded.LiveBookDetailCurriculumView;
import com.mintpot.readingm.backend.entity.constant.SchoolGrade;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LiveTextBookDetailView {
    private long id;

    private String name;

    private SchoolGrade targetStudentGrade;

    private String materials;

    private String guide;

    private long tuitionFee;

    private List<LiveBookDetailCurriculumView> curriculum;

    private int stdNo;

    private int numberOfLearners;

    private boolean addedToCart;
}

