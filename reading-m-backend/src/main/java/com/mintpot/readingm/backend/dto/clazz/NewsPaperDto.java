package com.mintpot.readingm.backend.dto.clazz;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class NewsPaperDto {
    @JsonProperty("id")
    private String cIdx;

    @JsonProperty("date")
    private LocalDate cNewsdate;

    @JsonProperty("company")
    private String cCompany;

    @JsonProperty("field")
    private String cSubject;

    @JsonProperty("title")
    private String cTitle;

    private String author;

    private LocalDate createdDate;

    @JsonProperty("fileUrl")
    private String cFile;
}
