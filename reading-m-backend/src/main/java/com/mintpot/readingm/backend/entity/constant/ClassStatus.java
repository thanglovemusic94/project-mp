package com.mintpot.readingm.backend.entity.constant;

public enum ClassStatus {
    SHOW(Constant.SHOW_VALUE),
    HIDE(Constant.HIDE_VALUE);

    private final int code;

    ClassStatus(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static ClassStatus valueOf(int code) {
        for (ClassStatus type : ClassStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        return null;
    }

    public static class Constant {
        public static final int SHOW_VALUE = 1;
        public static final int HIDE_VALUE = -1;
    }
}
