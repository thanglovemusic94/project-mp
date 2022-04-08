package com.mintpot.busking.exception.handler;

import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.exception.error.ApiError;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class JwtExceptionHandler {

    @ExceptionHandler(ExpiredJwtException.class)
    protected ResponseEntity<ApiError> handleBusinessException(ExpiredJwtException ex) {
        ApiError apiErr = new ApiError(ErrorCode.JWT_EXPIRED);
        return new ResponseEntity<>(apiErr, apiErr.getStatus());
    }

    @ExceptionHandler(AccountExpiredException.class)
    protected ResponseEntity<ApiError> handleAccountExpiredException(AccountExpiredException  ex) {
        ApiError apiErr = new ApiError(ErrorCode.JWT_EXPIRED);
        return new ResponseEntity<>(apiErr, apiErr.getStatus());
    }
}
