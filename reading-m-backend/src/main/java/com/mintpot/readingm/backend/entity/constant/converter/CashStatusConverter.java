package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.CashStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class CashStatusConverter implements AttributeConverter<CashStatus, Integer> {
    @Override
    public Integer convertToDatabaseColumn(CashStatus cashStatus) {
        return cashStatus != null ? cashStatus.getCode() : null;
    }

    @Override
    public CashStatus convertToEntityAttribute(Integer code) {
        return CashStatus.valueOf(code);
    }
}
