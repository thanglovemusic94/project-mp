package com.mintpot.pii.entity.constant;

public enum ReservationStatus {

	// TODO bellow is the placeholder, need QA to get a list of statuses.
	CANCELED(Constant.CANCELED_VALUE),
	PENDING(Constant.PENDING_VALUE),
	RESERVED(Constant.RESERVED_VALUE),
	IN_USE(Constant.IN_USE_VALUE),
	ENDED(Constant.ENDED_VALUE);

	private final int code;

	ReservationStatus(final int code) {
		this.code = code;
	}

	public final int getCode() {
		return this.code;
	}

	public static ReservationStatus valueOf(int code) {
		for (ReservationStatus type : ReservationStatus.values()) {
			if (type.getCode() == code) {
				return type;
			}
		}

		throw new IllegalArgumentException(ReservationStatus.class.getName() + " does not have value with code: " + code);
	}

	public static class Constant {
		public static final int CANCELED_VALUE = -1;
		public static final int PENDING_VALUE = 0;
		public static final int RESERVED_VALUE = 1;
		public static final int IN_USE_VALUE = 2;
		public static final int ENDED_VALUE = 3;
	}
}
