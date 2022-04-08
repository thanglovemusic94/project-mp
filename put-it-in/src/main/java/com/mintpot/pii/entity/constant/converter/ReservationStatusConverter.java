package com.mintpot.pii.entity.constant.converter;

import com.mintpot.pii.entity.constant.ReservationStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ReservationStatusConverter implements AttributeConverter<ReservationStatus, Integer> {

	@Override
	public Integer convertToDatabaseColumn(ReservationStatus status) {
		if (status == null)
			return null;
		return status.getCode();
	}

	@Override
	public ReservationStatus convertToEntityAttribute(Integer key) {

		return ReservationStatus.valueOf(key);
	}

}
