package com.mintpot.busking.dto;

import com.mintpot.busking.dto.api.UserShortInfoDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BankWithdrawSettlementInfoDto {

    UserShortInfoDto user;

    PointHistoryInfoDto pointHistory;

    private String bankName;

    private String accountNumber;

    private String accountHolder;

}
