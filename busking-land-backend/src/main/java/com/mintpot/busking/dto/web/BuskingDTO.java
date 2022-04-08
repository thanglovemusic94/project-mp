package com.mintpot.busking.dto.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mintpot.busking.dto.web.response.Busking_BuskingLandDTO;
import com.mintpot.busking.model.constant.BuskingProgress;
import com.mintpot.busking.model.constant.BuskingStatus;
import com.mintpot.busking.model.constant.BuskingType;
import com.mintpot.busking.model.constant.BuskingWebAdminStatus;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuskingDTO {

    private Integer id;
    private String title;
    private String name;
    private String image;
    private BuskingType type;
    private BuskingStatus status;
    private BuskingProgress progress;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date start;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date end;
    private BuskingWebAdminStatus adminStatus = BuskingWebAdminStatus.WAITING;

    private Integer durationInMinute;
    private Integer numberLike;
    private Integer numberSponsor;
    private Integer numberViewer;
    private Integer numberViewerAccumulative;
    private Integer isNoticed;
    private Busking_BuskingLandDTO buskingLand;
    private Busking_UserDTO user;
    private String channelId;
    private String naverStreamId;
    private String naverStreamUrl;
    private String naverStreamKey;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date updateAt;


    public void generateStatus () {
        Date now = Date.from(Instant.now());
        if(type == BuskingType.LIVE) {
            if(status == BuskingStatus.IN_ACTIVE && start.after(now)) {
                adminStatus = BuskingWebAdminStatus.WAITING;
            }
            if(status == BuskingStatus.ACTIVE && start.after(now)) {
                adminStatus = BuskingWebAdminStatus.IN_SCHEDULE;
            }
            if(progress == BuskingProgress.IN_LIVE && end.after(now)) {
                adminStatus = BuskingWebAdminStatus.IN_PROGRESS;
            }
            if(end.before(now)) {
                adminStatus = BuskingWebAdminStatus.COMPLETED;
            }
            if(status == BuskingStatus.REJECT) {
                adminStatus = BuskingWebAdminStatus.REJECTED;
            }
            if(status == BuskingStatus.DELETED) {
                adminStatus = BuskingWebAdminStatus.DELETED;
            }
        } else {
            if(status == BuskingStatus.IN_ACTIVE && start.after(now)) {
                adminStatus = BuskingWebAdminStatus.WAITING;
            }
            if(status == BuskingStatus.ACTIVE && start.after(now)) {
                adminStatus = BuskingWebAdminStatus.IN_SCHEDULE;
            }
            if(start.before(now) && end.after(now)) {
                adminStatus = BuskingWebAdminStatus.IN_PROGRESS;
            }
            if(end.before(now)) {
                adminStatus = BuskingWebAdminStatus.COMPLETED;
            }
            if(status == BuskingStatus.REJECT) {
                adminStatus = BuskingWebAdminStatus.REJECTED;
            }
            if(status == BuskingStatus.DELETED) {
                adminStatus = BuskingWebAdminStatus.DELETED;
            }
        }
    }


}
