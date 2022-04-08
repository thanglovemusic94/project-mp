package com.mintpot.busking.dto.web.response;

import com.mintpot.busking.dto.web.UserDTO;
import com.mintpot.busking.model.constant.PointTransactionType;
import com.mintpot.busking.model.constant.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * @author Admin
 * @date 2021-02-17 15:42 PM
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointHistoryResponseDTO {

    private long pointHistoryId;
    private PointTransactionType type;
    private String description;
    private Integer amount;
    private UserDTO_PointHistory user;
    private List<BankWithdrawSettlementDTO> bankWithdraw;
    private String securityInfo1;
    private String securityInfo2;
    private String transactionId;
    private Status status;
    private Date createdOn;
    private Date updateOn;
}
