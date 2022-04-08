package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.CashRequirementDto;
import com.mintpot.readingm.backend.dto.admin.SaveCashRequirementDto;
import com.mintpot.readingm.backend.entity.CashRequirement;
import com.mintpot.readingm.backend.entity.CashStatus;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.service.CashRequirementService;
import com.mintpot.readingm.backend.spec.SearchDateSpecification;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;


@RestController
@RequestMapping("/api/admin/cash-requirement")
@Api(tags={"Cash-requirement"})
@RequiredArgsConstructor
public class CashRequirementController {
    private final CashRequirementService cashRequirementService;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping
    @ApiOperation(value = "Api for web admin 6-3" , notes = "date format yyyy-MM-dd")
    public Page<CashRequirementDto> getList(@RequestParam(required = false) CashStatus status,
                                            @RequestParam(required = false) String optionSearch,
                                            @RequestParam(required = false) String query,
                                            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate start,
                                            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate end,
                                            Pageable page) {

        authenticationFacade.assertAdmin();
        return cashRequirementService.findBySpec(status, optionSearch, query, start, end, page);
    }

    @GetMapping("/{id}")
    public CashRequirementDto getDetail(@PathVariable Long id) {
        authenticationFacade.assertAdmin();
        return cashRequirementService.getCashRequirementById(id)
                .map(cashRequirementService::convertEntityToDto)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @PatchMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void UpdateCashRequirementStatus(long id, CashStatus status) {
        authenticationFacade.assertAdmin();
        cashRequirementService.updateCashRequirementStatus(id, status);
    }
}
