package com.mintpot.carcloth.entity.converters;

import com.mintpot.carcloth.constant.enums.EQuoteStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class QuoteStatusConverter implements AttributeConverter<EQuoteStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(EQuoteStatus status) {
        return status != null ? status.getCode() : null;
    }

    @Override
    public EQuoteStatus convertToEntityAttribute(Integer code) {
        return code != null ? EQuoteStatus.valueOf(code) : null;
    }
}
