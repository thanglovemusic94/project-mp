package com.mintpot.busking.dto.api;

import com.mintpot.busking.model.constant.SNSType;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UserExistByMailDto {

    private String email;

    @ApiModelProperty(example = "KAKAO|NAVER|FACEBOOK|GOOGLE|APPLE|MAIL")
    private SNSType snsType;

    @ApiModelProperty(hidden = true)
    private boolean available;

}
