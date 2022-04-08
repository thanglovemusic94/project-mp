package com.mintpot.carcloth.constant;

public enum PaymentStatus {
    PENDING(Constant.PENDING), FAILED(Constant.FAILED), COMPLETED(Constant.COMPLETED);

    private final int value;

    PaymentStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static class Constant {
        public static final int PENDING = 0;
        public static final int FAILED = -1;
        public static final int COMPLETED = 1;
    }
}
