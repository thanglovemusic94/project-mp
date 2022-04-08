package com.mintpot.pii.utils;

import com.mintpot.pii.entity.constant.CrudStatus;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ConverterEnum implements AttributeConverter<CrudStatus,Integer>{

    @Override
    public Integer convertToDatabaseColumn(CrudStatus status) {
        return status.getData();
    }

    @Override
    public CrudStatus convertToEntityAttribute(Integer data) {
        CrudStatus output = CrudStatus.toEnum(data);
        if (output == null) output = CrudStatus.UNKNOW;
        return output;
    }
    
}
