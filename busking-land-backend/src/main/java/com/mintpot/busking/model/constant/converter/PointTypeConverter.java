package com.mintpot.busking.model.constant.converter;

import com.mintpot.busking.model.constant.PointTransactionType;
import com.mintpot.busking.model.constant.SNSType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class PointTypeConverter implements AttributeConverter<PointTransactionType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(PointTransactionType type) {
		if (type == null)
			return null;
		return type.getCode();
	}

	@Override
	public PointTransactionType convertToEntityAttribute(Integer code) {
		if (code == null)
			return null;

		return PointTransactionType.valueOf(code);
	}

}
