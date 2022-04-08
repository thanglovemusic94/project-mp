package com.mintpot.readingm.backend.entity.constant;

public enum GoalClassCategory {
    ESSAY(Constant.ESSAY),
    SUBJECT(Constant.SUBJECT),
    SCHOOL_EXEC(Constant.SCHOOL_EXEC),
    CONSUL_N_OTHERS(Constant.CONSUL_N_OTHERS);

    private final int code;

    GoalClassCategory(int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static GoalClassCategory valueOf(int code) {
        for (GoalClassCategory type : GoalClassCategory.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(GoalClassCategory.class.getName() + " does not have value with code: " + code);
    }

    public static class Constant {
        public static final int ESSAY = 0;
        public static final int SUBJECT = 1;
        public static final int SCHOOL_EXEC = 2;
        public static final int CONSUL_N_OTHERS = 3;
    }
}
