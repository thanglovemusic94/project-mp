package com.mintpot.busking.model.constant;

import java.util.Objects;

public enum BuskerStatus {

    ACTIVE(Constant.ACTIVE),
    END(Constant.END),
    IN_ACTIVE(Constant.IN_ACTIVE);


    private final int code;

    private BuskerStatus(final int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }

    public static BuskerStatus valueOf(int code) {
        for (BuskerStatus type : BuskerStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(BuskerStatus.class.getName() + " does not have value with code: " + code);
    }

    public String getEntityType() {
        return Objects.requireNonNull(this.name().split("_"))[1];
    }

    public String toMessageSource() {
        return this.name().replace("_", ".").toLowerCase();
    }

    public static class Constant {
        public static final int ACTIVE = 1;
        public static final int IN_ACTIVE = -1;
        public static final int END = 2;
    }
}
