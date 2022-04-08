package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.SettlementStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class SettlementStatusConverter implements AttributeConverter<SettlementStatus, Integer> {
    @Override
    public Integer convertToDatabaseColumn(SettlementStatus status) {
        return status != null ? status.getCode() : null;
    }

    @Override
    public SettlementStatus convertToEntityAttribute(Integer code) {
        return SettlementStatus.valueOf(code);
    }
}

