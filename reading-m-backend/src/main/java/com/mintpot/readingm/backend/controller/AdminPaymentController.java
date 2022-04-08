package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.payment.AdPaymentDetailDto;
import com.mintpot.readingm.backend.dto.payment.AdPaymentListView;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.PaymentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
@Api(tags = {"Payment"})
@RequiredArgsConstructor
public class AdminPaymentController {

    private final PaymentService paymentService;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping
    @ApiOperation(value = "" , notes = "date format yyyy-MM-dd")
    public Page<AdPaymentListView> getList(
                                    @RequestParam(required = false) ClassType classType,
                                    @RequestParam(required = false) PaymentMethod method,
                                    @RequestParam(required = false) String tutorName,
                                    @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startTime,
                                    @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endTime,
                                    @RequestParam(required = false) String optionSearch,
                                    @RequestParam(required = false) String term,
                                    Pageable page) {

        authenticationFacade.assertAdmin();
        return paymentService.find(classType, method, tutorName, startTime, endTime, optionSearch, term, page);
    }

    @GetMapping("/{paymentId}")
    @ApiOperation(value = "web admin 6-1-1")
    public AdPaymentDetailDto getDetail(@PathVariable Long paymentId) {
        authenticationFacade.assertAdmin();
        return paymentService.getPaymentById(paymentId);
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> download(@RequestParam List<Long> ids) throws Exception {
        authenticationFacade.assertAdmin();
        String fileName = String.format("PaymentList_%s.xlsx", new SimpleDateFormat("yyyyMMdd").format(new Date()));
        ByteArrayResource resource = new ByteArrayResource(paymentService.exportExcel(ids));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .contentLength(resource.contentLength())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
