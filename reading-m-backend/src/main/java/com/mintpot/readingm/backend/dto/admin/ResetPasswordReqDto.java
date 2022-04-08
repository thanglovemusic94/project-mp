package com.mintpot.readingm.backend.dto.admin;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ResetPasswordReqDto {
    @NotBlank
    private String email;

    @NotBlank
    private String resetPasswordUrl;
}
