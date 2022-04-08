package com.mintpot.readingm.api.rams.teacher;

public enum Active {

    WORKING(1), RETIRED(0);

    private final int code;

    Active(final int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
