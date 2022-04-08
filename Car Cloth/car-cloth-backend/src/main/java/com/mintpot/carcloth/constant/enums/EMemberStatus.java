package com.mintpot.carcloth.constant.enums;

public enum EMemberStatus {

    NORMAL("정상"),
    UNACTIVATED("휴면");

    private final String displayValue;

    EMemberStatus(final String displayValue ) {
        this.displayValue = displayValue;
    }

    public final String getDisplayValue() {
        return this.displayValue;
    }
}
