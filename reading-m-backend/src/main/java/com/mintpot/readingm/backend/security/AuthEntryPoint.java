package com.mintpot.readingm.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.exception.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class AuthEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
        throws IOException {
        log.error("Unauthorized error: {}", authException.getMessage());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ErrorResponse body;

        if (authException instanceof SecurityException) {
            SecurityException securityException = (SecurityException) authException;
            ErrorCode errorCode = securityException.getErrorCode();

            body = new ErrorResponse(errorCode.getCode(), errorCode.getMessage(),
                errorCode.name());

        } else {
            body = new ErrorResponse(ErrorCode.AUTH_JWT_FAIL.getCode(),
                ErrorCode.AUTH_JWT_FAIL.getMessage(),
                authException.getMessage());
        }

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        final ObjectMapper mapper = JsonMapper.builder()
            .addModule(new JavaTimeModule())
            .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
            .build();

        mapper.writeValue(response.getOutputStream(), body);
    }
}
