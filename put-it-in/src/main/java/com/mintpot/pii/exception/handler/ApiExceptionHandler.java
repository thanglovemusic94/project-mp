package com.mintpot.pii.exception.handler;

import com.mintpot.pii.exception.error.ApiError;
import com.mintpot.pii.exception.error.ErrorCode;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity<ApiError> handleEmptyResultDataAccessException() {
        ApiError err = new ApiError(ErrorCode.ENTITY_NOT_FOUND);
        return new ResponseEntity<>(err, err.getStatus());
    }
}
