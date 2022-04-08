package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.PointAction;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class PointActionConverter implements AttributeConverter<PointAction, Integer> {
    @Override
    public Integer convertToDatabaseColumn(PointAction action) {
        return action != null ? action.getCode() : null;
    }

    @Override
    public PointAction convertToEntityAttribute(Integer code) {
        return PointAction.valueOf(code);
    }
}
