package com.mintpot.carcloth.dto.enums;

import com.mintpot.carcloth.constant.enums.EQuoteStatus;

public enum EQuoteStatusFilter {

    REQUESTED(EQuoteStatus.Constant.REQUESTED),
    DELIVERED(EQuoteStatus.Constant.DELIVERED),
    RESERVATION(EQuoteStatus.Constant.APPLY),
    COMPLETE(EQuoteStatus.Constant.COMPLETE);

    private final int code;

    EQuoteStatusFilter(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static EQuoteStatusFilter valueOf(int code) {
        for (EQuoteStatusFilter type : EQuoteStatusFilter.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(EQuoteStatusFilter.class.getName() + " does not have value with code: " + code);
    }
}
