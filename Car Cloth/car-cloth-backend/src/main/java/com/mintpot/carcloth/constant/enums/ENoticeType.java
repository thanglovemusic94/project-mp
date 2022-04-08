package com.mintpot.carcloth.constant.enums;

public enum ENoticeType {

    REQUESTED_QUOTE(Constant.REQUESTED_QUOTE),
    DELIVERED_QUOTE(Constant.DELIVERED_QUOTE),
    APPLIED_RESERVATION(Constant.APPLIED_RESERVATION),
    CANCELED_RESERVATION(Constant.CANCELED_RESERVATION),
    CONFIRMED_RESERVATION(Constant.CONFIRMED_RESERVATION),
    REVIEW(Constant.REVIEW),
    POINT(Constant.POINT),
    CHAT_MESSAGE(Constant.CHAT_MESSAGES);

    private final int code;

    ENoticeType(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static ENoticeType valueOf(int code) {
        for (ENoticeType type : ENoticeType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(ENoticeType.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int REQUESTED_QUOTE = 1;
        public static final int DELIVERED_QUOTE = 2;
        public static final int APPLIED_RESERVATION = 3;
        public static final int CANCELED_RESERVATION = 4;
        public static final int CONFIRMED_RESERVATION = 5;
        public static final int REVIEW = 6;
        public static final int POINT = 7;
        public static final int CHAT_MESSAGES = 8;
    }
}
