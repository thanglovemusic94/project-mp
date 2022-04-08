package com.mintpot.busking.constant;

public enum MedicationStatus {

    // TODO bellow is the placeholder, need QA to get a list of statuses.
    UNACTIVATED(Constant.UNACTIVATED_VALUE),
    ACTIVATED(Constant.ACTIVATED_VALUE),
    DELETED(Constant.DELETED_VALUE);

    private final int code;

    private MedicationStatus(final int code) {
        this.code = code;
    }

    public final int getCode() {
        return this.code;
    }

    public static MedicationStatus valueOf(int code) {
        for (MedicationStatus type : MedicationStatus.values()) {
            if (type.getCode() == code) {
                return type;
            }
        }

        throw new IllegalArgumentException(UserStatus.class.getName() + " does not have value with code: " + code);
    }


    public static class Constant {
        public static final int UNACTIVATED_VALUE = 0;
        public static final int ACTIVATED_VALUE = 1;
        public static final int DELETED_VALUE = -1;
    }
}
