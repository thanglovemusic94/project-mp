package com.mintpot.carcloth.entity.converters;

import com.mintpot.carcloth.constant.enums.EConstructionType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ConstructionTypeConverter implements AttributeConverter<EConstructionType, Integer> {

    @Override
    public Integer convertToDatabaseColumn(EConstructionType type) {
        if (type == null)
            return null;
        return type.getCode();
    }

    @Override
    public EConstructionType convertToEntityAttribute(Integer code) {
        if (code == null)
            return null;

        return EConstructionType.valueOf(code);
    }
}
