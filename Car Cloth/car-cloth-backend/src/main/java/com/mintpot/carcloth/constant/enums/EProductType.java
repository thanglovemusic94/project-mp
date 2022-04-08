package com.mintpot.carcloth.constant.enums;

public enum EProductType {

    DOMESTIC(Constant.DOMESTIC, "국산"),
    FOREIGN(Constant.FOREIGN, "외제");

    private final int code;
    private final String koreanName;

    EProductType(final int code, final String koreanName) {
        this.code = code;
        this.koreanName = koreanName;
    }

    public final int getCode() {
        return this.code;
    }

    public final String getKoreanName() {
        return this.koreanName;
    }

    public static EProductType valueOf(int code) {
        for (EProductType type : EProductType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(EProductType.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int DOMESTIC = 1;
        public static final int FOREIGN = 0;
    }
}
