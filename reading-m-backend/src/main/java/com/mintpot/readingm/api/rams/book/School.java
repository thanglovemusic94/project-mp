package com.mintpot.readingm.api.rams.book;

public enum School {

    ELEMENTARY(1), SECONDARY(2), HIGH(3);

    private final int code;

    School(int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }

    public static School valueOf(int code) {
        for (School type : School.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        return null;
    }
}
