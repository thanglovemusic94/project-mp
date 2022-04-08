package com.mintpot.carcloth.controller.app;

import com.mintpot.carcloth.dto.NotificationDetail;
import com.mintpot.carcloth.dto.NotificationList;
import com.mintpot.carcloth.dto.company.*;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import com.mintpot.carcloth.service.CompanyService;
import com.mintpot.carcloth.service.NotificationService;
import com.mintpot.carcloth.service.QuoteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.quartz.SchedulerException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/app/company")
@Api(tags = {"App Company"})
@RequiredArgsConstructor
public class AppCompanyController {

    private final CompanyService companyService;
    private final QuoteService quoteService;
    private final NotificationService notificationService;

    @GetMapping("/{id}")
    @ApiOperation(value = "api for app get company info by id")
    @ResponseStatus(HttpStatus.OK)
    public CompanyDetail getCompany(@PathVariable long id) {

        return companyService.getCompany(id);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = "api for app register company")
    public FileInfo register(@Valid @RequestBody CompanyRegistration dto) {

        return companyService.registerCompany(dto);
    }

    @GetMapping("/register/history")
    @ApiOperation(value = "api for app get registration application history")
    @ResponseStatus(HttpStatus.OK)
    public CompanyRegistrationHistory getRegistrationHistory() {

        return companyService.getRegistrationHistory();
    }

    @PutMapping("/register/cancel")
    @ApiOperation(value = "api for app cancel application")
    @ResponseStatus(HttpStatus.OK)
    public void cancelRegistration() {

        companyService.cancelRegistration();
    }

    @PutMapping("/register/re-apply")
    @ApiOperation(value = "api for app re-apply application")
    @ResponseStatus(HttpStatus.OK)
    public FileInfo reApply(@Valid @RequestBody CompanyRegistration dto) {

        return companyService.reApply(dto);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app update company info")
    public FileInfo update(@Valid @RequestBody CompanyEditInfo dto) {

        return companyService.updateCompany(dto);
    }

    @DeleteMapping("/withdraw")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app withdraw company")
    public void withdraw() {

        companyService.withdraw();
    }

    @GetMapping("/sales/total")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app get total payment amount of current company by start-end date")
    public TotalSalesDto getTotalSales(@RequestParam @DateTimeFormat(pattern = "yyyy.MM.dd") LocalDate start,
                                       @RequestParam @DateTimeFormat(pattern = "yyyy.MM.dd") LocalDate end) {

        return quoteService.getTotalSales(start, end);
    }

    @GetMapping("/sales/info")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "api for app get page sales info of current company by start-end date")
    public Page<SalesInfo> getSalesInfo(@RequestParam @DateTimeFormat(pattern = "yyyy.MM.dd") LocalDate start,
                                        @RequestParam @DateTimeFormat(pattern = "yyyy.MM.dd") LocalDate end,
                                        Pageable pageable) {

        return quoteService.getSalesInfo(start, end, pageable);
    }

    @GetMapping("/notification")
    @ApiOperation(value = "api for app get all company notification")
    @ResponseStatus(HttpStatus.OK)
    public Page<NotificationList> getNotification(Pageable pageable) {
        return notificationService.getCompanyNotifications(pageable);
    }

    @GetMapping("/notification/{id}")
    @ApiOperation(value = "api for app get notification detail")
    @ResponseStatus(HttpStatus.OK)
    public NotificationDetail getNotificationDetail(@PathVariable long id) {

        return notificationService.getNotificationDetail(id);
    }

    @PutMapping("/extension")
    @ApiOperation(value = "api for app company extension of use")
    @ResponseStatus(HttpStatus.OK)
    public void extension() throws SchedulerException {

        companyService.extension();
    }
}
