package com.mintpot.busking.dto.web;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BuskingLandDTO extends BaseDTO{
    private Integer id;
    private String name;
    private String address;
    private Double lat;
    private Double lng;
    private String video;
    public CityDTO city = new CityDTO();
    public ProvinceDTO province = new ProvinceDTO();
    public List<RestaurantDTO> restaurants = new ArrayList<>();
}
