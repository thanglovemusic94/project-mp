package com.mintpot.readingm.backend.exception;

public class CommonException extends BaseException {
    Object[] params;

    public CommonException(ErrorCode errorCode) {
        super(errorCode);
    }

    public CommonException(ErrorCode errorCode, Object[] params) {
        super(errorCode);
        this.params = params;
    }

    public CommonException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }

    public Object[] getParams() {
        return this.params;
    }
}
