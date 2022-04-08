package com.mintpot.busking.dto;

import com.mintpot.busking.model.constant.PointTransactionType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointHistoryInfoDto {

    private long pointHistoryId;

    private PointTransactionType type;

    private Integer amount;

}
