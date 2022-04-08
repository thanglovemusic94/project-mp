package com.mintpot.busking.model.constant;

import io.swagger.annotations.ApiModel;

import java.util.Objects;

@ApiModel
public enum BuskingType {

    LIVE(Constant.LIVE),
    OFFLINE(Constant.OFFLINE);

    private final int code;

    private BuskingType(final int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }

    public static BuskingType valueOf(int code) {
        for (BuskingType type : BuskingType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(BuskingType.class.getName() + " does not have value with code: " + code);
    }

    public String getEntityType() {
        return Objects.requireNonNull(this.name().split("_"))[1];
    }

    public String toMessageSource() {
        return this.name().replace("_", ".").toLowerCase();
    }

    public static class Constant {
        public static final int LIVE = 1;
        public static final int OFFLINE = 2;
    }
}
