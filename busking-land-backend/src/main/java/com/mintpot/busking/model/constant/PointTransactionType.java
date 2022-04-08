package com.mintpot.busking.model.constant;

import org.apache.tomcat.util.bcel.Const;

public enum PointTransactionType {
    // Nạp tiền
    CHARGE(Constant.CHARGE_VALUE, NotificationType.NOTIFICATION_POINTS_CHARGED),
    // Sử dụng coin
    USE(Constant.USE_VALUE, NotificationType.NOTIFICATION_POINTS_USED),
    // Được trả công
    PAID(Constant.PAID_VALUE, NotificationType.NOTIFICATION_POINTS_PAID),
    // Rút tiền
    WITHDRAW_REQUEST(Constant.WITHDRAW_REQUEST_VALUE, NotificationType.POINTS_WITHDRAW_REQUEST_VALUE),
    // Reject Rút Tiền
    WITHDRAW_REJECT(Constant.WITHDRAW_REJECT_VALUE, NotificationType.POINTS_WITHDRAW_REQUEST_REJECT),
    // Approve Rút Tiền
    WITHDRAW_APPROVE(Constant.WITHDRAW_APPROVE_VALUE, NotificationType.POINTS_WITHDRAW_REQUEST_DONE);



    private final int code;

    private final NotificationType notificationType;

    private PointTransactionType(int code, NotificationType notificationType) {
        this.notificationType = notificationType;
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public NotificationType getNotificationType() {
        return notificationType;
    }

    public static PointTransactionType valueOf(int code) {
        for (PointTransactionType type : PointTransactionType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(
                PointTransactionType.class.getName() + " does not have value with code: " + code);
    }

    public boolean isDeductTransaction() {
        return this == USE || this == WITHDRAW_REQUEST;
    }

    public boolean isIgnoreTransaction () {
        return this == WITHDRAW_APPROVE;
    }

    public boolean isDefaultActiveStatus () {
        return this == CHARGE || this == PAID || this == USE || this == WITHDRAW_REJECT || this == WITHDRAW_APPROVE;
    }

    public static class Constant {
        public static final int CHARGE_VALUE = 1;
        public static final int PAID_VALUE = 2;
        public static final int USE_VALUE = 10;
        public static final int WITHDRAW_REQUEST_VALUE = 20;
        public static final int WITHDRAW_REJECT_VALUE = -20;
        public static final int WITHDRAW_APPROVE_VALUE = 40;

    }
}
