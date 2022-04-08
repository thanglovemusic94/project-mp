package com.mintpot.busking.dto.web.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mintpot.busking.model.constant.PointTransactionType;
import com.mintpot.busking.model.constant.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author Admin
 * @date 2021-02-23 9:39 AM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointHistoryDto {

    private long pointHistoryId;
    private PointTransactionType type;
    private Integer amount;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createdOn;
    private Status status;
}
