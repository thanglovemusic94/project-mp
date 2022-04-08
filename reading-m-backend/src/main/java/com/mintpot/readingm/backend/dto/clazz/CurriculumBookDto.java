package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurriculumBookDto {
    @JsonProperty("id")
    private String idx;

    private int week;

    private String title;

    private String writer;

    private String publisher;
}
