package com.mintpot.busking.model.constant;

import io.swagger.annotations.ApiModel;

import java.util.Objects;

@ApiModel
public enum BuskingProgress {

    INIT(Constant.INIT),
    IN_LIVE(Constant.IN_LIVE),
    END(Constant.END);

    private final int code;

    private BuskingProgress(final int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }

    public static BuskingProgress valueOf(int code) {
        for (BuskingProgress type : BuskingProgress.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(BuskingProgress.class.getName() + " does not have value with code: " + code);
    }

    public String getEntityType() {
        return Objects.requireNonNull(this.name().split("_"))[1];
    }

    public String toMessageSource() {
        return this.name().replace("_", ".").toLowerCase();
    }

    public static class Constant {
        public static final int INIT = 1;
        public static final int IN_LIVE = 2;
        public static final int END = 3;
    }
}
