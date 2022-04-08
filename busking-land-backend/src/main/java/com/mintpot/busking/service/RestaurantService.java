package com.mintpot.busking.service;

import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.RestaurantInfoDto;
import com.mintpot.busking.model.Restaurant;

public interface RestaurantService {

    SliceDto<RestaurantInfoDto> getRestaurantByLand (int landId);

}
