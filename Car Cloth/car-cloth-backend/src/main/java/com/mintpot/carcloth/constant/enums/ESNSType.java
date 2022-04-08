package com.mintpot.carcloth.constant.enums;

import com.mintpot.carcloth.constant.SNSType;

public enum ESNSType {

    NAVER(Constant.NAVER),
    KAKAO(Constant.KAKAO),
    GOOGLE(Constant.GOOGLE),
    APPLE(Constant.APPLE);

    private final int code;

    ESNSType(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static ESNSType valueOf(int code) {
        for (ESNSType type : ESNSType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(ESNSType.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int NAVER = 1;
        public static final int KAKAO = 2;
        public static final int GOOGLE = 3;
        public static final int APPLE = 4;
    }

    public static ESNSType convert(SNSType type) {
        if(SNSType.GOOGLE.equals(type)) {
            return ESNSType.GOOGLE;
        } else if(SNSType.APPLE.equals(type)) {
            return ESNSType.APPLE;
        } else if(SNSType.KAKAO.equals(type)) {
            return ESNSType.KAKAO;
        } else if(SNSType.NAVER.equals(type)) {
            return ESNSType.NAVER;
        } else {
            return null;
        }
    }
}
