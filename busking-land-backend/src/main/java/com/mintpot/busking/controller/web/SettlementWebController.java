package com.mintpot.busking.controller.web;

import com.mintpot.busking.controller.AdminController;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.response.BankWithdrawSettlementDTO;
import com.mintpot.busking.helper.service.ExcelService;
import com.mintpot.busking.model.constant.PointTransactionType;
import com.mintpot.busking.service.BankWithDrawService;
import com.mintpot.busking.service.PointService;
import com.mintpot.busking.utils.DateTimeUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/settlement")
@Api(tags = {"Web Settlement Api"})
@Log4j2
public class SettlementWebController extends AdminController {

    @Autowired
    private BankWithDrawService withDrawService;

    @Autowired
    private PointService pointService;

    @Autowired
    private ExcelService excelService;

    @ApiOperation("Get All Settlement Request")
    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public PageResponse<BankWithdrawSettlementDTO> getAll(
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false)
                    PointTransactionType pointType,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end,
            @RequestParam(required = false) String name
    ) throws ParseException {
//        if (StringUtils.isEmpty(pointType)) {
//            pointType = new ArrayList<>();
//            pointType.add("WITHDRAW_REQUEST");
//            pointType.add("WITHDRAW_APPROVE");
//        }
        Pageable pageable = PageRequest.of(page, size, Sort.by("pointHistory.createdOn").descending());
        PageResponse<BankWithdrawSettlementDTO> response = withDrawService.findAll(name, pointType, DateTimeUtils.asDate(start), DateTimeUtils.asDate(end), pageable);
        return response;

    }

    @ApiOperation("find Settlement by id")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BankWithdrawSettlementDTO getBuskingById(@PathVariable("id") Long id) {
        BankWithdrawSettlementDTO dto = withDrawService.findById(id);
        return dto;
    }

    @ApiOperation("Confirm Approve Settlement")
    @PutMapping("/approve/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void approveSettlement(@PathVariable("id") Long id) {
        pointService.withdrawAccept(Math.toIntExact(id));
    }

    @ApiOperation("Confirm Reject Settlement")
    @PutMapping("/reject/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void rejectSettlement(@PathVariable("id") Long id) {
        pointService.withdrawReject(Math.toIntExact(id));
    }



    @GetMapping("/download")
    public ResponseEntity<Resource> getFile() throws IOException {

        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String filename = "settlements_" + currentDateTime + ".xlsx";
        InputStreamResource file = new InputStreamResource(excelService.load());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }

}
