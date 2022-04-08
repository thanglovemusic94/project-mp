package com.mintpot.readingm.backend.dto.clazz;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TutorLiveClassView {
    private long id;

    private String name;

    private String profileImageUrl;

    private String classIntroduction;

    private Double rating;
}
