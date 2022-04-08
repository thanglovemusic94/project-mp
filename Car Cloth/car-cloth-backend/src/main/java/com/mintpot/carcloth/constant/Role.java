package com.mintpot.carcloth.constant;

public enum Role {
    ADMIN(Constant.ADMIN), MEMBER(Constant.MEMBER);

    private final String value;

    private Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static class Constant {
        public static final String ADMIN = "ADMIN";
        public static final String MEMBER = "MEMBER";
    }
}
