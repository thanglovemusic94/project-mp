package com.mintpot.pii.entity.constant;

public enum UserStatus {

	// TODO bellow is the placeholder, need QA to get a list of statuses.
	UNACTIVATED(Constant.UNACTIVATED_VALUE),
	ACTIVATED(Constant.ACTIVATED_VALUE),
	DELETED(Constant.DELETED_VALUE);

	private final int code;

	UserStatus(final int code) {
		this.code = code;
	}

	public final int getCode() {
		return this.code;
	}

	public static UserStatus valueOf(int code) {
		for (UserStatus type : UserStatus.values()) {
			if (type.getCode() == code) {
				return type;
			}
		}

		throw new IllegalArgumentException(UserStatus.class.getName() + " does not have value with code: " + code);
	}

	public static class Constant {
		public static final int ACTIVATED_VALUE = 1;
		public static final int UNACTIVATED_VALUE = 0;
		public static final int DELETED_VALUE = -1;
	}
}
