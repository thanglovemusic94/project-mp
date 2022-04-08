package com.mintpot.busking.model.constant.converter;

import com.mintpot.busking.model.constant.AdminStatus;
import com.mintpot.busking.model.constant.Status;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class AdminStatusConverter implements AttributeConverter<AdminStatus, Integer> {
    @Override
    public Integer convertToDatabaseColumn(AdminStatus status) {
        if (status == null) {
            return null;
        }
        return status.getCode();
    }

    @Override
    public AdminStatus convertToEntityAttribute(Integer integer) {
        if (integer == null)
            return null;
        return AdminStatus.valueOf(integer);
    }
}
