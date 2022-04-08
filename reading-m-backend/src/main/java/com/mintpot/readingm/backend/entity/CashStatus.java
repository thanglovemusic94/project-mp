package com.mintpot.readingm.backend.entity;

public enum CashStatus {
    CASH_REQUEST(Constant.CASH_REQUEST),
    CASH_COMPLETE(Constant.CASH_COMPLETE),
    NON_CASH(Constant.NON_CASH);

    private final int code;

    CashStatus(int code) {
        this.code = code;
    }

    public static CashStatus valueOf(int code) {
        for (CashStatus type : CashStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(CashStatus.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public static class Constant {
        public static final int CASH_REQUEST = 0;
        public static final int CASH_COMPLETE = 1;
        public static final int NON_CASH = 2;
    }
}
