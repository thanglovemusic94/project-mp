package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.user.UserStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class UserStatusConverter implements AttributeConverter<UserStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(UserStatus type) {
        if (type == null)
            return null;
        return type.getCode();
    }

    @Override
    public UserStatus convertToEntityAttribute(Integer code) {
        if (code == null)
            return null;

        return UserStatus.valueOf(code);
    }

}
