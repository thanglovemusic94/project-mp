package com.mintpot.carcloth.entity.converters;

import com.mintpot.carcloth.constant.enums.EActivateStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ActivateConverter implements AttributeConverter<EActivateStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(EActivateStatus type) {
        if (type == null)
            return null;
        return type.getCode();
    }

    @Override
    public EActivateStatus convertToEntityAttribute(Integer code) {
        if (code == null)
            return null;

        return EActivateStatus.valueOf(code);
    }
}
