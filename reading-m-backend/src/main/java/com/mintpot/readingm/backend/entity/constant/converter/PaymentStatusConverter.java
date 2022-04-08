package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.PaymentStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class PaymentStatusConverter implements AttributeConverter<PaymentStatus, Integer> {
    @Override
    public Integer convertToDatabaseColumn(PaymentStatus status) {
        return status != null ? status.getCode() : null;
    }

    @Override
    public PaymentStatus convertToEntityAttribute(Integer code) {
        return PaymentStatus.valueOf(code);
    }
}
