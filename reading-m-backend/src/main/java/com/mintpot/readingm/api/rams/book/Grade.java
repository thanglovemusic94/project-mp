package com.mintpot.readingm.api.rams.book;

public enum Grade {

    GRADE_0(0), GRADE_1(1), GRADE_2(2), GRADE_3(3), GRADE_4(4), GRADE_5(5), GRADE_6(6);

    private final int code;

    Grade(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }


    public static Grade valueOf(int code) {
        for (Grade type : Grade.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        return null;
    }
}
