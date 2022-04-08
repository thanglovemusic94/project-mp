package com.mintpot.pii.exception.handler;

import com.mintpot.pii.exception.error.ApiError;
import com.mintpot.pii.exception.error.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class JwtExceptionHandler {

    @ExceptionHandler(ExpiredJwtException.class)
    protected ResponseEntity<ApiError> handleBusinessException(ExpiredJwtException ex) {
        ApiError apiErr = new ApiError(ErrorCode.AUTH_JWT_EXPIRED);
        return new ResponseEntity<>(apiErr, apiErr.getStatus());
    }
}
