package com.mintpot.pii.utils;

import com.mintpot.pii.entity.constant.SettelementStatus;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

/* @author linhnc@mintpot.vn */

@Converter(autoApply = true)
public class ConvertSettlementStatus implements AttributeConverter<SettelementStatus,Integer>{

    @Override
    public Integer convertToDatabaseColumn(SettelementStatus setStatus) {
        return setStatus.getData();
    }

    @Override
    public SettelementStatus convertToEntityAttribute(Integer data) {
        return SettelementStatus.toEnum(data);
    }
    
}
