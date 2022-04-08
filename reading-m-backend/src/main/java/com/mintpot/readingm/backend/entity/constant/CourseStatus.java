package com.mintpot.readingm.backend.entity.constant;

public enum CourseStatus {
    PRE_COURSE(Constant.PRE_COURSE),
    IN_PROGRESS(Constant.IN_PROGRESS),
    COMPLETE(Constant.COMPLETE);

    private final int code;

    CourseStatus(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static CourseStatus valueOf(int code) {
        for (CourseStatus type : CourseStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        return null;
    }

    public static class Constant {
        public static final int PRE_COURSE = 0;
        public static final int IN_PROGRESS = 1;
        public static final int COMPLETE = 2;
    }
}
