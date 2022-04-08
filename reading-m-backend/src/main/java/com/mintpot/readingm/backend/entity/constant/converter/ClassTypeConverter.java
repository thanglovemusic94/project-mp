package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.ClassType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ClassTypeConverter implements AttributeConverter<ClassType, Integer> {

    @Override
    public Integer convertToDatabaseColumn(ClassType type) {
        if (type == null)
            return null;
        return type.getCode();
    }

    @Override
    public ClassType convertToEntityAttribute(Integer code) {
        if (code == null)
            return null;

        return ClassType.valueOf(code);
    }

}
