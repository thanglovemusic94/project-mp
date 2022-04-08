package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveRefundDto {
    private long paymentId;

    private int amount;

    private int cashPoint;

    private int eventPoint;

    private PaymentMethod method;

    private String reason;
}
