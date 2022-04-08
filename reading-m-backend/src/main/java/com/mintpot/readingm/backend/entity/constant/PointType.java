package com.mintpot.readingm.backend.entity.constant;

public enum PointType {
    CASH_POINT(Constant.CASH_POINT),
    EVENT_POINT(Constant.EVENT_POINT);

    private final int code;

    PointType(int code) {
        this.code = code;
    }

    public static PointType valueOf(int code) {
        for (PointType type : PointType.values()) {
            if (type.code == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(PointType.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public static class Constant {
        public static final int CASH_POINT = 1;
        public static final int EVENT_POINT = 2;
    }
}
