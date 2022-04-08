package com.mintpot.readingm.backend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ChangePasswordDto {
    @NotBlank
    private String name;

    @NotBlank
    private String memberId;

    @NotBlank
    private String phoneNo;

    @NotBlank
    private String newPassword;

    @NotBlank
    private String sig;

    @NotBlank
    private String verifyNo;
}
