package com.mintpot.carcloth.constant;

public enum NotificationType {
    GENERAL(Constant.GENERAL),
    COMPANY(Constant.COMPANY);

    private final int code;

    NotificationType(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static NotificationType valueOf(int code) {
        for (NotificationType type : NotificationType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(NotificationType.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int GENERAL = 0;
        public static final int COMPANY = 1;
    }
}