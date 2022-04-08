package com.mintpot.busking.dto.api;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BuskingConfigRegDto {

    private LiveStreamConfig config;

    private int busking_id;

}
