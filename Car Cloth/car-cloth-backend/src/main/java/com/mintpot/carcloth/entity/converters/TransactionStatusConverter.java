package com.mintpot.carcloth.entity.converters;

import com.mintpot.carcloth.constant.TransactionStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class TransactionStatusConverter implements AttributeConverter<TransactionStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(TransactionStatus status) {
        return status != null ? status.getCode() : null;
    }

    @Override
    public TransactionStatus convertToEntityAttribute(Integer code) {
        return code != null ? TransactionStatus.valueOf(code) : null;
    }
}
