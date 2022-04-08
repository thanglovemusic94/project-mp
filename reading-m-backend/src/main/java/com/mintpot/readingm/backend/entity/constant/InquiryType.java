package com.mintpot.readingm.backend.entity.constant;

public enum InquiryType {

    CLASS(Constant.CLASS_VALUE),
    PAYMENT_REFUND(Constant.PAYMENT_REFUND_VALUE),
    SETTLEMENT(Constant.SETTLEMENT_VALUE),
    OTHERS(Constant.OTHERS_VALUE);

    private final int code;

    InquiryType(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static InquiryType valueOf(int code) {
        for (InquiryType type : InquiryType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(InquiryType.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int CLASS_VALUE = 1;
        public static final int PAYMENT_REFUND_VALUE = 2;
        public static final int SETTLEMENT_VALUE = 3;
        public static final int OTHERS_VALUE = 4;
    }
}
