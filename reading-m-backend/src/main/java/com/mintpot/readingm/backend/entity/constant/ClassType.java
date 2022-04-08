package com.mintpot.readingm.backend.entity.constant;

import com.mintpot.readingm.backend.entity.clazz.Class;
import com.mintpot.readingm.backend.entity.clazz.GoalClass;
import com.mintpot.readingm.backend.entity.clazz.TextBookClass;
import com.mintpot.readingm.backend.entity.clazz.VodClass;

public enum ClassType {
    LIVE_BOOK(Constant.LIVE_BOOK_VALUE, TextBookClass.class),
    LIVE_GOAL(Constant.LIVE_GOAL_VALUE, GoalClass.class),
    MATHEMATICS(Constant.MATHEMATICS, VodClass.class);

    private final int code;
    private final java.lang.Class<? extends Class> clazz;

    ClassType(final int code, java.lang.Class<? extends Class> clazz) {
        this.code = code;
        this.clazz = clazz;
    }

    public final int getCode() {
        return this.code;
    }

    public String getKoreanLabel() {
        switch (this) {
            case LIVE_BOOK:
                return "LiveClass 책글";
            case LIVE_GOAL:
                return "LiveClass 목적";
            case MATHEMATICS:
                return "과학수학 다빈치";
        }

        return "";
    }
    public static ClassType valueOf(int code) {
        for (ClassType type : ClassType.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        return null;
    }

//    public java.lang.Class<? extends Class> toJavaType() {
//        return clazz;
//    }

    public static class Constant {
        public static final int LIVE_BOOK_VALUE = 1;
        public static final int LIVE_GOAL_VALUE = 2;
        public static final int MATHEMATICS = 3;
    }
}
