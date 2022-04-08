package com.mintpot.readingm.backend.dto.clazz.embedded;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mintpot.readingm.backend.dto.clazz.BookDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class LiveClassViewFullCurriculumDto {
    private String name;

    private LocalDateTime start;

    private LocalDateTime end;

    private String notification;

    private BookDto book;

    private String content;

    private String material;

    @JsonIgnore
    private String bookId;

    @JsonIgnore
    private String newPaperId;

    private NewspaperColumnDto newspaper;


    private List<PresignedUrlDto> commonFiles;

    private List<StudentFileDto> students;
}
