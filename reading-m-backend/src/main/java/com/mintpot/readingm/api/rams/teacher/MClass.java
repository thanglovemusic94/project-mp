package com.mintpot.readingm.api.rams.teacher;

public enum MClass {

    STUDENT(1),
    REPRESENTATIVE(145),
    VICE_REPRESENTATIVE(140),
    HEADQUARTER_DIRECTOR(135),
    PRESIDENT(130),
    VICE_PRESIDENT(125),
    DIRECTOR(120),
    TEAM_LEADER(115),
    DEPUTY_DIRECTOR(113),
    SECTION_MANAGER(112),
    ASSISTANT_MANAGER(111),
    EMPLOYEE(110),
    COMMON_USE(190);

    private final int code;

    MClass(final int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
