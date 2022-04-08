package com.mintpot.readingm.backend.dto.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.readingm.backend.dto.admin.VideoDto;
import com.mintpot.readingm.backend.dto.payment.embedded.ClassInfo;
import com.mintpot.readingm.backend.dto.payment.embedded.PayerInfo;
import com.mintpot.readingm.backend.dto.payment.embedded.PaymentInfo;
import com.mintpot.readingm.backend.entity.constant.PaymentMethod;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PaymentDetailDto {
    private PaymentInfo paymentInfo;

    @JsonProperty("classInfo")
    private ClassInfo classInformation;

    private PayerInfo payerInfo;

    public void setChildName(String childName) {
        payerInfo.setChildName(childName);
    }

    private List<VideoDto> videoInPays;
}

