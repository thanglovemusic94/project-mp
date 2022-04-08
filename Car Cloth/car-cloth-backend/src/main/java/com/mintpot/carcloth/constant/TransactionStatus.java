package com.mintpot.carcloth.constant;

public enum TransactionStatus {
    COMPARE(TransactionStatus.Constant.COMPARE),
    RESERVATION(TransactionStatus.Constant.RESERVATION),
    CONSTRUCTING(TransactionStatus.Constant.CONSTRUCTING),
    COMPLETE(TransactionStatus.Constant.COMPLETE);

    private final int code;

    TransactionStatus(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static TransactionStatus valueOf(int code) {
        for (TransactionStatus type : TransactionStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(TransactionStatus.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int COMPARE = 0;
        public static final int RESERVATION = 2;
        public static final int CONSTRUCTING = 5;
        public static final int COMPLETE = 9;
    }
}
