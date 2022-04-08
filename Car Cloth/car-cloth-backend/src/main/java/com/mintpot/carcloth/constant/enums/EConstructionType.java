package com.mintpot.carcloth.constant.enums;

public enum EConstructionType {

    PPF(Constant.PPF, "PPF"),
    POLISH(Constant.POLISH, "광택"),
    WRAPPING( Constant.WRAPPING,"랩핑"),
    BLACK_BOX(Constant.BLACK_BOX,"블랙박스"),
    NEW_CAR_PACKAGE(Constant.NEW_CAR_PACKAGE,"신차패키지"),
    TINTING(Constant.TINTING,"썬팅"),
    GLASS_FILM(Constant.GLASS_FILM,"유리막"),
    WINDSHIELD(Constant.WINDSHIELD,"윈드쉴드");

    private final int code;

    private final String displayValue;

    EConstructionType(final int code, final String displayValue ) {
        this.code = code;
        this.displayValue = displayValue;
    }

    public final int getCode() {
        return this.code;
    }

    public final String getDisplayValue() {
        return this.displayValue;
    }

    public static EConstructionType valueOf(int code) {
        for (EConstructionType type : EConstructionType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(EConstructionType.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int PPF = 1;
        public static final int POLISH = 2;
        public static final int WRAPPING = 3;
        public static final int BLACK_BOX = 4;
        public static final int NEW_CAR_PACKAGE = 5;
        public static final int TINTING = 6;
        public static final int GLASS_FILM = 7;
        public static final int WINDSHIELD = 8;
    }

    public static class JsonProp {
        public static final String PPF = "PPF";
        public static final String POLISH = "Polish";
        public static final String WRAPPING = "Wrapping";
        public static final String BLACK_BOX = "BlackBox";
        public static final String NEW_CAR_PACKAGE = "NewCarPackage";
        public static final String TINTING = "Tinting";
        public static final String GLASS_FILM = "GlassFilm";
        public static final String WINDSHIELD = "Windshield";
    }
}
