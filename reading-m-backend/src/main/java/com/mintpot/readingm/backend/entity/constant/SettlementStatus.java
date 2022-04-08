package com.mintpot.readingm.backend.entity.constant;

public enum SettlementStatus {
    UN_SETTLED(Constant.SETTLEMENT_COMPLETED),
    SETTLEMENT_COMPLETED(Constant.UN_SETTLED);

    private final int code;

    SettlementStatus(int code) {
        this.code = code;
    }

    public static SettlementStatus valueOf(int code) {
        for (SettlementStatus type : SettlementStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(SettlementStatus.class.getName() + " does not have value with code: " + code);
    }

    public int getCode() {
        return code;
    }

    public String getKoreanLabel() {
        switch (this) {
            case UN_SETTLED:
                return "미정산";
            case SETTLEMENT_COMPLETED:
                return "정산 완료";
        }

        return "";
    }

    public static class Constant {
        public static final int UN_SETTLED = 0;
        public static final int SETTLEMENT_COMPLETED = 1;
    }
}
