package com.mintpot.busking.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Setter
@Getter
@ToString
public class ChargePointDto {

    @NotNull
    private Integer amount;

    @ApiModelProperty(hidden = true)
    private String securityInfo1;

    @ApiModelProperty(hidden = true)
    private String securityInfo2;
}
