package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.ClassStatus;
import com.mintpot.readingm.backend.user.UserStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ClassStatusConverter implements AttributeConverter<ClassStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(ClassStatus type) {
        if (type == null)
            return null;
        return type.getCode();
    }

    @Override
    public ClassStatus convertToEntityAttribute(Integer code) {
        if (code == null)
            return null;

        return ClassStatus.valueOf(code);
    }

}
