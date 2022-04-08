package com.mintpot.busking.model.constant.converter;

import com.mintpot.busking.model.constant.BuskerStatus;
import com.mintpot.busking.model.constant.PointChargeTypeEnum;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class PointChargeTypeEnumConverter implements AttributeConverter<PointChargeTypeEnum, Integer> {

	@Override
	public Integer convertToDatabaseColumn(PointChargeTypeEnum type) {
		if (type == null)
			return null;
		return type.getCode();
	}

	@Override
	public PointChargeTypeEnum convertToEntityAttribute(Integer code) {
		if (code == null)
			return null;

		return PointChargeTypeEnum.valueOf(code);
	}

}
