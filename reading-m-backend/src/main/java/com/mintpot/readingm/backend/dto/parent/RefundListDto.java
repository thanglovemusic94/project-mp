package com.mintpot.readingm.backend.dto.parent;

import com.mintpot.readingm.backend.entity.constant.RefundStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
public class RefundListDto {
    private long id;

    private RefundStatus status;

    private LocalDateTime createdOn;

    private PaymentListDto payment;
}
