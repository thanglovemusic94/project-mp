package com.mintpot.busking.controller.web;

import com.mintpot.busking.dto.web.response.DashboardWebDTO;
import com.mintpot.busking.service.impl.DashboardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/dashboard")
@Api(tags = {"Web Dashboard Manager Api"}, produces = "web web")
@Log4j2
public class DashboardWebController {

    @Autowired
    private DashboardService dashboardService;

    @ApiOperation("Dashboard")
    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public DashboardWebDTO getDashboard() {
      return DashboardWebDTO.builder()
              .live_count(dashboardService.liveCount())
              .offline_count(dashboardService.offlineCount())
              .total_user_count(dashboardService.totalUserCount())
              .exchange_count(dashboardService.exchangeCount())
              .build();
    }
}
