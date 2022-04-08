package com.mintpot.busking.model.constant;

public enum BuskingWebAdminStatus {
    WAITING(1),
    IN_SCHEDULE(2),
    IN_PROGRESS(3),
    COMPLETED(3),
    REJECTED (4),
    DELETED (5);

    private final int value;

    private BuskingWebAdminStatus(final int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }

    public static BuskingWebAdminStatus valueOf(int value) {
        for (BuskingWebAdminStatus type : BuskingWebAdminStatus.values()) {
            if (type.getValue() == value) {
                return type;
            }
        }

        throw new IllegalArgumentException(BuskingWebAdminStatus.class.getName() + " does not have value: " + value);
    }
}
