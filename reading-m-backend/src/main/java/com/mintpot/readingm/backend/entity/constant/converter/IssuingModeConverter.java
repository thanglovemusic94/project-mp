package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.IssuingMode;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class IssuingModeConverter implements AttributeConverter<IssuingMode, Integer> {
    @Override
    public Integer convertToDatabaseColumn(IssuingMode issuingMode) {
        return issuingMode != null ? issuingMode.getCode() : null;
    }

    @Override
    public IssuingMode convertToEntityAttribute(Integer code) {
        return IssuingMode.valueOf(code);
    }
}
