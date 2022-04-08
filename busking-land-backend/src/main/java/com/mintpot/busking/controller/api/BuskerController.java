package com.mintpot.busking.controller.api;

import com.mintpot.busking.dto.api.BuskerRegDto;
import com.mintpot.busking.service.BuskerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = { "Busker Api" })
@RequestMapping(path = "/busker")
@Log4j2
public class BuskerController {

    private final BuskerService buskerService;

    public BuskerController(BuskerService buskerService) {
        this.buskerService = buskerService;
    }

    @PostMapping("")
    @ApiOperation("Busker Registration")
    public void buskerRegistration (@RequestBody BuskerRegDto regDto) {
        buskerService.registerBusker(regDto);
    }

    @PatchMapping("")
    @ApiOperation("Edit Busker Info")
    public void buskerEdit (@RequestBody BuskerRegDto regDto) {
        buskerService.editBusker(regDto);
    }
}
