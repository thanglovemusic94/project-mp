package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.RefundDto;
import com.mintpot.readingm.backend.entity.constant.InquiryStatus;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.constant.RefundStatus;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.RefundService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/admin/refund")
@Api(tags = {"Refund"})
@RequiredArgsConstructor
public class RefundController {
    private final RefundService refundService;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping
    @ApiOperation(value="Api for web admin 6-2")
    public Page<RefundDto> getRefundList(@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startTime,
                                         @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endTime,
                                         @RequestParam(required = false) RefundStatus status,
                                         @RequestParam(required = false) PaymentMethod method,
                                         @RequestParam(required = false) String optionSearch,
                                         @RequestParam(required = false) String term,
                                         Pageable page) {

        authenticationFacade.assertAdmin();
        return refundService.search(startTime, endTime, status, method, optionSearch, term, page);
    }

    @GetMapping("/{refundId}")
    public RefundDto getDetail(@PathVariable Long refundId) {
        authenticationFacade.assertAdmin();
        return refundService.getRefundById(refundId)
                .map(refundService::convertEntityToDto)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @PatchMapping("/{refundId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateStatus(@PathVariable long refundId, RefundStatus status) {
        authenticationFacade.assertAdmin();
        refundService.updateRefundStatus(refundId, status);
    }
}
