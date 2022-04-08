package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.InquiryType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class InquiryTypeConverter implements AttributeConverter<InquiryType, Integer> {
    @Override
    public Integer convertToDatabaseColumn(InquiryType inquiryType) {
        return inquiryType != null ? inquiryType.getCode() : null;
    }

    @Override
    public InquiryType convertToEntityAttribute(Integer code) {
        return InquiryType.valueOf(code);
    }
}
