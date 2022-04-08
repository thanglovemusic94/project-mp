package com.mintpot.busking.model.constant.converter;

import com.mintpot.busking.model.constant.BuskingStatus;
import com.mintpot.busking.model.constant.BuskingViewerStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class BuskingViewerConverter implements AttributeConverter<BuskingViewerStatus, Integer> {

	@Override
	public Integer convertToDatabaseColumn(BuskingViewerStatus type) {
		if (type == null)
			return null;
		return type.getCode();
	}

	@Override
	public BuskingViewerStatus convertToEntityAttribute(Integer code) {
		if (code == null)
			return null;

		return BuskingViewerStatus.valueOf(code);
	}

}
