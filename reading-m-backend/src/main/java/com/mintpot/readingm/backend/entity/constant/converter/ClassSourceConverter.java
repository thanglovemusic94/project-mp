package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.ClassSource;
import com.mintpot.readingm.backend.entity.constant.ClassStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ClassSourceConverter implements AttributeConverter<ClassSource, Integer> {

    @Override
    public Integer convertToDatabaseColumn(ClassSource type) {
        if (type == null)
            return null;
        return type.getCode();
    }

    @Override
    public ClassSource convertToEntityAttribute(Integer code) {
        if (code == null)
            return null;

        return ClassSource.valueOf(code);
    }

}
