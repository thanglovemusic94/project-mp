package com.mintpot.readingm.backend.dto.admin;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveCashRequirementDto {

    @ApiModelProperty(hidden = true)
    private long parentId;

    private String bank;

    private String accountNumber;

    private String accountName;

    private int point;
}
