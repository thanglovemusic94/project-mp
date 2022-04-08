package com.mintpot.busking.dto.api;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Pattern;

@Getter
@Setter
public class ResetPasswordDto {

    private String email;

    private String phone;

    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&+=])(?=\\S+$).{8,15}")
    @ApiModelProperty(notes = "Contains at least one digit, one lower-case letter, one upper-case letter, one special character and no whitespace.", example = "1A!bcdef")
    private String password;

}
