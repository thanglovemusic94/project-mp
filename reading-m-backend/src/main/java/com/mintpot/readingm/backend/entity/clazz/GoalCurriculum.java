package com.mintpot.readingm.backend.entity.clazz;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;

@Embeddable
@Setter
@Getter
public class GoalCurriculum extends TextBookCurriculum {

    @NotBlank
    private String name;
}
