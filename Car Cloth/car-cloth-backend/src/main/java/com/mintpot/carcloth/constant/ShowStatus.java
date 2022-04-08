package com.mintpot.carcloth.constant;

public enum ShowStatus {
    SHOW(Constant.SHOW_VALUE),
    HIDE(Constant.HIDE_VALUE);

    private final int code;

    ShowStatus(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static ShowStatus valueOf(int code) {
        for (ShowStatus type : ShowStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        return null;
    }

    public static class Constant {
        public static final int SHOW_VALUE = 0;
        public static final int HIDE_VALUE = -1;
    }
}