package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.TutorApplicationStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class TutorApplicationStatusConverter implements AttributeConverter<TutorApplicationStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(TutorApplicationStatus tutorApplicationStatus) {
        return tutorApplicationStatus != null ? tutorApplicationStatus.getCode() : null;
    }

    @Override
    public TutorApplicationStatus convertToEntityAttribute(Integer code) {
        return TutorApplicationStatus.valueOf(code);
    }
}
