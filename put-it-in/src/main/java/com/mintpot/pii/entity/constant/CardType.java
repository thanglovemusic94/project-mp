package com.mintpot.pii.entity.constant;

import com.fasterxml.jackson.annotation.JsonValue;

public enum CardType {

    SHINHAN(Constant.SHINHAN_VALUE),
    HYUNDAI(Constant.HYUNDAI_VALUE),
    SAMSUNG(Constant.SAMSUNG_VALUE),
    WOORI(Constant.WOORI_VALUE),
    KB_KOOKMIN(Constant.KB_KOOKMIN_VALUE),
    LOTTLE(Constant.LOTTLE_VALUE),
    NH_NONGHYUP(Constant.NH_NONGHYUP_VALUE),
    HANA(Constant.HANA_VALUE),
    BC(Constant.BC_VALUE),
    CITI(Constant.CITI_VALUE),
    KAKAO(Constant.KAKAO_VALUE),
    KDB_INDUSTRIAL(Constant.KDB_INDUSTRIAL_VALUE),
    SH_SUHYUP(Constant.SH_SUHYUP_VALUE),
    JEONBUK(Constant.JEONBUK_VALUE),
    POST_OFFICE_DEPOSIT_INSURANCE(Constant.POST_OFFICE_DEPOSIT_INSURANCE_VALUE),
    SAEMAUL_GEUMGO(Constant.SAEMAUL_GEUMGO_VALUE),
    SAVING_BANK_SB(Constant.SAVING_BANK_SB_VALUE),
    JEJU(Constant.JEJU_VALUE),
    GWANGJU(Constant.GWANGJU_VALUE),
    CREDIT_UNION(Constant.CREDIT_UNION_VALUE),
    JCB(Constant.JCB_VALUE),
    UNION_PAY(Constant.UNION_PAY_VALUE),
    MASTER(Constant.MASTER_VALUE),
    VISA(Constant.VISA_VALUE),
    DINERS_CLUB(Constant.DINERS_VALUE),
    DISCOVER(Constant.DISCOVER_VALUE);

    private final String code;

    CardType(final String code) {
        this.code = code;
    }

    @JsonValue
    public final String getCode() {
        return this.code;
    }

    public static CardType valueOfType(String code) {
        for (CardType type : CardType.values()) {
            if (type.getCode().equalsIgnoreCase(code)) {
                return type;
            }
        }

        throw new IllegalArgumentException(UserStatus.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final String SHINHAN_VALUE = "신한";
        public static final String HYUNDAI_VALUE = "현대";
        public static final String SAMSUNG_VALUE = "삼성";
        public static final String WOORI_VALUE = "우리";
        public static final String KB_KOOKMIN_VALUE = "국민";
        public static final String LOTTLE_VALUE = "롯데";
        public static final String NH_NONGHYUP_VALUE = "농협";
        public static final String HANA_VALUE = "하나";
        public static final String BC_VALUE = "BC";
        public static final String CITI_VALUE = "씨티";
        public static final String KAKAO_VALUE = "카카오뱅크";
        public static final String KDB_INDUSTRIAL_VALUE = "KDB";
        public static final String SH_SUHYUP_VALUE = "수협";
        public static final String JEONBUK_VALUE = "전북";
        public static final String POST_OFFICE_DEPOSIT_INSURANCE_VALUE = "우체국";
        public static final String SAEMAUL_GEUMGO_VALUE = "새마을";
        public static final String SAVING_BANK_SB_VALUE = "저축";
        public static final String JEJU_VALUE = "제주";
        public static final String GWANGJU_VALUE = "광주";
        public static final String CREDIT_UNION_VALUE = "신협";
        public static final String JCB_VALUE = "JCB";
        public static final String UNION_PAY_VALUE = "유니온페이";
        public static final String MASTER_VALUE = "마스터";
        public static final String VISA_VALUE = "비자";
        public static final String DINERS_VALUE = "다이너스";
        public static final String DISCOVER_VALUE = "디스커버";
    }
}
