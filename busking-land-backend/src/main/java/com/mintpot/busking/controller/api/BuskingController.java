package com.mintpot.busking.controller.api;

import com.mintpot.busking.api.naver_stream.NaverStreamingApiClient;
import com.mintpot.busking.api.naver_stream.dto.NaverServiceInfo;
import com.mintpot.busking.controller.ApiController;
import com.mintpot.busking.dto.BuskingProgressInfo;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.*;
import com.mintpot.busking.model.constant.Period;
import com.mintpot.busking.service.BuskingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@Api(tags = { "Busking Api" })
@RequestMapping(path = "/busking")
@Log4j2
public class BuskingController extends ApiController {

    private final BuskingService buskingService;

    public BuskingController(BuskingService buskingService, NaverStreamingApiClient naverStreamingApiClient) {
        this.buskingService = buskingService;
    }

    @PostMapping("")
    @ApiOperation("Busking Registration")
    @ResponseStatus(HttpStatus.CREATED)
    public void buskingRegistration (@RequestBody BuskingRegDto regDto) {
        buskingService.createBusking(regDto);
    }

    @GetMapping("")
    @ApiOperation("Get Busking")
    SliceDto<BuskingInfoDto> getBusking (@RequestParam int page, @RequestParam int size, @RequestParam Period period) {
        return buskingService.getBusking(PageRequest.of(page, size), period);
    }

    @GetMapping("/waiting")
    @ApiOperation("Get Waiting Busking")
    SliceDto<BuskingInfoDto> getBusking (
            @DateTimeFormat (pattern = "dd/MM/yyyy")
            @ApiParam(example = "01/01/2021")
            @RequestParam LocalDate startDate,
            @DateTimeFormat (pattern = "dd/MM/yyyy")
            @ApiParam(example = "31/01/2021")
            @RequestParam LocalDate endDate) {
        return buskingService.getBuskingWaiting(startDate, endDate);
    }


    @PatchMapping("")
    @ApiOperation("Busking Edit")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void buskingEdit (@RequestBody BuskingRegDto regDto, int buskingId){
        buskingService.editBusking(regDto, buskingId);
    }

    @DeleteMapping("")
    @ApiOperation("Busking Delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void buskingDelete (@RequestBody BuskingDeleteDto buskingDeleteDto){
        buskingService.deleteBusking(buskingDeleteDto);
    }

    @GetMapping("/streaming")
    @ApiOperation("Get Streaming Url List")
    public SliceDto<NaverServiceInfo> getStreamingList (int buskingId) {
        return buskingService.getStreamingLinkInfo(buskingId);
    }

    @GetMapping("/streaming/progress")
    @ApiOperation("Get Busking Streaming Progress")
    public BuskingProgressInfo getBuskingProgress (int buskingId){
        return buskingService.streamingStatus(buskingId);
    }
    @GetMapping("/streaming/start")
    @ApiOperation("Start Streaming")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void startLiveStream (int buskingId) {
        buskingService.startLive(buskingId);
    }

    @GetMapping("/streaming/end")
    @ApiOperation("Start Streaming")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void endLiveStream (int buskingId) {
        buskingService.endLive(buskingId);
    }

    @GetMapping("/broadcast")
    @ApiOperation("Get Broadcast Url List")
    public BuskingBroadcastLinkInfo getBroadcastLink (int buskingId) {
        return buskingService.getBroadcastLinkInfo(buskingId);
    }

    @GetMapping("/nearby/live")
    @ApiOperation("Busking Live In NearBy")
    public SliceDto<BuskingInfoDto> getBuskingLiveInNearBy (Double lat, Double lng) {
        return buskingService.getBuskingLiveInNearBy(lat, lng);
    }

    @GetMapping("/nearby/schedule")
    @ApiOperation(("Busking Schedule In NearBy"))
    public SliceDto<BuskingInfoDto> getBuskingScheduleInNearBy (Double lat, Double lng, int page, int limit) {
        return buskingService.getBuskingInScheduleInNearBy(lat, lng);
    }

    @GetMapping("/filter/live")
    @ApiOperation("Busking Live In NearBy")
    public SliceDto<BuskingInfoDto> getBuskingFilterLive (BuskingFilterDto filterDto) {
        return buskingService.getBuskingLiveFilter(filterDto);
    }

    @GetMapping("/filter/schedule")
    @ApiOperation("Busking Live In NearBy")
    public SliceDto<BuskingInfoDto> getBuskingFilterSchedule (BuskingFilterDto filterDto) {
        return buskingService.getBuskingScheduleFilter(filterDto);
    }

    @GetMapping("/home/search")
    @ApiOperation(("Home Search"))
    public SliceDto<HomeSearchDto> homeSearch (String keySearch) {
        return buskingService.buskingHomeSearch(keySearch);
    }

    @GetMapping("/land")
    @ApiOperation(("Get Busking Schedule In Busking Land"))
    public SliceDto<BuskingInfoDto> getBuskingInLand (int landId, int page, int limit,
                                                            @DateTimeFormat (pattern = "dd/MM/yyyy")
                                                            @ApiParam(example = "01/01/2021")
                                                            @RequestParam LocalDate startDate,
                                                            @DateTimeFormat (pattern = "dd/MM/yyyy")
                                                            @ApiParam(example = "31/01/2021")
                                                            @RequestParam LocalDate endDate) {
        return buskingService.getBuskingScheduleInLand(landId, startDate, endDate);
    }

    @PostMapping("/viewer/join")
    @ApiOperation("Viewer Join a Busking")
    @ResponseStatus(HttpStatus.CREATED)
    public void addViewer (@RequestBody BuskingViewerRegDto regDto) {
        buskingService.addViewer(regDto);
    }

    @PostMapping("/viewer/left")
    @ApiOperation("Viewer Left a Busking")
    @ResponseStatus(HttpStatus.CREATED)
    public void removeViewer (@RequestBody BuskingViewerRegDto regDto) {
        buskingService.removeViewer(regDto);
    }

    @PostMapping("/viewer/like")
    @ApiOperation("Viewer Join a Busking")
    @ResponseStatus(HttpStatus.CREATED)
    public void addLike (@RequestBody BuskingLikeRegDto regDto) {
        buskingService.addLike(regDto);
    }

    @PostMapping("/viewer/sponsor")
    @ApiOperation("Viewer Sponsor a Busking")
    @ResponseStatus(HttpStatus.CREATED)
    public void addSponsor (@RequestBody BuskingSponsorRegDto regDto) {
        buskingService.addSponsor(regDto);
    }

    @PostMapping("/streamer/config")
    @ApiOperation("Streamer Change Config")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateStreamerConfig (@RequestBody BuskingConfigRegDto regDto) {buskingService.updateConfig(regDto);}

}
