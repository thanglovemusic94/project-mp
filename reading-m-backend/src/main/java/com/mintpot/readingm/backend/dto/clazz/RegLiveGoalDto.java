package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.annotation.JsonTypeName;
import com.mintpot.readingm.backend.entity.clazz.GoalCurriculum;
import com.mintpot.readingm.backend.entity.constant.GoalClassCategory;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@JsonTypeName("livegoal")
public class RegLiveGoalDto extends RegClassDto {

    @NotBlank
    private String introduction;

    @NotNull
    private GoalClassCategory category;

    @NotBlank
    private String guide;

    @Min(1)
    @Max(60)
    private int stdNo;

    private List<GoalCurriculum> curriculum;
}
