package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.dto.payment.AdPaymentDetailDto;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.constant.RefundStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class RefundDto {
    private long id;

    private AdPaymentDetailDto payment;

    private int amount;

    private PaymentMethod method;

    private int cashPoint;

    private int eventPoint;

    private String reason;

    private LocalDateTime refundTime;

    private RefundStatus status;
}
