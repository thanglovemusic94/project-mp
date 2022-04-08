package com.mintpot.readingm.backend.entity.constant;

public enum SchoolStage {
    PRIMARY(Constant.PRIMARY),
    SECONDARY(Constant.SECONDARY);

    private final int code;

    SchoolStage(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }


    public static SchoolStage valueOf(int code) {
        for (SchoolStage type : SchoolStage.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        return null;
    }

    public static class Constant {
        public static final int PRIMARY = 0;
        public static final int SECONDARY = 1;
    }
}
