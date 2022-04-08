package com.mintpot.readingm.backend.entity.clazz;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Embeddable
@MappedSuperclass
@Getter
@Setter
public class TextBookCurriculum {

    @NotNull
    private LocalDateTime start;

    @NotNull
    private LocalDateTime end;

    @Lob
    @NotBlank
    private String content;

    @Lob
    @NotBlank
    private String material;

    @Lob
    private String notification;

    private String newPaperId;

    private String bookId;
}
