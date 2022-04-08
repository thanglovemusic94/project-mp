package com.mintpot.carcloth.constant.enums;

public enum ERegistrationStatus {

    WAITING(Constant.WAITING),
    REJECT(Constant.REJECT),
    APPROVE(Constant.APPROVE);

    private final int code;

    ERegistrationStatus(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static ERegistrationStatus valueOf(int code) {
        for (ERegistrationStatus type : ERegistrationStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(ERegistrationStatus.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int WAITING = 0;
        public static final int REJECT = -1;
        public static final int APPROVE = 1;
    }
}
