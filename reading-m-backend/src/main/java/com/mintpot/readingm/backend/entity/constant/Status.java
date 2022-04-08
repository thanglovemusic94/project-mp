package com.mintpot.readingm.backend.entity.constant;

public enum Status {
    DEACTIVATED(Constant.DEACTIVATED_VALUE),
    ACTIVATED(Constant.ACTIVATED_VALUE),
    DELETED(Constant.DELETED_VALUE);

    private final int code;

    private Status(final int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static Status valueOf(int code) {
        for (Status type : Status.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(Status.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int DEACTIVATED_VALUE = -1;
        public static final int ACTIVATED_VALUE = 1;
        public static final int DELETED_VALUE = 0;
    }
}
