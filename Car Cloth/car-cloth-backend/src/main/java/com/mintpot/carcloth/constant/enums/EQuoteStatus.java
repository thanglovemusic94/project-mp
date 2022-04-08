package com.mintpot.carcloth.constant.enums;

public enum EQuoteStatus {

    REQUESTED(Constant.REQUESTED),
    DELIVERED(Constant.DELIVERED),
    APPLY(Constant.APPLY),
    CANCEL(Constant.CANCEL),
    CONFIRM(Constant.CONFIRM),
    CONSTRUCTING(Constant.CONSTRUCTING),
    COMPLETE(Constant.COMPLETE);

    private final int code;

    EQuoteStatus(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static EQuoteStatus valueOf(int code) {
        for (EQuoteStatus type : EQuoteStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(EQuoteStatus.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int REQUESTED = 0;
        public static final int DELIVERED = 1;
        public static final int APPLY = 2;
        public static final int CANCEL = 3;
        public static final int CONFIRM = 4;
        public static final int CONSTRUCTING = 5;
        public static final int COMPLETE = 9;
    }
}
