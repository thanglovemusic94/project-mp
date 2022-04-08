package com.mintpot.busking.controller.web;

import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.response.Busker_BankWithDrawDTO;
import com.mintpot.busking.service.BankWithDrawService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/bank")
@Api(tags = {"Web Bank Api"})
@Log4j2

public class BankWebController {

    @Autowired
    private BankWithDrawService withDrawService;

    @ApiOperation("Get Bank by user id")
    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public PageResponse<Busker_BankWithDrawDTO> getAll(
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false) Integer user_id
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("pointHistory.createdOn").descending());
        PageResponse<Busker_BankWithDrawDTO> response = withDrawService.findAllBrankByBusker(user_id, pageable);
        return response;
    }
}
