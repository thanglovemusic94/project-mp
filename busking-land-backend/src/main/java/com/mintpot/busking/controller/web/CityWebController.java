package com.mintpot.busking.controller.web;

import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.BuskingLandDTO;
import com.mintpot.busking.dto.web.CityDTO;
import com.mintpot.busking.model.City;
import com.mintpot.busking.repository.CityRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/city")
@Api(tags = {"Web City Api"}, produces = "web")
@Log4j2
public class CityWebController {
    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private ModelMapper modelMapper;

    @ApiOperation("Get All City")
    @GetMapping("")
    public List<CityDTO> getAll(
    ) {
        List<City> listCT = cityRepository.listCity();
        List<CityDTO> cityDTOS = listCT.stream().map(city -> {
            return modelMapper.map(city, CityDTO.class);
        }).collect(Collectors.toList());
       return cityDTOS;
    }
}
