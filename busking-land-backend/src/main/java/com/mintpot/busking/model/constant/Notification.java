package com.mintpot.busking.model.constant;


public enum Notification {

    PUSH_NOTIFICATION_ON(Constant.ON),
    PUSH_NOTIFICATION_OFF(Constant.OFF),

    NOTIFICATION_ANNOUNCEMENT_ON(Constant.ANNOUNCEMENT_ON),
    NOTIFICATION_ANNOUNCEMENT_OFF(Constant.ANNOUNCEMENT_OFF),

    NOTIFICATION_HEALTHY_PILL_ON(Constant.HEALTHY_PILL_ON),
    NOTIFICATION_HEALTHY_PILL_OFF(Constant.HEALTHY_PILL_OFF);


    private final int code;

    Notification(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static Notification valueOf(int code) {
        for (Notification notification : Notification.values()) {
            if(notification.getCode() == code) {
                return notification;
            }
        }

        throw new IllegalArgumentException(Notification.class.getName() + " does not have value with code: " + code);
    }


    public static class Constant {
        public static final int ON = 1;
        public static final int OFF = 0;

        public static final int ANNOUNCEMENT_ON = 11;
        public static final int ANNOUNCEMENT_OFF = 10;

        public static final int HEALTHY_PILL_ON = 21;
        public static final int HEALTHY_PILL_OFF = 20;


    }
}
