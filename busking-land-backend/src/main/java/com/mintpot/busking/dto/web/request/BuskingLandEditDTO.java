package com.mintpot.busking.dto.web.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.busking.dto.web.RestaurantDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuskingLandEditDTO {
    private String landName;
    private String address;
    private String lat;
    private String lng;
    private String video;
    private int cityId;
    private int provinceId;

    @JsonProperty("restaurants")
    public List<RestaurantDTO> restaurants = new ArrayList<>();

    public Double getLatAsDouble(String lat){
        return Double.parseDouble(lat);
    }

    public Double getLngAsDouble(String lng){
        return Double.parseDouble(lat);
    }
}
