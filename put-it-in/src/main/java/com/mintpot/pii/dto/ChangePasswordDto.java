package com.mintpot.pii.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChangePasswordDto extends  PasswordDto {

    private String newPassword;
}
