package com.mintpot.readingm.backend.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@ToString
@NoArgsConstructor
public abstract class BaseException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private HttpStatus status;
    private String message;
    private ErrorCode errorCode;

    public BaseException(HttpStatus status, ErrorCode errorCode) {
        this(errorCode);
        if (status != null)
            this.status = status;
    }

    public BaseException(ErrorCode errorCode) {
        this.errorCode = errorCode;
        this.status = errorCode.getHttpStatus();
        this.message = errorCode.getMessage();
    }

    public BaseException(ErrorCode errorCode, Throwable cause) {
        super(cause);
        this.errorCode = errorCode;
        this.status = errorCode.getHttpStatus();
        this.message = errorCode.getMessage();
    }

    public BaseException(HttpStatus status, ErrorCode errorCode, String message) {
        this(status, errorCode);
        this.message = message;
    }

    public BaseException(ErrorCode errorCode, String message) {
        this(errorCode);
        this.message = message;
    }
}
