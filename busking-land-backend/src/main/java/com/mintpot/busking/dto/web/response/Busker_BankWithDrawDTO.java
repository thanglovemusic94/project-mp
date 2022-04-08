package com.mintpot.busking.dto.web.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Busker_BankWithDrawDTO {
    private String bankName;
    private String accountNumber;
    private String accountHolder;
    private String image;
    private PointHistoryDto pointHistory;

}
