package com.mintpot.busking.dto.api;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mintpot.busking.model.constant.BuskingType;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class BuskingRegDto {

    private String title;

    private String name;

    private String image;

    private BuskingType type;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private Date start;

    private Integer durationInMinute;

    private int busking_land_id;

}
