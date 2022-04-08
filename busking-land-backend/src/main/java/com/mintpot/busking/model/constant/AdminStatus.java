package com.mintpot.busking.model.constant;

public enum AdminStatus {

	DEACTIVATED(Constant.DEACTIVATED_VALUE),
	ACTIVATED(Constant.ACTIVATED_VALUE);

	private final int code;

	private AdminStatus(final int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static AdminStatus valueOf(int code) {
		for (AdminStatus type : AdminStatus.values()) {
			if (type.getCode() == code) {
				return type;
			}
		}

		throw new IllegalArgumentException(AdminStatus.class.getName() + " does not have value with code: " + code);
	}

	public static class Constant {
		public static final int DEACTIVATED_VALUE = -1;
		public static final int ACTIVATED_VALUE = 1;
	}
}
