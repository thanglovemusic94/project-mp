package com.mintpot.readingm.backend.dto.parent;

import com.mintpot.readingm.backend.entity.constant.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PaymentListDto {

    private long id;

    private LocalDateTime createdOn;

    private int amount;

    private ClassInformation classInformation;

    private PaymentStatus status;
}