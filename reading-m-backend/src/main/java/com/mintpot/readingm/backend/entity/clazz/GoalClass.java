package com.mintpot.readingm.backend.entity.clazz;

import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OrderColumn;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class GoalClass extends LiveClass {

    private GoalClassCategory category;

    @ElementCollection
    @OrderColumn(name = "curriculum_index")
    private List<GoalCurriculum> curriculum;

    private String introduction;
}
