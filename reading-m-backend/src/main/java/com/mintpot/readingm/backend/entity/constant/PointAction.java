package com.mintpot.readingm.backend.entity.constant;

public enum PointAction {
    PROVIDE(Constant.PROVIDE),
    USE(Constant.USE),
    REFUND(Constant.REFUND);

    private final int code;

    PointAction(int code) {
        this.code = code;
    }

    public static PointAction valueOf(int code) {
        for (PointAction type : PointAction.values()) {
            if (type.code == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(PointAction.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public static class Constant {
        public static final int PROVIDE = 1;
        public static final int USE = 2;
        public static final int REFUND = 3;
    }
}