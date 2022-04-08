package com.mintpot.carcloth.exception;

public class CommonException extends BaseException {

    public CommonException(ErrorCode errorCode) {
        super(errorCode);
    }

    public CommonException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
