package com.mintpot.readingm.backend.entity.constant;

public enum TutorType {
    LIVE_BOOK_TEXT(Constant.LIVE_BOOK_TEXT),
    LIVE_GOAL(Constant.LIVE_GOAL),
    ALL(Constant.ALL_VALUE);

    private final int code;

    TutorType(int code) {
        this.code = code;
    }

    public static TutorType valueOf(int code) {
        for (TutorType type : TutorType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(TutorType.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public static class Constant {
        public static final int LIVE_BOOK_TEXT = 1;
        public static final int LIVE_GOAL = 2;
        public static final int ALL_VALUE = 9;
    }
}
