package com.mintpot.pii.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPswdRequestDto extends PhoneVerfDto {

    private String name;

    private String email;
}
