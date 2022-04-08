package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.InquiryStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class InquiryStatusConverter implements AttributeConverter<InquiryStatus, Integer> {
    @Override
    public Integer convertToDatabaseColumn(InquiryStatus inquiryStatus) {
        return inquiryStatus != null ? inquiryStatus.getCode() : null;
    }

    @Override
    public InquiryStatus convertToEntityAttribute(Integer code) {
        return InquiryStatus.valueOf(code);
    }
}
