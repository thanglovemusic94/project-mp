package com.mintpot.busking.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class FaqRegDto {

    @NotBlank()
    private String question;

    @NotBlank()
    private String answer;
}
