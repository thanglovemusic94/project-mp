package com.mintpot.carcloth.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mintpot.carcloth.dto.car.CarInfoDto;
import com.mintpot.carcloth.dto.converters.AbsoluteUrlSerializer;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MainHomeDto {
    @JsonSerialize(using = AbsoluteUrlSerializer.class)
    private FileInfo carImage;

    private CarInfoDto carInfo;

    private List<ConstructionExDto> examples;

    private List<BannerDto> banners;
}
