package com.mintpot.busking.exception.error;

import com.mintpot.busking.exception.constant.ErrorCode;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class ApiSubError {

    private int errorCode;

    private String message;

    public static ApiSubError fromErrorCode (ErrorCode errorCode) {
        ApiSubError subError = new ApiSubError();
        subError.errorCode = errorCode.getCode();
        subError.message = errorCode.getMessage();
        return subError;
    }

    public static ArrayList<ApiSubError> fromErrorCodes (List<ErrorCode> errorCodes) {
        ArrayList<ApiSubError> list = new ArrayList<>();
        if(errorCodes == null) {
            errorCodes = new ArrayList<>();
        }
        errorCodes.forEach(errorCode1 -> list.add(ApiSubError.fromErrorCode(errorCode1)));
        return list;
    }


}