package com.mintpot.readingm.backend.entity.constant;

public enum Gender {
    MALE(Constant.MALE),
    FEMALE(Constant.FEMALE);

    private final int code;

    Gender(int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static Gender valueOf(int code) {
        for (Gender type : Gender.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(Gender.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int MALE = 1;
        public static final int FEMALE = 2;
    }
}
