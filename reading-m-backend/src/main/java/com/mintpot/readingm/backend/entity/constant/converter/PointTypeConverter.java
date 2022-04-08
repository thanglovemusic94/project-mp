package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.PointType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class PointTypeConverter implements AttributeConverter<PointType, Integer> {
    @Override
    public Integer convertToDatabaseColumn(PointType pointType) {
        return pointType != null ? pointType.getCode() : null;
    }

    @Override
    public PointType convertToEntityAttribute(Integer code) {
        return PointType.valueOf(code);
    }
}
