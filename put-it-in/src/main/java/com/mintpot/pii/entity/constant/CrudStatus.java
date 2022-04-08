package com.mintpot.pii.entity.constant;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/* @author linhnc@mintpot.vn */
public enum CrudStatus {
    CREATED(0), DELETE(1), UNKNOW(2);   
    private final Integer data;
    private static final Map dataEnum = Stream.of(CrudStatus.values()).collect(Collectors.toMap(data->data.getData(), data->data));
    private CrudStatus(int data) {
        this.data = data;
    }
    public static CrudStatus toEnum(int data){
        return (CrudStatus) dataEnum.get(data);
    }
    public int getData(){
        return data;
    }
}
