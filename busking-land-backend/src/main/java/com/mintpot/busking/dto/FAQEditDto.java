package com.mintpot.busking.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class FAQEditDto {

        @NotBlank()
        @Size(max = 2000)
        private String question;

        @NotBlank()
        private String answer;
}
