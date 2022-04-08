package com.mintpot.busking.model.constant;

import java.util.Objects;

public enum BuskingViewerStatus {

    JOIN(Constant.JOIN),
    LEFT(Constant.LEFT);


    private final int code;

    private BuskingViewerStatus(final int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }

    public static BuskingViewerStatus valueOf(int code) {
        for (BuskingViewerStatus type : BuskingViewerStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(BuskingViewerStatus.class.getName() + " does not have value with code: " + code);
    }

    public String getEntityType() {
        return Objects.requireNonNull(this.name().split("_"))[1];
    }

    public String toMessageSource() {
        return this.name().replace("_", ".").toLowerCase();
    }

    public static class Constant {
        public static final int JOIN = 1;
        public static final int LEFT = -1;
    }
}
