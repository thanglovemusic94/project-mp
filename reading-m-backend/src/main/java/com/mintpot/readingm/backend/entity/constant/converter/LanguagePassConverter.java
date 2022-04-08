package com.mintpot.readingm.backend.entity.constant.converter;

import com.mintpot.readingm.backend.entity.constant.LanguagePass;

import javax.persistence.AttributeConverter;

public class LanguagePassConverter implements AttributeConverter<LanguagePass, Integer> {

    @Override
    public Integer convertToDatabaseColumn(LanguagePass LanguagePass) {
        return LanguagePass != null ? LanguagePass.getCode() : null;
    }

    @Override
    public LanguagePass convertToEntityAttribute(Integer code) {
        return LanguagePass.valueOf(code);
    }
}
