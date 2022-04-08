package com.mintpot.busking.dto.api;

import com.mintpot.busking.model.Favorite;
import com.mintpot.busking.model.constant.BuskerStatus;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BuskerInfoDto {

    private String activityCity;

    private String avatar;

    private String name;

    private List<Favorite> favorites;

    private List<String> videos;

    @ApiModelProperty(example = "ACTIVE|IN_ACTIVE")
    private BuskerStatus status;

}
