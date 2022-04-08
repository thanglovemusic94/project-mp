package com.mintpot.busking.controller.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mintpot.busking.api.firebase.FirebaseChannelClient;
import com.mintpot.busking.controller.AdminController;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.BuskingDTO;
import com.mintpot.busking.dto.web.request.BuskingEditDTO;

import com.mintpot.busking.dto.web.response.BuskingNameDTO;
import com.mintpot.busking.model.constant.BuskingType;
import com.mintpot.busking.model.constant.BuskingWebAdminStatusFilter;
import com.mintpot.busking.repository.BuskingRepository;
import com.mintpot.busking.service.BuskingService;
import com.mintpot.busking.utils.DateTimeUtils;
import io.swagger.annotations.*;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.util.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/busking")
@Api(tags = {"Web Busking Api"})
@Log4j2
public class BuskingWebController extends AdminController {

    @Autowired
    private BuskingService buskingService;

    @Autowired
    private BuskingRepository repository;

    @Autowired
    private ModelMapper mapper;

    @ApiOperation("Get All Busking")
    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public PageResponse<BuskingDTO> getAll(
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) BuskingWebAdminStatusFilter adminStatus,
            @RequestParam(required = false) BuskingType buskingType) throws ParseException {
        Pageable pageable = PageRequest.of(page, size, Sort.by("start").descending());
        PageResponse<BuskingDTO> response = buskingService.findAll(DateTimeUtils.asDate(start), DateTimeUtils.asDate(end),name, adminStatus, buskingType, pageable);
        return response;
    }

    @ApiOperation("find Busking by id")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BuskingEditDTO getBuskingById(@PathVariable("id") Integer id) throws ParseException {
        BuskingEditDTO dto = buskingService.findById(id);
        return dto;
    }

    @ApiOperation("get all Name Land")
    @GetMapping("/lands")
    @ResponseStatus(HttpStatus.OK)
    public List<BuskingNameDTO> getBuskingById() {
        List<BuskingNameDTO> list = buskingService.findAllName();
        return list;
    }

    @ApiOperation(value = "Put Busking", produces = APPLICATION_JSON_VALUE, consumes = MULTIPART_FORM_DATA_VALUE)
    @PostMapping(value = "/{id}", consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.OK)
    public BuskingDTO update(@RequestPart(value = "busking", required = false) String body, @PathVariable Integer id) throws JsonProcessingException, ParseException {
        ObjectMapper mapper = new ObjectMapper();
        BuskingEditDTO dto = mapper.readValue(body, BuskingEditDTO.class);
        return buskingService.update(dto, id);
    }

    @ApiOperation("Delete Busking")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Integer id) {
        buskingService.delete(id);
    }

    @ApiOperation("Get All Busking Watting")
    @GetMapping("/watting")
    @ResponseStatus(HttpStatus.OK)
    public PageResponse<BuskingDTO> getAllWatting(
            @RequestParam(required = false) BuskingType buskingType,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size
    ) throws ParseException {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        PageResponse<BuskingDTO> response = buskingService.findAllWaiting(pageable, buskingType);
        return response;

    }


    @ApiOperation("reject Busking by id")
    @PutMapping("/reject/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void reject(@PathVariable("id") Integer id) {
        buskingService.reject(id);
    }

    @ApiOperation("rejects Busking by List ids")
    @PutMapping("/reject")
    @ResponseStatus(HttpStatus.OK)
    public void rejects(@RequestParam("ids") List<Integer> ids) {
        buskingService.rejects(ids);
    }

    @ApiOperation("approved Busking by id")
    @PutMapping("/approved/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void approved(@PathVariable("id") Integer id) {
        buskingService.approved(id);
    }

    @ApiOperation("approved Busking by List ids")
    @PutMapping("/approved")
    @ResponseStatus(HttpStatus.OK)
    public void approveds(@RequestParam("ids") List<Integer> ids) {
        buskingService.approveds(ids);
    }
}
