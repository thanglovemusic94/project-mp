package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.PaymentMethod;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class PaymentMethodConverter implements AttributeConverter<PaymentMethod, Integer> {
    @Override
    public Integer convertToDatabaseColumn(PaymentMethod attribute) {
        return attribute != null ? attribute.getCode() : null;
    }

    @Override
    public PaymentMethod convertToEntityAttribute(Integer code) {
        return PaymentMethod.valueOf(code);
    }
}
