package com.mintpot.readingm.backend.entity.constant;

public enum IssuingMode {
    ALL(Constant.ALL_VALUE),
    SELECT(Constant.SELECT_VALUE);

    private final int code;

    IssuingMode(int code) {
        this.code = code;
    }

    public static IssuingMode valueOf(int code) {
        for (IssuingMode type : IssuingMode.values()) {
            if (type.code == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(IssuingMode.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public static class Constant {
        public static final int ALL_VALUE = 0;
        public static final int SELECT_VALUE = 1;

    }
}
