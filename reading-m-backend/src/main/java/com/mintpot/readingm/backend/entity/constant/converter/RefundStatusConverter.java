package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.RefundStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class RefundStatusConverter implements AttributeConverter<RefundStatus, Integer> {
    @Override
    public Integer convertToDatabaseColumn(RefundStatus refundStatus) {
        return refundStatus != null ? refundStatus.getCode() : null;
    }

    @Override
    public RefundStatus convertToEntityAttribute(Integer code) {
        return RefundStatus.valueOf(code);
    }
}
