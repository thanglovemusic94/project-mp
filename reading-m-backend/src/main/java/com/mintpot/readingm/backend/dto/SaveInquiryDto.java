package com.mintpot.readingm.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.readingm.backend.entity.constant.InquiryType;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class SaveInquiryDto {
    @NotNull
    private InquiryType type;

    @NotBlank
    private String title;

    @NotBlank
    @JsonProperty("content")
    private String question;
}
