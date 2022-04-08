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
public class QueryParseException extends RuntimeException {

    private HttpStatus status = HttpStatus.BAD_REQUEST;

    private String message;

    private ErrorCode errorCode;


    public QueryParseException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

    public QueryParseException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public enum ErrorCode {

        QURYPRS_QUERY_MATCHES_FAILED("query has wrong syntax.");

        private final String message;

        ErrorCode(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}
