package com.mintpot.carcloth.constant.enums;

public enum EUsageStatus {

    USE("사용"),
    UNUSED("미사용");

    private final String displayValue;

    EUsageStatus(final String displayValue ) {
        this.displayValue = displayValue;
    }

    public final String getDisplayValue() {
        return this.displayValue;
    }
}
