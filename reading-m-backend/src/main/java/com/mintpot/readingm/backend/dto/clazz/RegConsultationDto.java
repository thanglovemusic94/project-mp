package com.mintpot.readingm.backend.dto.clazz;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class RegConsultationDto {
    private long classId;

    private long childId;

    @NotBlank
    private String title;

    @NotBlank
    private String question;
}
