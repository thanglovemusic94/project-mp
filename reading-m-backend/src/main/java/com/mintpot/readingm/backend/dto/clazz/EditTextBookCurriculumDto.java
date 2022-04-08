package com.mintpot.readingm.backend.dto.clazz;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class EditTextBookCurriculumDto {
    @NotNull
    private LocalDateTime start;

    @NotNull
    private LocalDateTime end;

    @NotBlank
    private String content;

    @NotBlank
    private String material;

    private String notification;

    private String newPaperId;

    private String bookId;

    private String name;
}
