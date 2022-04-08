package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.WithdrawalStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class WithdrawalStatusConverter implements AttributeConverter<WithdrawalStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(WithdrawalStatus withdrawalStatus) {
        return withdrawalStatus != null ? withdrawalStatus.getCode() : null;
    }

    @Override
    public WithdrawalStatus convertToEntityAttribute(Integer code) {
        return WithdrawalStatus.valueOf(code);
    }
}
