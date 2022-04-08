package com.mintpot.readingm.backend.dto.clazz.embedded;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TutorLiveGoalView {
    private long id;

    private String name;

    private String profileImageUrl;

    private Double rating;
}
