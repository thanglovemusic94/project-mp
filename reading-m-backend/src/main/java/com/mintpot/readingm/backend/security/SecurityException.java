package com.mintpot.readingm.backend.security;

import com.mintpot.readingm.backend.exception.ErrorCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.AuthenticationException;

@Getter
@Setter
@ToString
public class SecurityException extends AuthenticationException {

    private ErrorCode errorCode;

    public SecurityException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
