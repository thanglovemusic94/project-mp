package com.mintpot.readingm.backend.dto.payment.embedded;

import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentInfo {
    private PaymentMethod method;

    private int amount;

    private int discount;

    private int eventPoint;

    private int cashPoint;

    private int finalAmount;
}
