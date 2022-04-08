package com.mintpot.carcloth.entity.converters;

import com.mintpot.carcloth.constant.enums.EProductType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ProductTypeConverter implements AttributeConverter<EProductType, Integer> {

    @Override
    public Integer convertToDatabaseColumn(EProductType type) {
        if (type == null)
            return null;
        return type.getCode();
    }

    @Override
    public EProductType convertToEntityAttribute(Integer code) {
        if (code == null)
            return null;

        return EProductType.valueOf(code);
    }
}
