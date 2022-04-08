package com.mintpot.readingm.backend.constant;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ZoomMeetingType {
    INSTANT(1),
    SCHEDULED(2),
    RECURRING_NO_FIXED(3),
    RECURRING_FIXED(4)
    ;

    private final int code;

    ZoomMeetingType(int code) {
        this.code = code;
    }

    @JsonValue
    public int getCode() {
        return code;
    }
}
