package com.mintpot.busking.exception.handler;

import com.mintpot.busking.exception.BusinessException;
import com.mintpot.busking.exception.constant.ErrorCode;
import com.mintpot.busking.exception.error.ApiError;
import com.mintpot.busking.exception.error.ApiSubError;
import com.mintpot.busking.exception.error.ApiValidationError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class BusinessExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    protected ResponseEntity<ApiError> handleBusinessException(BusinessException ex) {
        logger.error("handleBusinessException");
        List<ApiSubError> errorList = ApiSubError.fromErrorCodes(ex.getFullErrorCode());
        ApiError apiErr = new ApiError(ex.getStatus(), ex.getMessage(), ex.getErrorCode().getCode(), errorList);
        return new ResponseEntity<>(apiErr, apiErr.getStatus());
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status, WebRequest request) {
        ApiError apiError = new ApiError(ErrorCode.VALIDATION_FAILED);
        List<ApiSubError> validationErrors =
                ex.getBindingResult().getFieldErrors().stream().map(objectError -> new ApiValidationError(objectError.getField(), objectError.getDefaultMessage())).collect(Collectors.toList());
        apiError.setSubErrors(validationErrors);
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
