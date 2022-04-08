package com.mintpot.readingm.backend.entity.constant;

public enum TutorApplicationStatus {

    WAITING(Constant.WAITING_VALUE),
    APPROVED(Constant.APPROVED_VALUE),
    REFUSED(Constant.REFUSED_VALUE);

    private final int code;

    TutorApplicationStatus(int code) {
        this.code = code;
    }

    public static TutorApplicationStatus valueOf(int code) {
        for (TutorApplicationStatus type : TutorApplicationStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(TutorApplicationStatus.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public static class Constant {
        public static final int WAITING_VALUE = 0;
        public static final int APPROVED_VALUE = 1;
        public static final int REFUSED_VALUE = -1;
    }
}
