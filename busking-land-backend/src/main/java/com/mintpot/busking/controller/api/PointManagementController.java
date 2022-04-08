package com.mintpot.busking.controller.api;

import com.mintpot.busking.api.apple.inapp.VerifyReceiptReq;
import com.mintpot.busking.api.google_inapp.dto.GoogleReceipt;
import com.mintpot.busking.controller.ApiController;
import com.mintpot.busking.dto.BankWithdrawSettlementInfoDto;
import com.mintpot.busking.dto.ChargePointDto;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.WithdrawRequestInfoDto;
import com.mintpot.busking.model.PointChargeType;
import com.mintpot.busking.model.PointHistory;
import com.mintpot.busking.model.constant.Period;
import com.mintpot.busking.model.constant.PointTransactionType;
import com.mintpot.busking.security.UserDetails;
import com.mintpot.busking.service.PointService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@RestController
@Api(tags = {"Point Management"})
public class PointManagementController extends ApiController {

    private final PointService pointService;

    public PointManagementController(PointService pointService) {
        this.pointService = pointService;
    }

    @GetMapping("/points/chargeTypes")
    @ApiOperation(value = "Get Charge Types", notes = "Get a list of charge ratio points/currency")
    Iterable<PointChargeType> getPointChargeTypeList() {
        return pointService.getPointChargeTypeList();
    }

    @GetMapping("/points/history")
    @ResponseStatus(HttpStatus.OK)
    SliceDto<PointHistory> getMyPointHistoryByCategories(@ApiIgnore UsernamePasswordAuthenticationToken principal,
                                                         @RequestParam(required = false) PointTransactionType type,
                                                         @RequestParam Period period, @RequestParam int page,
                                                         @RequestParam int size) {
        int operatorId = ((UserDetails) principal.getPrincipal()).getUserId();

        return pointService.getByTypeAndPeriod(operatorId, type, period, PageRequest.of(page, size,
                Sort.Direction.DESC, "createdOn"));
    }


    @PostMapping("/points")
    @ResponseStatus(HttpStatus.CREATED)
    void chargePointsComplete(@ApiIgnore UsernamePasswordAuthenticationToken principal,
                              @Valid @RequestBody ChargePointDto chargePointDto) {
        int operatorId = ((UserDetails) principal.getPrincipal()).getUserId();
        pointService.doTransaction(chargePointDto.getAmount(), PointTransactionType.CHARGE, operatorId, null);
    }

    @PostMapping(value = "/points/charges/ios")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Charge Point for iOS")
    void chargePointsIOS(@RequestBody VerifyReceiptReq receiptData) {
        pointService.chargePointsIOS(receiptData);
    }


    @PostMapping(value = "/points/charges/android")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Charge Point for Android")
    void chargePointsAndroid(@RequestBody GoogleReceipt googleReceipt) {pointService.chargePointsAndroid(googleReceipt);}

    @PostMapping(value = "/points/withdraw")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Withdraw Point to Cash")
    void withdrawRequest (@RequestBody WithdrawRequestInfoDto infoDto) {
        pointService.withdrawRequest(infoDto);
    }

}
