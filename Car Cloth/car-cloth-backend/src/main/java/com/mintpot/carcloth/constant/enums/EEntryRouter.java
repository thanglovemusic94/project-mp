package com.mintpot.carcloth.constant.enums;

public enum EEntryRouter {

    SEARCH("검색"),
    RECOMMENDED_BY_FRIEND("지인추천"),
    ADVERTISEMENT("광고");

    private final String displayValue;

    EEntryRouter(final String displayValue ) {
        this.displayValue = displayValue;
    }

    public final String getDisplayValue() {
        return this.displayValue;
    }
}
