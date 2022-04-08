package com.mintpot.busking.dto.web.response;

import com.mintpot.busking.dto.web.CityDTO;
import com.mintpot.busking.model.City;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProvinceDTO {
    private int provinceId;
    private String provinceName;
    private Set<CityDTO> cities;
}
