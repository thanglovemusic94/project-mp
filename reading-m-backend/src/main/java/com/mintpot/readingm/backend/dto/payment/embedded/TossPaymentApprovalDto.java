package com.mintpot.readingm.backend.dto.payment.embedded;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TossPaymentApprovalDto {
    private String orderId;

    private int amount;
}
