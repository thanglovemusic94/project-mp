package com.mintpot.readingm.backend.constant;

public enum ProbType {

    MULTIPLE_CHOICE(1), SUBJECTIVE_SHORT_ANSWER(2), OX(3);

    private final int code;

    ProbType(final int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
