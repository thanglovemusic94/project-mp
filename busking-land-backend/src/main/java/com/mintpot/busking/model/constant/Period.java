package com.mintpot.busking.model.constant;

public enum Period {
    ONE_MONTH(1),
    THREE_MONTH(3),
    SIX_MONTH(6),
    ONE_YEAR(12);

    private final int value;

    private Period(final int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }

    public static Period valueOf(int value) {
        for (Period type : Period.values()) {
            if (type.getValue() == value) {
                return type;
            }
        }

        throw new IllegalArgumentException(Period.class.getName() + " does not have value: " + value);
    }
}
