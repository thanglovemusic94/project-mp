package com.mintpot.readingm.backend.entity.constant;

public enum WithdrawalStatus {
    APPROVED(Constant.APPROVED),
    COMPLETED(Constant.COMPLETED),
    WAITING(Constant.WAITING);

    private final int code;

    WithdrawalStatus(int code) {
        this.code = code;
    }

    public static WithdrawalStatus valueOf(int code) {
        for (WithdrawalStatus type : WithdrawalStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(WithdrawalStatus.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public static class Constant {
        public static final int COMPLETED = 0;
        public static final int WAITING = 1;
        public static final int APPROVED = 2;
    }
}
