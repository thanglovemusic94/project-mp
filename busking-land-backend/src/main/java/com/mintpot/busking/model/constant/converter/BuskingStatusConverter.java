package com.mintpot.busking.model.constant.converter;

import com.mintpot.busking.model.constant.BuskingStatus;
import com.mintpot.busking.model.constant.BuskingType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class BuskingStatusConverter implements AttributeConverter<BuskingStatus, Integer> {

	@Override
	public Integer convertToDatabaseColumn(BuskingStatus type) {
		if (type == null)
			return null;
		return type.getCode();
	}

	@Override
	public BuskingStatus convertToEntityAttribute(Integer code) {
		if (code == null)
			return null;

		return BuskingStatus.valueOf(code);
	}

}
