package com.mintpot.busking.model.constant.converter;

import com.mintpot.busking.model.constant.BuskerStatus;
import com.mintpot.busking.model.constant.BuskingStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class BuskerStatusConverter implements AttributeConverter<BuskerStatus, Integer> {

	@Override
	public Integer convertToDatabaseColumn(BuskerStatus type) {
		if (type == null)
			return null;
		return type.getCode();
	}

	@Override
	public BuskerStatus convertToEntityAttribute(Integer code) {
		if (code == null)
			return null;

		return BuskerStatus.valueOf(code);
	}

}
