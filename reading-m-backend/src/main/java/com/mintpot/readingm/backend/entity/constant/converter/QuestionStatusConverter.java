package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.QuestionStatus;

import javax.persistence.AttributeConverter;

public class QuestionStatusConverter implements AttributeConverter<QuestionStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(QuestionStatus status) {
        return status != null ? status.getCode() : null;
    }

    @Override
    public QuestionStatus convertToEntityAttribute(Integer code) {
        return QuestionStatus.valueOf(code);
    }
}
