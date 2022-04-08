package com.mintpot.readingm.backend.dto.admin;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class WithdrawReqDto {

    @NotBlank
    private String reason;

    @NotBlank
    private String password;
}
