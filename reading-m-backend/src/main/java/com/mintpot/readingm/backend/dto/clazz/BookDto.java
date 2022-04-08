package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDto {

    @JsonProperty("id")
    private String idx;

    private String title;

    @JsonProperty("author")
    private String writer;

    private String publisher;

    @JsonProperty("studentActivity1")
    private String activitypaperS1;

    @JsonProperty("studentActivity2")
    private String activitypaperS2;

    @JsonProperty("tutorActivity1")
    private String activitypaperT1;

    @JsonProperty("tutorActivity2")
    private String activitypaperT2;
}
