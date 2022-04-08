package com.mintpot.pii.entity.constant;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 *
 * @author linhnc@mintpot.vn
 */
public enum SettelementStatus {
     NOT_SETTLED(0), WAIT(1), COMPLETE(2);   
    private final Integer data;
    private static final Map dataEnum = Stream.of(CrudStatus.values()).collect(Collectors.toMap(data->data.getData(), data->data));
    private SettelementStatus(int data) {
        this.data = data;
    }
    public static SettelementStatus toEnum(int data){
        return (SettelementStatus) dataEnum.get(data);
    }
    public int getData(){
        return data;
    }
}
