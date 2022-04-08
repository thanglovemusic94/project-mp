package com.mintpot.readingm.backend.dto.payment;

import com.mintpot.readingm.backend.dto.admin.ClassDto;
import com.mintpot.readingm.backend.dto.admin.VideoInPayDto;
import com.mintpot.readingm.backend.dto.payment.embedded.PayerInfo;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.constant.PaymentStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AdPaymentDetailDto {

    private long id;

    private PayerInfo payer;

    private String childrenName;

    private ClassDto classInformation;

    private ClassType classType;

    private LocalDateTime paymentTime;

    private PaymentStatus status;

    private PaymentMethod method;

    private int payValue;

    private int amount;

    private int discount;

    private int eventPoint;

    private int cashPoint;

    private List<VideoInPayDto> videoInPays;
}

