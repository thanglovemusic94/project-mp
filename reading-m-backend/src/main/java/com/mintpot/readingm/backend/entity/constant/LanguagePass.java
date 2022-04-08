package com.mintpot.readingm.backend.entity.constant;

public enum LanguagePass {
    YES(Constant.YES),
    NO(Constant.NO);

    private final int code;

    LanguagePass(int code) {
        this.code = code;
    }

    public static LanguagePass valueOf(int code) {
        for (LanguagePass type : LanguagePass.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(LanguagePass.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public static class Constant {
        public static final int YES = 1;
        public static final int NO = 2;
    }
}
