package com.mintpot.readingm.backend.dto.sms;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

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

    private LocalDateTime time;
}
