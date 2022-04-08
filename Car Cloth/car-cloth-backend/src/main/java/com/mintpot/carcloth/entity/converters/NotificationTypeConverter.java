package com.mintpot.carcloth.entity.converters;

import com.mintpot.carcloth.constant.NotificationType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class NotificationTypeConverter implements AttributeConverter<NotificationType, Integer> {
    @Override
    public Integer convertToDatabaseColumn(NotificationType type) {
        return type != null ? type.getCode() : null;
    }

    @Override
    public NotificationType convertToEntityAttribute(Integer code) {
        return code != null ? NotificationType.valueOf(code) : null;
    }
}