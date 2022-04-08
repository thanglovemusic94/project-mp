package com.mintpot.carcloth.controller.admin;

import com.mintpot.carcloth.constant.enums.ERegistrationStatus;
import com.mintpot.carcloth.constant.enums.EUsageStatus;
import com.mintpot.carcloth.dto.company.*;
import com.mintpot.carcloth.dto.enums.EAdApplicantFilterSearch;
import com.mintpot.carcloth.dto.enums.EAdCompanyFilterSearch;
import com.mintpot.carcloth.service.CompanyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin/company")
@Api(tags = {"Admin Company"})
@RequiredArgsConstructor
public class AdminCompanyController {

    private final CompanyService companyService;

    @GetMapping("/")
    @ApiOperation(value = "api for admin company list")
    @ResponseStatus(HttpStatus.OK)
    public Page<AdminCompany> getCompanyList(@RequestParam(required = false) EUsageStatus usageStatus,
                                             @RequestParam(required = false) EAdCompanyFilterSearch optionSearch,
                                             @RequestParam(required = false) String term,
                                             Pageable pageable) {

        return companyService.getCompanyList(usageStatus, optionSearch, term, pageable);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "api for admin company detail")
    @ResponseStatus(HttpStatus.OK)
    public AdminCompanyDetail getCompanyDetail(@PathVariable long id) {

        return companyService.getCompanyById(id);
    }

    @GetMapping("/applicant")
    @ApiOperation(value = "api for admin company applicant list")
    @ResponseStatus(HttpStatus.OK)
    public Page<AdminApplicant> getApplicantList(@RequestParam(required = false) ERegistrationStatus processingStatus,
                                                 @RequestParam(required = false) EAdApplicantFilterSearch optionSearch,
                                                 @RequestParam(required = false) String term,
                                                 Pageable pageable) {

        return companyService.getApplicantList(processingStatus, optionSearch, term, pageable);
    }

    @GetMapping("/applicant/{id}")
    @ApiOperation(value = "api for admin company applicant detail")
    @ResponseStatus(HttpStatus.OK)
    public AdminApplicantDetail getApplicantDetail(@PathVariable long id) {

        return companyService.getApplicantById(id);
    }

    @PutMapping("/{id}/process")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for admin approve/reject company registration application")
    public void process(@PathVariable long id, @Valid @RequestBody AdminProcessDto dto) {

        companyService.process(id, dto);
    }
}
