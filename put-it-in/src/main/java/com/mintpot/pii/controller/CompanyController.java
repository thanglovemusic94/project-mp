package com.mintpot.pii.controller;

import com.mintpot.pii.entity.Company;
import com.mintpot.pii.repository.CompanyRepository;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
@Api("Company")
public class CompanyController {

    private final CompanyRepository companyRepo;

    public CompanyController(CompanyRepository companyRepo) {
        this.companyRepo = companyRepo;
    }

    @GetMapping("/{companyId}")
    Optional<Company> getCompanyDetailsById(@PathVariable long companyId) {
        return companyRepo.findById(companyId);
    }
}
