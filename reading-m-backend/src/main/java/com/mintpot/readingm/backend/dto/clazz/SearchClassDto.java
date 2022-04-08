package com.mintpot.readingm.backend.dto.clazz;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SearchClassDto {
    private long id;

    private boolean closed;

    private Double rating;

    private String introduction; // introduction of goal class

    private TutorView tutor;
}

@Getter
@Setter
class TutorView {
    private long id;

    private String name;

    private String profileImgUrl;

    private String bookTextIntroduction;
}