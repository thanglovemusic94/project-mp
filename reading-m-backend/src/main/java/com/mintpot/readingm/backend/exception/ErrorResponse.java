package com.mintpot.readingm.backend.exception;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ErrorResponse {
    private int code;
    private String message;
    private String description;
    private LocalDateTime timestamp;

    public ErrorResponse(int code, String message, String description) {
        this.code = code;
        this.message = message;
        this.description = description;
        this.timestamp = LocalDateTime.now();
    }

    public ErrorResponse(int code, String message, String description, LocalDateTime timestamp) {
        this.code = code;
        this.message = message;
        this.description = description;
        this.timestamp = timestamp;
    }
}
