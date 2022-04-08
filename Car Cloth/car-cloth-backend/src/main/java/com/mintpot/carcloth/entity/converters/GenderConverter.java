package com.mintpot.carcloth.entity.converters;

import com.mintpot.carcloth.constant.enums.EGender;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class GenderConverter implements AttributeConverter<EGender, Integer> {

    @Override
    public Integer convertToDatabaseColumn(EGender type) {
        if (type == null)
            return null;
        return type.getCode();
    }

    @Override
    public EGender convertToEntityAttribute(Integer code) {
        if (code == null)
            return null;

        return EGender.valueOf(code);
    }
}
