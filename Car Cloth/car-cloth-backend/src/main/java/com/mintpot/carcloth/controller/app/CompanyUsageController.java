package com.mintpot.carcloth.controller.app;

import com.mintpot.carcloth.dto.CompanyUsageDto;
import com.mintpot.carcloth.service.CompanyService;
import com.mintpot.carcloth.service.CompanyUsageService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.quartz.SchedulerException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/app/company-usage")
@Api(tags = {"Company usage"})
@RequiredArgsConstructor
public class CompanyUsageController {
    private final CompanyService companyService;
    private final CompanyUsageService companyUsageService;
    private final ModelMapper mapper;

    @GetMapping
    public CompanyUsageDto points() {
        var company = companyService.getCurrentCompany();
        var rs =  mapper.map(company, CompanyUsageDto.class);
        rs.setAutoExtendTime(company.getExpiredDateTime());
        rs.setPoint(company.getRequestUser().getPoint());

        return rs;
    }

    @PatchMapping("/release")
    public void releaseAutoExtend() throws SchedulerException {
        companyUsageService.releaseAutoExtension();
    }

    @PatchMapping("/restore-auto")
    public void restoreAutoExtend() throws SchedulerException {
        companyUsageService.restoreAutoExtension();
    }

}
