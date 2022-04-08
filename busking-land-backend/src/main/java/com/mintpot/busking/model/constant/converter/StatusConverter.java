package com.mintpot.busking.model.constant.converter;

import com.mintpot.busking.model.constant.Status;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter<Status, Integer> {
    @Override
    public Integer convertToDatabaseColumn(Status status) {
        if (status == null) {
            return null;
        }
        return status.getCode();
    }

    @Override
    public Status convertToEntityAttribute(Integer integer) {
        if (integer == null)
            return null;
        return Status.valueOf(integer);
    }
}
