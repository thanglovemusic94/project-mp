package com.mintpot.readingm.backend.dto.payment;

import com.mintpot.readingm.backend.dto.admin.VideoInPayDto;
import com.mintpot.readingm.backend.entity.clazz.Course;
import com.mintpot.readingm.backend.entity.constant.ClassType;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import com.mintpot.readingm.backend.entity.embeddable.PayerInfo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SavePaymentDto {
    private long childId;

    private long classId;

    private ClassType classType;

    private PaymentMethod method;

    private PayerInfo payerInfo;

    private int amount;

    private long couponId;

    private int eventPoint;

    private int cashPoint;

    private List<VideoInPayDto> videoInPays;

    private List<Integer> courseIndex;

}
