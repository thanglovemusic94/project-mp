package com.mintpot.readingm.backend.entity.constant;

public enum RefundStatus {
    REFUND_REQUEST(Constant.REFUND_REQUEST),
    REFUND_COMPLETION(Constant.REFUND_COMPLETION),
    NON_REFUNDABLE(Constant.NON_REFUNDABLE);

    private final int code;

    RefundStatus(int code) {
        this.code = code;
    }

    public static RefundStatus valueOf(int code) {
        for (RefundStatus type : RefundStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(RefundStatus.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public static class Constant {
        public static final int REFUND_REQUEST = 0;
        public static final int REFUND_COMPLETION = 1;
        public static final int NON_REFUNDABLE = 2;
    }
}
