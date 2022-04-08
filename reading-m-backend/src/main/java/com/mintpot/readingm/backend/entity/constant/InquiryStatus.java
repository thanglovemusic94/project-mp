package com.mintpot.readingm.backend.entity.constant;

public enum InquiryStatus {
    
    UNANSWERED(Constant.UNANSWERED),
    ANSWERED(Constant.ANSWERED);

    private final int code;

    InquiryStatus(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static InquiryStatus valueOf(int code) {
        for (InquiryStatus type : InquiryStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(InquiryStatus.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int UNANSWERED = 0;
        public static final int ANSWERED = 1;
    }
}
