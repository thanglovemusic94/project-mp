package com.mintpot.busking.dto.api;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BankWithdrawInfoDto {

    private String bankName;

    private String accountNumber;

    private String accountHolder;

    private String image;

}
