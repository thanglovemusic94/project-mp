package com.mintpot.readingm.backend.entity.constant;

public enum PaymentMethod {

    CREDIT_CARD(Constant.CREDIT_CARD),
    BANK_TRANSFER(Constant.BANK_TRANSFER);

    private final int code;

    PaymentMethod(int code) {
        this.code = code;
    }

    public static PaymentMethod valueOf(int code) {
        for (PaymentMethod type : PaymentMethod.values()) {
            if (type.code == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(PaymentMethod.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public String getKoreanLabel() {
        switch (this) {
            case CREDIT_CARD:
                return "신용카드";
            case BANK_TRANSFER:
                return "계좌이체";
        }

        return "";
    }

    public static class Constant {
        public static final int CREDIT_CARD = 1;
        public static final int BANK_TRANSFER = 2;
    }
}
