package com.mintpot.busking.dto.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDTO{
    private Integer id;
    private String name;
    private String image;
    private String url;
}
