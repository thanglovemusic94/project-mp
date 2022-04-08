package com.mintpot.busking.model.constant;

public enum PointChargeTypeEnum {
    ANDROID(Constant.ANDROID),
    IOS(Constant.IOS),
    ANDROID_IOS(Constant.ANDROID_IOS);


    private final int code;

    private PointChargeTypeEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }


    public static PointChargeTypeEnum valueOf(int code) {
        for (PointChargeTypeEnum type : PointChargeTypeEnum.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(
                PointChargeTypeEnum.class.getName() + " does not have value with code: " + code);
    }


    public static class Constant {
        public static final int ANDROID = 1;
        public static final int IOS = 2;
        public static final int ANDROID_IOS = 3;
    }
}
