package com.mintpot.busking.model.constant.converter;

import com.mintpot.busking.model.constant.SNSType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class SNSTypeConverter implements AttributeConverter<SNSType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(SNSType type) {
		if (type == null)
			return null;
		return type.getCode();
	}

	@Override
	public SNSType convertToEntityAttribute(Integer code) {
		if (code == null)
			return null;

		return SNSType.valueOf(code);
	}

}
