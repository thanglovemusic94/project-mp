package com.mintpot.readingm.backend.entity.constant;

public enum ClassSource {

    READINGM(Constant.READINGM_VALUE),
    RAMS(Constant.RAMS_VALUE);

    private final int code;

    ClassSource(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static ClassSource valueOf(int code) {
        for (ClassSource type : ClassSource.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        return null;
    }

    public static class Constant {
        public static final int READINGM_VALUE = 1;
        public static final int RAMS_VALUE = -1;
    }
}
