package com.mintpot.busking.model.constant.converter;

import com.mintpot.busking.model.constant.NotificationType;
import com.mintpot.busking.model.constant.SNSType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class NotificationTypeConverter implements AttributeConverter<NotificationType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(NotificationType type) {
		if (type == null)
			return null;
		return type.getCode();
	}

	@Override
	public NotificationType convertToEntityAttribute(Integer code) {
		if (code == null)
			return null;

		return NotificationType.valueOf(code);
	}

}
