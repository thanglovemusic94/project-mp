package com.mintpot.busking.dto.web.response;

import com.mintpot.busking.dto.api.UserShortInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Admin
 * @date 2021-02-22 15:25 PM
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BankWithdrawSettlementDTO {

    private long id;

    UserShortInfoDto user;

    PointHistoryDto pointHistory;

    private String bankName;

    private String accountNumber;

    private String accountHolder;

    private String image;
}
