package com.mintpot.readingm.backend.exception;

import com.mintpot.readingm.backend.security.SecurityException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(value = CommonException.class)
    public ResponseEntity<?> handleValidatedException(CommonException ex) {
        ex.printStackTrace();
        ErrorCode errorCode = ex.getErrorCode();

        String messages;
        Object[] params = ex.getParams();
        if(params != null && params.length > 0) {
            messages = String.format(errorCode.getMessage(), params);
        } else {
            messages = errorCode.getMessage();
        }

        ErrorResponse errorResponse =  new ErrorResponse(errorCode.getCode(),
            messages, null);

        return new ResponseEntity<ErrorResponse>(errorResponse, errorCode.getHttpStatus());
    }


    @ExceptionHandler(value = ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleCommonException(ValidationException ex) {
        ErrorCode errorCode = ex.getErrorCode();
        return new ErrorResponse(
                errorCode.getCode(),
                errorCode.getMessage(),
                null);
    }

    @ExceptionHandler(value = SecurityException.class)
    public ResponseEntity<?> handleSecurityException(SecurityException ex) {
        ex.printStackTrace();
        ErrorCode errorCode = ex.getErrorCode();
        ErrorResponse errorResponse =  new ErrorResponse(errorCode.getCode(),
                                                         errorCode.getMessage(), null);

        return new ResponseEntity<>(errorResponse, errorCode.getHttpStatus());
    }
}
