package com.mintpot.busking.service.impl;

import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.RestaurantInfoDto;
import com.mintpot.busking.model.Restaurant;
import com.mintpot.busking.repository.RestaurantRepository;
import com.mintpot.busking.service.RestaurantService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    private final ModelMapper modelMapper;

    public RestaurantServiceImpl(RestaurantRepository restaurantRepository, ModelMapper modelMapper) {
        this.restaurantRepository = restaurantRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public SliceDto<RestaurantInfoDto> getRestaurantByLand(int landId) {
        Slice<Restaurant> restaurants = restaurantRepository.findRestaurantByBuskingLand(landId);
        List<RestaurantInfoDto> infoDtoList = new ArrayList<>();
        restaurants.get().forEach(restaurant -> {
            infoDtoList.add(modelMapper.map(restaurant, RestaurantInfoDto.class));
        });
        return SliceDto.of(infoDtoList, false);
    }
}
