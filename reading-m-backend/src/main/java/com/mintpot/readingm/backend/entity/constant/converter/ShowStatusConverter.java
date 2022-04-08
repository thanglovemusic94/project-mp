package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.ShowStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ShowStatusConverter implements AttributeConverter<ShowStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(ShowStatus type) {
        if (type == null)
            return null;
        return type.getCode();
    }

    @Override
    public ShowStatus convertToEntityAttribute(Integer code) {
        if (code == null)
            return null;

        return ShowStatus.valueOf(code);
    }

}
