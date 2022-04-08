package com.mintpot.busking.controller.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.BuskerInfoDTO;
import com.mintpot.busking.dto.web.request.BuskerInfoDTOEdit;
import com.mintpot.busking.dto.web.response.BuskerInfoWebDTO;
import com.mintpot.busking.service.BuskerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/busker")
@Api(tags = {"Web Busker Api"})
@Log4j2
public class BuskerWebController {

    @Autowired
    private BuskerService buskerService;

    @ApiOperation("Get All Busker")
    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public PageResponse<BuskerInfoDTO> getAll(@RequestParam(defaultValue = "0", required = false) Integer page,
                                              @RequestParam(defaultValue = "10", required = false) Integer size,
                                              @RequestParam(defaultValue = "", required = false) String keyword
    ) {
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<BuskerInfoDTO> response = buskerService.findAllBySearch(pageable, keyword);
        return response;
    }

    @ApiOperation("Get Busker By Id")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BuskerInfoDTOEdit getUserById(@PathVariable("id") Integer id) throws JsonProcessingException {
        BuskerInfoDTOEdit dto = buskerService.findById(id);
        return dto;
    }


    @ApiOperation("Busker application details")
    @GetMapping("/application")
    @ResponseStatus(HttpStatus.OK)
    public PageResponse<BuskerInfoDTO> getUserWatting(@RequestParam(defaultValue = "0", required = false) Integer page,
                                                      @RequestParam(defaultValue = "10", required = false) Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return buskerService.findUserWaiting(pageable);
    }


    @ApiOperation("Delete Busker by id")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBusker(@PathVariable("id") Integer id) {
        buskerService.delete(id);
    }

    @ApiOperation("Update Busker by id")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BuskerInfoWebDTO update(@RequestBody BuskerInfoDTOEdit body, @PathVariable Integer id) {
        return  buskerService.update(body, id);
    }

    @ApiOperation("reject Busker by id")
    @PutMapping("/reject/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void reject(@PathVariable("id") Integer id) {
        buskerService.reject(id);
    }

    @ApiOperation("rejects Busker by List ids")
    @PutMapping("/reject")
    @ResponseStatus(HttpStatus.OK)
    public void rejects(@RequestParam("ids") List<Integer> ids) {
        buskerService.rejects(ids);
    }

    @ApiOperation("approved Busker by id")
    @PutMapping("/approved/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void approved(@PathVariable("id") Integer id) {
        buskerService.approved(id);
    }

    @ApiOperation("approved Busker by List ids")
    @PutMapping ("/approved")
    @ResponseStatus(HttpStatus.OK)
    public void approveds(@RequestParam("ids") List<Integer> ids) {
        buskerService.approveds(ids);
    }

}
