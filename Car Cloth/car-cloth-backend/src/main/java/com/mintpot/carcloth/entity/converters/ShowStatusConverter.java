package com.mintpot.carcloth.entity.converters;

import com.mintpot.carcloth.constant.ShowStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ShowStatusConverter implements AttributeConverter<ShowStatus, Integer> {
    @Override
    public Integer convertToDatabaseColumn(ShowStatus status) {
        return status != null ? status.getCode() : null;
    }

    @Override
    public ShowStatus convertToEntityAttribute(Integer code) {
        return code != null ? ShowStatus.valueOf(code) : null;
    }
}