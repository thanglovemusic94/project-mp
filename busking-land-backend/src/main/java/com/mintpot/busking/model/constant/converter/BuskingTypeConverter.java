package com.mintpot.busking.model.constant.converter;

import com.mintpot.busking.model.constant.BuskingType;
import com.mintpot.busking.model.constant.PointTransactionType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class BuskingTypeConverter implements AttributeConverter<BuskingType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(BuskingType type) {
		if (type == null)
			return null;
		return type.getCode();
	}

	@Override
	public BuskingType convertToEntityAttribute(Integer code) {
		if (code == null)
			return null;

		return BuskingType.valueOf(code);
	}

}
