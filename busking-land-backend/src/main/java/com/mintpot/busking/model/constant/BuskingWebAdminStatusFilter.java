package com.mintpot.busking.model.constant;

public enum BuskingWebAdminStatusFilter {
    ALL(0),
    IN_PROGRESS(1),
    IN_SCHEDULE(2),
    COMPLETED(3);

    private final int value;

    private BuskingWebAdminStatusFilter(final int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }

    public static BuskingWebAdminStatusFilter valueOf(int value) {
        for (BuskingWebAdminStatusFilter type : BuskingWebAdminStatusFilter.values()) {
            if (type.getValue() == value) {
                return type;
            }
        }

        throw new IllegalArgumentException(BuskingWebAdminStatusFilter.class.getName() + " does not have value: " + value);
    }
}
