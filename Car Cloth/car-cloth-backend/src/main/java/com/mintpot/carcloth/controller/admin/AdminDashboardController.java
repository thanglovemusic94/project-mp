package com.mintpot.carcloth.controller.admin;

import com.mintpot.carcloth.dto.admin.DashboardDto;
import com.mintpot.carcloth.service.MainHomeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/admin/dashboard")
@Api(tags = {"Dashboard"})
@RequiredArgsConstructor
public class AdminDashboardController {

    private final MainHomeService mainHomeService;

    @GetMapping("/")
    @ApiOperation(value = "api for admin get info for dashboard")
    @ResponseStatus(HttpStatus.OK)
    public DashboardDto dashboard() {

        return mainHomeService.dashboard();
    }
}
