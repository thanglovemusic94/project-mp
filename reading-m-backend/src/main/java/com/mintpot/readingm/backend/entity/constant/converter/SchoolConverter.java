package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.api.rams.book.School;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class SchoolConverter implements AttributeConverter<School, Integer> {

    @Override
    public Integer convertToDatabaseColumn(School status) {
        if (status == null) {
            return null;
        }
        return status.getCode();
    }

    @Override
    public School convertToEntityAttribute(Integer dbData) {
        if (dbData == null)
            return null;
        return School.valueOf(dbData);
    }
}
