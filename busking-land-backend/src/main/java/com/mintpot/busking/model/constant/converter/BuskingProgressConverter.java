package com.mintpot.busking.model.constant.converter;

import com.mintpot.busking.model.constant.BuskingProgress;
import com.mintpot.busking.model.constant.BuskingStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class BuskingProgressConverter implements AttributeConverter<BuskingProgress, Integer> {

	@Override
	public Integer convertToDatabaseColumn(BuskingProgress type) {
		if (type == null)
			return null;
		return type.getCode();
	}

	@Override
	public BuskingProgress convertToEntityAttribute(Integer code) {
		if (code == null)
			return null;

		return BuskingProgress.valueOf(code);
	}

}
