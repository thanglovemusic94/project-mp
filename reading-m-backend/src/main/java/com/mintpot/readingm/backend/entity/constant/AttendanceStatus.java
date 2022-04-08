package com.mintpot.readingm.backend.entity.constant;

public enum AttendanceStatus {
    IN_CLASS(AttendanceStatus.Constant.IN_CLASS),
    NOT_IN_CLASS(AttendanceStatus.Constant.NOT_IN_CLASS);

    private final int code;

    AttendanceStatus(int code) {
        this.code = code;
    }


    public final int getCode() {
        return this.code;
    }

    public static AttendanceStatus valueOf(int code) {
        for (AttendanceStatus type : AttendanceStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        return null;
    }

    public static class Constant {
        public static final int IN_CLASS = 1;
        public static final int NOT_IN_CLASS = -1;
    }
}
