package com.mintpot.busking.model.constant;

import java.util.Objects;

public enum NotificationType {

    NOTIFICATION_NEW_ANNOUNCEMENT(Constant.NOTIFICATION_NEW_ANNOUNCEMENT),
    NOTIFICATION_10_TO_LIVE (Constant.NOTIFICATION_10_TO_LIVE),

    NOTIFICATION_POINTS_CHARGED(Constant.POINTS_CHARGED_VALUE),
    NOTIFICATION_POINTS_USED(Constant.POINTS_USED_VALUE),
    NOTIFICATION_POINTS_PAID(Constant.POINTS_PAID_VALUE),
    POINTS_WITHDRAW_REQUEST_VALUE(Constant.POINTS_WITHDRAW_REQUEST_VALUE),
    POINTS_WITHDRAW_REQUEST_DONE(Constant.POINTS_WITHDRAW_REQUEST_DONE),
    POINTS_WITHDRAW_REQUEST_REJECT(Constant.POINTS_WITHDRAW_REQUEST_REJECT);


    private final int code;

    private NotificationType(final int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }

    public static NotificationType valueOf(int code) {
        for (NotificationType type : NotificationType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(NotificationType.class.getName() + " does not have value with code: " + code);
    }

    public String getEntityType() {
        return Objects.requireNonNull(this.name().split("_"))[1];
    }

    public String toMessageSource() {
        return this.name().replace("_", ".").toLowerCase();
    }

    public static class Constant {
        public static final int NOTIFICATION_NEW_ANNOUNCEMENT = 1;
        public static final int NOTIFICATION_10_TO_LIVE = 2;

        public static final int POINTS_CHARGED_VALUE = 90;
        public static final int POINTS_USED_VALUE = 91;
        public static final int POINTS_PAID_VALUE = 92;
        public static final int POINTS_WITHDRAW_REQUEST_VALUE = 93;
        public static final int POINTS_WITHDRAW_REQUEST_DONE = 94;
        public static final int POINTS_WITHDRAW_REQUEST_REJECT = 95;

    }
}
