package com.mintpot.busking.service;

import com.mintpot.busking.api.naver_stream.dto.NaverServiceInfo;
import com.mintpot.busking.dto.BuskingProgressInfo;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.SliceDto;
import com.mintpot.busking.dto.api.*;
import com.mintpot.busking.dto.web.BuskingDTO;
import com.mintpot.busking.dto.web.request.BuskingEditDTO;

import com.mintpot.busking.dto.web.response.BuskingNameDTO;
import com.mintpot.busking.model.constant.BuskingType;
import com.mintpot.busking.model.constant.BuskingWebAdminStatusFilter;
import com.mintpot.busking.model.constant.Period;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface BuskingService {

    void createBusking (BuskingRegDto regDto);

    SliceDto<BuskingInfoDto> getBuskingWaiting (LocalDate startDate, LocalDate endDate);

    SliceDto<BuskingInfoDto> getBusking (Pageable pageable, Period period);

    void editBusking (BuskingRegDto regDto, int buskingId);

    void deleteBusking (BuskingDeleteDto buskingDeleteDto);

    SliceDto<BuskingInfoDto> getBuskingLiveInNearBy (Double lat, Double lng);

    SliceDto<BuskingInfoDto> getBuskingInScheduleInNearBy (Double lat, Double lng);

    SliceDto<BuskingInfoDto> getBuskingScheduleInLand (int landId, LocalDate startDate, LocalDate endDate);

    SliceDto<BuskingInfoDto> getBuskingLiveFilter (BuskingFilterDto filterDto);

    SliceDto<BuskingInfoDto> getBuskingScheduleFilter (BuskingFilterDto filterDto);

    SliceDto<HomeSearchDto> buskingHomeSearch (String keySearch);

    void addViewer (BuskingViewerRegDto viewerRegDto);

    void removeViewer (BuskingViewerRegDto viewerRegDto);

    void addSponsor (BuskingSponsorRegDto sponsorRegDto);

    void addLike(BuskingLikeRegDto likeRegDto);

    BuskingBroadcastLinkInfo getBroadcastLinkInfo (int buskingId);

    SliceDto<NaverServiceInfo> getStreamingLinkInfo (int buskingId);

    BuskingProgressInfo streamingStatus (int buskingId);

    void startLive (int buskingId);

    void endLive (int buskingId);

    void updateConfig (BuskingConfigRegDto configRegDto);

    /**
     * Web web
     */

    PageResponse<BuskingDTO> findAll(Date start, Date end , String name, BuskingWebAdminStatusFilter adminStatus, BuskingType buskingType, Pageable pageable);
    PageResponse<BuskingDTO> findAllWaiting ( Pageable pageable, BuskingType buskingType);
    BuskingEditDTO findById(Integer id) throws ParseException;
    BuskingDTO update(BuskingEditDTO dto, Integer id) throws ParseException;
    void delete(Integer id);

    void reject(Integer id);
    void rejects(List<Integer> ids);
    void approved(Integer id);
    void approveds(List<Integer> ids);

    List<BuskingNameDTO> findAllName();

    /**
     * end
     */
}
