package com.mintpot.readingm.backend.entity.constant;

public enum PaymentStatus {
    PENDING(Constant.PENDING), // temp, user cannot view this status
    COMPLETED(Constant.COMPLETED);

    private final int code;

    PaymentStatus(int code) {
        this.code = code;
    }

    public static PaymentStatus valueOf(int code) {
        for (PaymentStatus type : PaymentStatus.values()) {
            if (type.code == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(PaymentStatus.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public String getKoreanLabel() {
        switch (this) {
            case PENDING:
                return "보류 중";
            case COMPLETED:
                return "결제 완료";
        }

        return "";
    }

    public static class Constant {
        public static final int PENDING = 0;
        public static final int COMPLETED = 1;
    }
}
