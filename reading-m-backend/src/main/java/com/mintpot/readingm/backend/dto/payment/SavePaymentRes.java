package com.mintpot.readingm.backend.dto.payment;

import com.mintpot.readingm.backend.dto.payment.embedded.PayerInfo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SavePaymentRes {
    private String orderId;

    private int finalAmount;

    private PayerInfo payerInfo;
}

