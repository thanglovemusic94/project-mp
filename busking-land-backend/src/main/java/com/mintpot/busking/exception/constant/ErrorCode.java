package com.mintpot.busking.exception.constant;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
	NOT_CONTENT(204, HttpStatus.NO_CONTENT, "Not content"),

	INTERNAL_SERVER_ERROR(500, HttpStatus.INTERNAL_SERVER_ERROR, "관리자에게 문의부탁드립니다"),
	INSUFFICIENT_PRIVILEGE(403, HttpStatus.FORBIDDEN, "권한이 부족합니다"),
	ILLEGAL_ARGUMENTS(406, HttpStatus.BAD_REQUEST, "잘못된 변수입니다"),

	AUTH_REFRESH_TOKEN_NOT_FOUND(1000, HttpStatus.BAD_REQUEST, "Refresh token not found"),
	AUTH_WRONG_EMAIL_OR_PASSWORD(1001, HttpStatus.BAD_REQUEST, "Wrong email or password"),
	AUTH_REFRESH_TOKEN_EXPIRED(1002, HttpStatus.BAD_REQUEST, "Wrong email or password"),
	AUTH_TOKEN_EXPIRED(1003, HttpStatus.BAD_REQUEST, "Wrong email or password"),
	AUTH_INVALID_TOKEN(1004, HttpStatus.BAD_REQUEST, "Invalid ID Token"),
	AUTH_KEY_ID_NOT_FOUND(105, HttpStatus.BAD_REQUEST, "Google Key ID not found"),
	VALIDATION_FAILED(1006, HttpStatus.BAD_REQUEST, "Validate Failed"),

	PAYMENT_NOT_ENOUGH_POINTS(1400, HttpStatus.BAD_REQUEST, "포인트가 부족합니다"),
	PAYMENT_WITHDRAW_OVER_POINTS(1401, HttpStatus.BAD_REQUEST, "포인트가 부족합니다"),
	PAYMENT_TRANSACTION_EXIST(1403, HttpStatus.BAD_REQUEST, "Transaction Exist!"),
	BANK_NOT_VALIDATE (1402, HttpStatus.BAD_REQUEST, "Bank Not Validate"),
	POINT_HISTORY_NOT_FOUND(1404, HttpStatus.BAD_REQUEST, "Point History Not Found"),

	ADMIN_NOT_EXIT(700, HttpStatus.BAD_REQUEST, "web not exit"),
	ADMIN_INVALID(701, HttpStatus.BAD_REQUEST, "invalid web"),

	USER_NOT_FOUND(2000, HttpStatus.BAD_REQUEST, "User not found"),
	USER_NOT_EXIST(2001, HttpStatus.NOT_FOUND, "이용자를 찾을 수 없습니다"),
	PHONE_USED(2002, HttpStatus.BAD_REQUEST, "전화 번호는 이미 사용중입니다"),
	EMAIL_USED(2003, HttpStatus.BAD_REQUEST, "이메일 주소 이미 사용중입니다"),
	FAVORITE_EMPTY(2004, HttpStatus.BAD_REQUEST, "이메일 주소 이미 사용중입니다"),
	USER_ILLEGAL_STATUS(2005, HttpStatus.BAD_REQUEST, "이 상태의 사용자는이 작업을 수행 할 수 없습니다"),
	USER_WRONG_CURRENT_PASSWORD(2006, HttpStatus.BAD_REQUEST, "Current password is wrong"),
	EMAIL_NOT_EXIST(2007, HttpStatus.BAD_REQUEST, "Cannot get email"),


	ANNOUNCEMENT_NOT_FOUND(20000, HttpStatus.BAD_REQUEST, "Announcement not found"),

	FAQ_NOT_FOUND(30000, HttpStatus.BAD_REQUEST, "FAQ not found"),

	MEDICATION_TYPE_NOT_FOUND(40000, HttpStatus.BAD_REQUEST, "Medication type not found"),

	FAMILY_MEMBER_NOT_FOUND(50000, HttpStatus.BAD_REQUEST, "Family member not found"),



	APPSTORE_REQUEST_FAILED(10000, HttpStatus.INTERNAL_SERVER_ERROR, "AppStored에게 호출 실패."),
	APPSTORE_PRODUCT_ID_NOT_FOUND(10001, HttpStatus.BAD_REQUEST, "영수증에 ProductID가 틀립니다. 고객센터 연락해주시기 바랍니다."),

	GOOGLE_PURCHASE_ERROR (90000, HttpStatus.INTERNAL_SERVER_ERROR, "Google Purchase Error"),
	GOOGLE_PURCHASE_FAILED(90001, HttpStatus.INTERNAL_SERVER_ERROR, "Google Purchase Failed"),

	BUSKER_EXIST        (60000, HttpStatus.BAD_REQUEST, "Busker is Exist"),
	BUSKER_NOT_VALIDATE (60001, HttpStatus.BAD_REQUEST, "Busker Info Not Validate"),
	BUSKER_NOT_FOUND    (60002, HttpStatus.BAD_REQUEST, "Busker Not Found"),
	BUSKER_ALREADY_REGISTERED_EMAIL(60003, HttpStatus.BAD_REQUEST, "Busker Already Registered Email"),
	BUSKER_ALREADY_REGISTERED_PHONE(60004, HttpStatus.BAD_REQUEST, "Busker  Already Registered Phone"),

	BUSKING_MISSING_TYPE  (70000, HttpStatus.BAD_REQUEST, "Busking Missing Type"),
	BUSKING_MISSING_TITLE (70001, HttpStatus.BAD_REQUEST, "Busking Missing Title"),
	BUSKING_MISSING_NAME  (70002, HttpStatus.BAD_REQUEST, "Busking Missing Name"),
	BUSKING_MISSING_IMAGE (70003, HttpStatus.BAD_REQUEST, "Busking Missing Image"),
	BUSKING_MISSING_TIME  (70004, HttpStatus.BAD_REQUEST, "Busking Missing Time"),
	BUSKING_MISSING_PLACE (70005, HttpStatus.BAD_REQUEST, "Busking Missing Place"),
	BUSKING_NOT_FOUND     (70006, HttpStatus.BAD_REQUEST, "Busking Not Found"),
	BUSKING_VIEWER_NOT_FOUND     (70007, HttpStatus.BAD_REQUEST, "Busking Viewer Not Found"),
	BUSKING_VIEWER_REACH_MAX     (70008, HttpStatus.BAD_REQUEST, "Busking Viewer Reach Max"),
	BUSKING_CANNOT_EDIT   (70009, HttpStatus.BAD_REQUEST, "Busking Cannot Edit"),
	BUSKING_CANNOT_DELETE  (70010, HttpStatus.BAD_REQUEST, "Busking Cannot Delete"),

	LAND_NOT_EXIT  (90000, HttpStatus.BAD_REQUEST, "Land not exit"),
	RESTAURENT_NOT_EXIT(91000, HttpStatus.BAD_REQUEST, "Restaurent not exit"),

	NICE_ENCODING_SYSTEM_ERROR(80000, HttpStatus.INTERNAL_SERVER_ERROR, "암호화 시스템 에러입니다"),
	NICE_ENCODING_PROCEED_ERROR(80001, HttpStatus.INTERNAL_SERVER_ERROR, "암호화 처리오류입니다"),
	NICE_ENCODING_DATA_ERROR(80002, HttpStatus.INTERNAL_SERVER_ERROR, "암호화 데이터 오류입니다"),
	NICE_INPUT_DATA_ERROR(80003, HttpStatus.INTERNAL_SERVER_ERROR, "입력 데이터 오류입니다"),
	NICE_UNKNOWN_ERROR(80004, HttpStatus.INTERNAL_SERVER_ERROR, "알 수 없는 오류입니다"),

	BUSKING_LAND_MISSING_NAME (90001, HttpStatus.INTERNAL_SERVER_ERROR, "Busking Land Missing Name"),
	BUSKING_LAND_MISSING_ADDRESS (90002, HttpStatus.INTERNAL_SERVER_ERROR, "Busking Land Missing Address"),
	BUSKING_LAND_MISSING_CITY (90002, HttpStatus.INTERNAL_SERVER_ERROR, "Busking Land Missing City"),
	BUSKING_LAND_DUPLICATE_NAME (90003, HttpStatus.INTERNAL_SERVER_ERROR, "Busking Land Duplicate Name"),



	JWT_EXPIRED(12000, HttpStatus.BAD_REQUEST, "JWT has been expired");

	private final int code;

    private final HttpStatus httpStatus;

    private final String message;

	ErrorCode(int code, HttpStatus httpStatus, String message) {
		this.code = code;
		this.httpStatus = httpStatus;
		this.message = message;
	}

	public int getCode() {
		return this.code;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public String getMessage() {
		return message;
	}

}
