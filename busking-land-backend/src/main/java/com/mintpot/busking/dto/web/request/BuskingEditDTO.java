package com.mintpot.busking.dto.web.request;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.mintpot.busking.model.constant.*;
import com.mintpot.busking.utils.DateTimeUtils;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({"image", "start", "name", "durationInMinute", "username", "status", "land", "numberLike", "numberSponsor", "numberViewer"})
public class BuskingEditDTO {
    private String image;
    private String start;
    private String end;
    private String name;
    private Integer durationInMinute;
    private String username;
    private String status;
    private String progress;
    private BuskingWebAdminStatus adminStatus;
    private String land;
    private BuskingType type;
    private Integer numberLike;
    private Integer numberSponsor;
    private Integer numberViewerAccumulative;

    public void generateStatus() throws ParseException {
        Date now = Date.from(Instant.now());
        if (BuskingStatus.valueOf(status).equals(BuskingStatus.IN_ACTIVE) && DateTimeUtils.asDate(start).after(now)) {
            adminStatus = BuskingWebAdminStatus.WAITING;
        }
        if (BuskingStatus.valueOf(status).equals(BuskingStatus.ACTIVE) && DateTimeUtils.asDate(start).after(now)) {
            adminStatus = BuskingWebAdminStatus.IN_SCHEDULE;
        }
        if (type == BuskingType.LIVE) {
            if (BuskingProgress.valueOf(progress).equals(BuskingProgress.IN_LIVE) && DateTimeUtils.asDate(end).after(now)) {
                adminStatus = BuskingWebAdminStatus.IN_PROGRESS;
            }
        } else {
            if (BuskingProgress.valueOf(progress).equals(BuskingProgress.IN_LIVE) && DateTimeUtils.asDate(start).before(now) && DateTimeUtils.asDate(end).after(now)) {
                adminStatus = BuskingWebAdminStatus.IN_PROGRESS;
            }
        }
        if (DateTimeUtils.asDate(end).before(now) && BuskingStatus.valueOf(status).equals(BuskingStatus.ACTIVE) ) {
            adminStatus = BuskingWebAdminStatus.COMPLETED;
        }
        if (BuskingStatus.valueOf(status).equals(BuskingStatus.REJECT)) {
            adminStatus = BuskingWebAdminStatus.REJECTED;
        }
        if (BuskingStatus.valueOf(status).equals(BuskingStatus.DELETED)) {
            adminStatus = BuskingWebAdminStatus.DELETED;
        }
    }
}

