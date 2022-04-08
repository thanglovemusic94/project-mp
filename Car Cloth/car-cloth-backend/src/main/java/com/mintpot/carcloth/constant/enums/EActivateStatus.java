package com.mintpot.carcloth.constant.enums;

public enum EActivateStatus {

    ACTIVATE(Constant.ACTIVATE),
    DEACTIVATE(Constant.DEACTIVATE);

    private final int code;

    EActivateStatus(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static EActivateStatus valueOf(int code) {
        for (EActivateStatus type : EActivateStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(EActivateStatus.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int ACTIVATE = 1;
        public static final int DEACTIVATE = 0;
    }
}
