package com.mintpot.readingm.backend.dto.clazz;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class SaveClassReviewDto {
    private long classId;

    @Min(1)
    @Max(5)
    private int rating;

    @NotBlank
    private String content;
}
