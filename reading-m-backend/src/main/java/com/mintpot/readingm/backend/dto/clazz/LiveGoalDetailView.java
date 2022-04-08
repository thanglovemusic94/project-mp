package com.mintpot.readingm.backend.dto.clazz;

import com.mintpot.readingm.backend.dto.clazz.embedded.LiveGoalDetailCurriculumView;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LiveGoalDetailView {
    private long id;

    private GoalClassCategory category;

    private String name;

    private String materials;

    private String guide;

    private long tuitionFee;

    private int stdNo;

    private int numberOfLearners;

    private boolean addedToCart;

    private List<LiveGoalDetailCurriculumView> curriculum;

}
