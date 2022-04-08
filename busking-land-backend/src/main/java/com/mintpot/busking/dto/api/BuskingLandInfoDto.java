package com.mintpot.busking.dto.api;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BuskingLandInfoDto {

    private int id;

    private String name;

    private String address;

    private Double lat;

    private Double lng;

    private int cityId;

    private String video;

    public BuskingLandInfoDto(int id, String name, String address, Double lat, Double lng, int cityId, String video) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.cityId = cityId;
        this.video = video;
    }


    public static BuskingLandInfoDto from (BuskingLandNearByDto nearByDto) {
        BuskingLandInfoDto infoDto = new BuskingLandInfoDto();
        infoDto.setId(nearByDto.getId());
        infoDto.setLat(nearByDto.getLat());
        infoDto.setLng(nearByDto.getLng());
        infoDto.setName(nearByDto.getName());
        infoDto.setVideo(nearByDto.getVideo());
        return infoDto;
    }
}
