package com.mintpot.busking.dto.web.request;

import com.mintpot.busking.dto.web.CityDTO;
import com.mintpot.busking.dto.web.RestaurantDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LandCreateDTO {
    private String name;
    private String address;
    private Double lat;
    private Double lng;
    private String video;
    public CityDTO city = new CityDTO();
    public List<RestaurantDTO> restaurants = new ArrayList<>();
}
