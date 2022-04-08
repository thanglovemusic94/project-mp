package com.mintpot.busking.controller.api;

import com.mintpot.busking.controller.ApiController;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.BuskingLandInfoDto;
import com.mintpot.busking.dto.api.BuskingLandRegDto;
import com.mintpot.busking.model.BuskingLand;
import com.mintpot.busking.model.City;
import com.mintpot.busking.model.Province;
import com.mintpot.busking.service.BuskingLandService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Api(tags = { "Busking Lands Api" })
@RequestMapping(path = "/busking_land")
@Log4j2
public class BuskingLandController extends ApiController {

    private final BuskingLandService buskingLandService;

    public BuskingLandController(BuskingLandService buskingLandService) {
        this.buskingLandService = buskingLandService;
    }

    @GetMapping("/provinces")
    @ApiOperation("Get Provinces")
    SliceDto<Province> getProvinces () {
        return buskingLandService.getListProvince();
    }

    @GetMapping("/cities")
    @ApiOperation("Get City By Province")
    SliceDto<City> getCities (int provinceId) {
        return buskingLandService.getListCity(provinceId);
    }

    @GetMapping("/lands")
    @ApiOperation("Get Busking Land By City")
    SliceDto<BuskingLandInfoDto> getBuskingLand (int cityId) {
        return buskingLandService.getListBuskingLand(cityId);
    }

    @PostMapping("/lands/compose")
    @ApiOperation("Compose A Busking Land")
    @ResponseStatus(HttpStatus.CREATED)
    void composeABuskingLand (@RequestBody BuskingLandRegDto regDto) {
        buskingLandService.composeABuskingLand(regDto);
    }


    @GetMapping("/lands/nearBy")
    @ApiOperation("Get Busking Land In NearBy 5Km")
    List<BuskingLandInfoDto> getBuskingLandInNearBy (Double lat, Double lng) {
        return buskingLandService.getListBuskingInNearBy(lat, lng);
    }

}
