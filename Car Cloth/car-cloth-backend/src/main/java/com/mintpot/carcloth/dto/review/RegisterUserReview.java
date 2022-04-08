package com.mintpot.carcloth.dto.review;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class RegisterUserReview {

    @NotNull
    private Long quotationId;

    @Min(0)
    @Max(5)
    private int quality;

    @Min(0)
    @Max(5)
    private int kindness;

    @Min(0)
    @Max(5)
    private int productExplain;

    @NotBlank
    private String content;
}
