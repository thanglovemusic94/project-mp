package com.mintpot.carcloth.api.solapi;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class PhoneVerifyDto {
    @NotBlank
    private String sig;

    @NotBlank
    private String verifyNo;

    @NotBlank
    private String phoneNo;

    private Boolean expTime;
}
