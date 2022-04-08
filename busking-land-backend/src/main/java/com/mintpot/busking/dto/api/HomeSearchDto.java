package com.mintpot.busking.dto.api;

import com.mintpot.busking.model.City;
import com.mintpot.busking.model.Province;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HomeSearchDto {

    private HomeSearchType type;

    private BuskingLandInfoDto buskingLand;

    private City city;

    private Province province;


    public HomeSearchDto(BuskingLandInfoDto buskingLand) {
        this.type = HomeSearchType.LAND;
        this.buskingLand = buskingLand;
    }

    public HomeSearchDto(City city) {
        this.type = HomeSearchType.CITY;
        this.city = city;
    }

    public HomeSearchDto(Province province) {
        this.type = HomeSearchType.CITY;
        this.province = province;
    }

    public enum HomeSearchType {
        CITY, LAND
    }
}
