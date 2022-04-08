package com.mintpot.busking.controller.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mintpot.busking.controller.AdminController;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.BuskingLandDTO;
import com.mintpot.busking.dto.web.RestaurantDTO;
import com.mintpot.busking.dto.web.request.BuskingEditDTO;
import com.mintpot.busking.dto.web.request.BuskingLandEditDTO;
import com.mintpot.busking.dto.web.response.ProvinceDTO;
import com.mintpot.busking.service.BuskingLandService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/land-manager")
@Api(tags = {"Web Land Manager Api"}, produces = "web")
@Log4j2
public class BuskingLandWebController extends AdminController {

    @Autowired
    private BuskingLandService buskingLandService;

    @ApiOperation("Get All Land Manager")
    @GetMapping("")
    public PageResponse<BuskingLandDTO> getAll(@RequestParam(defaultValue = "0", required = false) Integer page,
                                               @RequestParam(defaultValue = "10", required = false) Integer size,
                                               @RequestParam(defaultValue = "", required = false) String keyword
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        PageResponse<BuskingLandDTO> landManagers = buskingLandService.findAll(pageable, keyword);
        return landManagers;
    }

    @ApiOperation("Get Land Manager By ID")
    @GetMapping("/{id}")
    public BuskingLandDTO findById(@PathVariable("id") Integer id) {
        BuskingLandDTO dto = buskingLandService.findById(id);
        return dto;
    }

    @ApiOperation(value = "create Land Manager", produces = APPLICATION_JSON_VALUE, consumes = MULTIPART_FORM_DATA_VALUE)
    @PostMapping(value = "", consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.CREATED)
    public BuskingLandDTO create(@RequestPart(value = "land", required = false) String body) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        BuskingLandEditDTO dto = mapper.readValue(body, BuskingLandEditDTO.class);
        return buskingLandService.create(dto);
    }

    @ApiOperation(value = "update Land Manager", produces = APPLICATION_JSON_VALUE, consumes = MULTIPART_FORM_DATA_VALUE)
    @PostMapping(value = "/{id}", consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.OK)
    public BuskingLandDTO update(@RequestPart(value = "busking", required = false) String body, @PathVariable Integer id) throws JsonProcessingException, JSONException {
        ObjectMapper mapper = new ObjectMapper();
        BuskingLandEditDTO dto = new ObjectMapper().readValue(body, BuskingLandEditDTO.class);
        BuskingLandDTO buskingLandDTO = buskingLandService.update(dto, id);
        return buskingLandDTO;
    }

    @ApiOperation("delete by id Land Manager")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Integer id) {
        buskingLandService.delete(id);
    }

    @ApiOperation("delete by Ids Land Manager")
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deletes(@RequestParam("ids") List<Integer> ids) {
        buskingLandService.deletes(ids);
    }


    @ApiOperation("get Province List")
    @GetMapping("/province")
    @ResponseStatus(HttpStatus.OK)
    public List<ProvinceDTO> getAllProvince() {
        return buskingLandService.listProvince();
    }


    @ApiOperation("delete image restaurent by id Restaurent")
    @DeleteMapping("/image/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") int id) {
        buskingLandService.removeImageRestaurent(id);
    }
}
