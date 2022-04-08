package com.mintpot.busking.dto;

import com.mintpot.busking.model.constant.BuskingProgress;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class BuskingProgressInfo {

    private int id;

    @ApiModelProperty(example = "INIT|IN_LIVE|END")
    private BuskingProgress progress;
}
