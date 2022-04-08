package com.mintpot.busking.controller.web;

import com.mintpot.busking.dto.web.CityDTO;
import com.mintpot.busking.dto.web.response.ProvinceDTO;
import com.mintpot.busking.model.City;
import com.mintpot.busking.model.Province;
import com.mintpot.busking.model.constant.Status;
import com.mintpot.busking.repository.CityRepository;
import com.mintpot.busking.repository.ProvinceRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/province")
@Api(tags = {"Web Province Api"}, produces = "web")
@Log4j2
public class ProvinceWebController {
    @Autowired
    private ProvinceRepository provinceRepository;

    @Autowired
    private ModelMapper modelMapper;

    @ApiOperation("Get All Province")
    @GetMapping("")
    public List<ProvinceDTO> getAll() {
        List<Province> provinces = provinceRepository.getListProvince();
        List<ProvinceDTO> provinceDTOS = provinces.stream().map(province -> {
            return modelMapper.map(province, ProvinceDTO.class);
        }).collect(Collectors.toList());
        return provinceDTOS;
    }

    @ApiOperation("Get Province by id")
    @GetMapping("/{id}")
    public ProvinceDTO getProvinceById(@PathVariable Integer id) {
        Province province = provinceRepository.findById(id).get();
        Set<City> cities = province.getCities().stream().filter(city -> city.getStatus() == Status.ACTIVATED).collect(Collectors.toSet());
        province.setCities(cities);
        ProvinceDTO provinceDTO = modelMapper.map(province, ProvinceDTO.class);
        return provinceDTO;
    }

}
