package com.mintpot.readingm.backend.entity.constant;

public enum QuestionStatus {
    WAITING(Constant.WAITING),
    ANSWERED(Constant.ANSWERED);

    private final int code;

    QuestionStatus(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static QuestionStatus valueOf(int code) {
        for (QuestionStatus type : QuestionStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        return null;
    }

    public static class Constant {
        public static final int WAITING = 0;
        public static final int ANSWERED = 1;
    }
}
