package com.mintpot.busking.dto.api;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class BuskingLandRegDto {

    private String name;

    private String address;

    private Double lat;

    private Double lng;

    private int city_id;

    private String video;

    public BuskingLandRegDto(String name, String address, Double lat, Double lng, int city_id, String video) {
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.city_id = city_id;
        this.video = video;
    }
}
