package com.mintpot.pii.exception;

import com.mintpot.pii.exception.error.ErrorCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class BusinessException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private HttpStatus status;
    private String message;
    private ErrorCode errorCode;

    public BusinessException(HttpStatus status, ErrorCode errorCode) {
        this(errorCode);
        if (status != null)
            this.status = status;
    }

    public BusinessException(ErrorCode errorCode) {
        this.errorCode = errorCode;
        this.status = errorCode.getHttpStatus();
        this.message = errorCode.getMessage();
    }

    public BusinessException(ErrorCode errorCode, Throwable cause) {
        super(cause);
        this.errorCode = errorCode;
        this.status = errorCode.getHttpStatus();
        this.message = errorCode.getMessage();
    }

    public BusinessException(HttpStatus status, ErrorCode errorCode, String message) {
        this(status, errorCode);
        this.message = message;
    }

    public BusinessException(ErrorCode errorCode, String message) {
        this(errorCode);
        this.message = message;
    }
}
