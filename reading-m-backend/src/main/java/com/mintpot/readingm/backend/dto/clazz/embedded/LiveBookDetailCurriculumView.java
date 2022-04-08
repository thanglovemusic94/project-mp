package com.mintpot.readingm.backend.dto.clazz.embedded;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mintpot.readingm.backend.dto.clazz.BookDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class LiveBookDetailCurriculumView {
    private LocalDateTime start;

    private LocalDateTime end;

    private BookDto book;

    @JsonIgnore
    private String bookId;
}
