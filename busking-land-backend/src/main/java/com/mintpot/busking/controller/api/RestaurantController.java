package com.mintpot.busking.controller.api;

import com.mintpot.busking.controller.ApiController;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.BuskingLandInfoDto;
import com.mintpot.busking.dto.api.BuskingLandRegDto;
import com.mintpot.busking.dto.api.RestaurantInfoDto;
import com.mintpot.busking.model.City;
import com.mintpot.busking.model.Province;
import com.mintpot.busking.model.Restaurant;
import com.mintpot.busking.service.RestaurantService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Api(tags = { "Restaurant Api" })
@RequestMapping(path = "/restaurant")
@Log4j2
public class RestaurantController extends ApiController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }


    @GetMapping("/land")
    @ApiOperation("Get Restaurant Recommend In Land")
    SliceDto<RestaurantInfoDto> getProvinces (int landId) {
        return restaurantService.getRestaurantByLand(landId);
    }

}
