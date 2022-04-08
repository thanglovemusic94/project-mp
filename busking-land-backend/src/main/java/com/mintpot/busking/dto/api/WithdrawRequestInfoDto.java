package com.mintpot.busking.dto.api;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WithdrawRequestInfoDto {

    private int amount;

    private BankWithdrawInfoDto bank;

}
