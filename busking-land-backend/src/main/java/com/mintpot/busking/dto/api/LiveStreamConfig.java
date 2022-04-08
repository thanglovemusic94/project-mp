package com.mintpot.busking.dto.api;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LiveStreamConfig {

    private int height = 0;

    private int width = 0;

    @ApiModelProperty(value = "LANDSCAPE|PORTRAIT")
    private String screen = "LANDSCAPE";


}
