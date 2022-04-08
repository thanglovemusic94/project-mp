package com.mintpot.busking.dto.web.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * @author Admin
 * @date 2021-02-25 15:34 PM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    @ApiModelProperty(example = "admin")
    @NotBlank
    private String username;

    @ApiModelProperty(example = "adminadmin")
    @NotBlank
    private String password;
}
