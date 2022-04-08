package com.mintpot.busking.model.constant;

public enum SNSType {

    KAKAO(Constant.KAKAO_VALUE),
    NAVER(Constant.NAVER_VALUE),
    FACEBOOK(Constant.FACEBOOK_VALUE),
    GOOGLE(Constant.GOOGLE_VALUE),
    APPLE(Constant.APPLE_VALUE),
    MAIL(Constant.MAIL_VALUE);

    private final int code;

    SNSType(final int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }

    public static SNSType valueOf(int code) {
        for (SNSType type : SNSType.values()) {
            if (type.code == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(SNSType.class.getName() + " does not have value with code: " + code);

    }

    public static class Constant {
        public static final int KAKAO_VALUE = 1;
        public static final int NAVER_VALUE = 2;
        public static final int FACEBOOK_VALUE = 3;
        public static final int GOOGLE_VALUE = 4;
        public static final int APPLE_VALUE = 5;
        public static final int MAIL_VALUE = 6;
    }
}
