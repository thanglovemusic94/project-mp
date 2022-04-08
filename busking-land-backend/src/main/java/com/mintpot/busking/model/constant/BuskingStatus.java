package com.mintpot.busking.model.constant;

import io.swagger.annotations.ApiModel;

import java.util.Objects;

@ApiModel
public enum BuskingStatus {
    REJECT(Constant.REJECT),
    ACTIVE(Constant.ACTIVE),
//    END(Constant.END),
    IN_ACTIVE(Constant.IN_ACTIVE),
    DELETED (Constant.DELETED);
//    LIVE (Constant.LIVE);


    private final int code;

    private BuskingStatus(final int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }

    public static BuskingStatus valueOf(int code) {
        for (BuskingStatus type : BuskingStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(BuskingStatus.class.getName() + " does not have value with code: " + code);
    }

    public String getEntityType() {
        return Objects.requireNonNull(this.name().split("_"))[1];
    }

    public String toMessageSource() {
        return this.name().replace("_", ".").toLowerCase();
    }

    public static class Constant {
        public static final int REJECT = -2; // reject
        public static final int ACTIVE = 1; // Scheduled
        public static final int IN_ACTIVE = -1; // watting
        public static final int END = 2; // Completed
        public static final int DELETED = -3;// reject
        public static final int LIVE = 10; //In Progess
    }
}
