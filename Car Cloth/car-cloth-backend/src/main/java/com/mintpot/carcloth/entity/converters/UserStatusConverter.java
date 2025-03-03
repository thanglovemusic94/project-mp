package com.mintpot.carcloth.entity.converters;


import com.mintpot.carcloth.constant.UserStatus;

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
