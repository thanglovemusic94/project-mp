package com.mintpot.carcloth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.Set;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(value = CommonException.class)
    public ResponseEntity<?> handleValidatedException(CommonException ex) {
        ex.printStackTrace();
        ErrorCode errorCode = ex.getErrorCode();
        ErrorResponse errorResponse =  new ErrorResponse(errorCode.getCode(),
                errorCode.getMessage(), null);

        return new ResponseEntity<ErrorResponse>(errorResponse, errorCode.getHttpStatus());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolation(ConstraintViolationException constraintViolationException) {
        Set<ConstraintViolation<?>> violations = constraintViolationException.getConstraintViolations();
        String errorMessage = "";
        if (!violations.isEmpty()) {
            StringBuilder builder = new StringBuilder();
            violations.forEach(violation -> {
                var property = violation.getPropertyPath().toString();
                property = property.substring(property.lastIndexOf('.') + 1);
                builder.append(property + " " + violation.getMessage());
            });
            errorMessage = builder.toString();
        } else {
            errorMessage = "ConstraintViolationException occured.";
        }
        return new ResponseEntity<ErrorResponse>(new ErrorResponse(1002, errorMessage, ""), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleArugmentsInvalid(MethodArgumentNotValidException ex) {
        var bindingResult = ex.getBindingResult();
        var fieldsError = bindingResult.getFieldErrors();
        var builder = new StringBuilder();
        fieldsError.forEach(f -> builder.append(f.getField() + ", "));
        builder.deleteCharAt(builder.lastIndexOf(","));
        builder.append("invalid!");
        return new ResponseEntity<>(new ErrorResponse(1004, builder.toString(), "arugments invalid"), HttpStatus.BAD_REQUEST);
    }

}