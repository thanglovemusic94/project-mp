package com.mintpot.readingm.backend.entity.tutorApplication;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class LanguageTest extends Certificate {
    private static final long serialVersionUID = 1L;

    String language;

    int score;

    boolean isPassed;

    String testType;

    int rating;

}
