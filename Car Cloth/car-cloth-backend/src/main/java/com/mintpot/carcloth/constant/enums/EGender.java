package com.mintpot.carcloth.constant.enums;

public enum EGender {

    FEMALE(Constant.FEMALE),
    MALE(Constant.MALE);

    private final int code;

    EGender(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static EGender valueOf(int code) {
        for (EGender type : EGender.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(EGender.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int FEMALE = 0;
        public static final int MALE = 1;
    }
}
