package com.mintpot.carcloth.dto.payment;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class InitPaymentRes {

    private long amount;

    private int points;

    private String orderId;
}
