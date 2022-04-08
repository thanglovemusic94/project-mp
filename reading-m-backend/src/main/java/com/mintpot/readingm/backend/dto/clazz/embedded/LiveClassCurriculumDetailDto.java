package com.mintpot.readingm.backend.dto.clazz.embedded;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mintpot.readingm.backend.dto.clazz.BookDto;
import com.mintpot.readingm.backend.dto.clazz.NewsPaperDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class LiveClassCurriculumDetailDto {
    private LocalDateTime start;

    private LocalDateTime end;

    private String content;

    private String material;

    private String notification;

    private NewsPaperDto newPaper;

    private BookDto book;

    @JsonIgnore
    private String newPaperId;

    @JsonIgnore
    private String bookId;

    private String name;
}