package com.mintpot.busking.dto.web;

import com.mintpot.busking.model.Province;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityDTO {
    private int cityId;
    private String cityName;
}
