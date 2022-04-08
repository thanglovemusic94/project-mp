package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.TutorType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class TutorTypeConverter implements AttributeConverter<TutorType, Integer> {
    @Override
    public Integer convertToDatabaseColumn(TutorType tutorType) {
        return tutorType != null ? tutorType.getCode() : null;
    }

    @Override
    public TutorType convertToEntityAttribute(Integer code) {
        return TutorType.valueOf(code);
    }
}
