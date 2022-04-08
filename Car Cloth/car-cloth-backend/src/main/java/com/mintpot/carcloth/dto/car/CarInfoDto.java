package com.mintpot.carcloth.dto.car;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarInfoDto {

    private String brandName;

    private String modelName;

    @JsonProperty("detailModelName")
    private String name;

    private String carNumber;
}
