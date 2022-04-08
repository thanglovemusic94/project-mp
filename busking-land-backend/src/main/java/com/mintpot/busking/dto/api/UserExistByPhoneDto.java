package com.mintpot.busking.dto.api;

import com.mintpot.busking.model.constant.SNSType;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Data;

@Data
public class UserExistByPhoneDto {

    private String phone;

    @ApiModelProperty(hidden = true)
    private boolean available;

}
