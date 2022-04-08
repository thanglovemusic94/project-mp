package com.mintpot.busking.api.apple.inapp;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@JsonSerialize(using = VerifyReceiptReqSerializer.class, as = VerifyReceiptReq.class)
public class VerifyReceiptReq {

    private String receiptData;

    @ApiModelProperty(hidden = true)
    private String password;
}
