package com.mintpot.readingm.backend.constant;

public enum Category {

    REGULAR(1), SPECIAL_LECTURE(2), ACADEMIC_REPORT(3), TARGET(4), M_BASIC_W(7), M_DA_VINCI(8);

    private final int code;

    Category(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
