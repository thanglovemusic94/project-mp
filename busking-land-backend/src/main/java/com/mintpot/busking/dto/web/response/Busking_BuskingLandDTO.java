package com.mintpot.busking.dto.web.response;

import com.mintpot.busking.dto.web.CityDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Busking_BuskingLandDTO {

    private Integer id;
    private String name;
    private String address;
//    public CityDTO city = new CityDTO();
}
