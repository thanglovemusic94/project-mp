package com.mintpot.carcloth.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
	INTERNAL_SERVER_ERROR(500, HttpStatus.INTERNAL_SERVER_ERROR, "관리자에게 문의부탁드립니다"),
	OBJECT_NOT_FOUND(904, HttpStatus.NOT_FOUND, "객체를 찾을 수 없습니다"),
	USER_NOT_EXIST(800, HttpStatus.NOT_FOUND, "이용자를 찾을 수 없습니다"),
	REFRESH_TOKEN_EXPIRED(1203, HttpStatus.BAD_REQUEST, "새로 고침 토큰이 만료되었습니다"),
	ENTITY_NOT_FOUND(404, HttpStatus.NOT_FOUND, "엔티티를 찾을 수 없습니다"),
	AUTH_WRONG_PASSWORD(12002, HttpStatus.OK, "이메일이 잘못되었습니다."),
	AUTH_WRONG_EMAIL(12005, HttpStatus.OK, "비밀번호가 잘못되었습니다."),
	AUTH_INVALID_TOKEN(12006, HttpStatus.BAD_REQUEST, "Invalid ID Token"),
	AUTH_TOKEN_EXPIRED(12007, HttpStatus.BAD_REQUEST, "Wrong email or password"),
	USER_NOT_FOUND(1000, HttpStatus.NOT_FOUND, "user not found"),
	COMPANY_NOT_FOUND(1100, HttpStatus.NOT_FOUND, "company not found"),
	COMPANY_PROCESS_REASON_BLANK(1101, HttpStatus.BAD_REQUEST, "the reason must be not blank"),
	COMPANY_CANNOT_PROCESS(1102, HttpStatus.BAD_REQUEST, "the company has been approved or reject"),
	COMPANY_APPROVED(1103, HttpStatus.BAD_REQUEST, "the company has been approved"),
	COMPANY_GROUP_NAME_EXISTED(1104, HttpStatus.BAD_REQUEST, "the company group name was existed"),
	COMPANY_GROUP_CANNOT_DELETE(1105, HttpStatus.BAD_REQUEST, "the company group cannot delete"),
	COMPANY_GROUP_NOT_FOUND_GG(1106, HttpStatus.BAD_REQUEST, "the company group not found general group"),
	COMPANY_NOT_ENOUGH_POINT(1107, HttpStatus.BAD_REQUEST, "not enough points"),
	EXIST_COMPANY_BY_USER(1110, HttpStatus.BAD_REQUEST, "exist company registered by user"),
	ACTION_INVALID(1120, HttpStatus.BAD_REQUEST, "action invalid"),
	CATEGORY_NOT_FOUND(1200, HttpStatus.BAD_REQUEST, "category not found"),
	CATEGORY_EXISTED(1201, HttpStatus.BAD_REQUEST, "category already exists"),
	BRAND_NOT_FOUND(1300, HttpStatus.BAD_REQUEST, "brand not found"),
	BRAND_EXISTED(1301, HttpStatus.BAD_REQUEST, "brand already exists"),
	MODEL_NOT_FOUND(1400, HttpStatus.BAD_REQUEST, "model not found"),
	CAR_TYPE_NOT_FOUND(1500, HttpStatus.BAD_REQUEST, "car type not found"),
	CAR_TYPE_REGISTER_FILE_EXTENSION(1501, HttpStatus.BAD_REQUEST, "xlsx, xls 확장자만 등록 가능합니다."),
	CAR_TYPE_REGISTER_FAIL(1502, HttpStatus.BAD_REQUEST, "첨부한 Excel 파일에 기재된 내용중에 잘못입력된 내용이 있어서 등록이 실패하였습니다."),
	FAQ_NOT_FOUND(1600, HttpStatus.BAD_REQUEST, "FAQ not found"),
	TRANSACTION_NOT_FOUND(1700, HttpStatus.BAD_REQUEST, "Transaction not found"),
	FILE_NOT_FOUND(5000, HttpStatus.BAD_REQUEST, "File not found"),
	QUOTATION_NOT_FOUND(1710, HttpStatus.NOT_FOUND, "Quotation not found"),
	QUOTATION_DELIVERED(1720, HttpStatus.BAD_REQUEST, "Quotation has been delivered"),
	NOTIFICATION_NOT_FOUND(1800, HttpStatus.NOT_FOUND, "Notification not found"),
	NO_PERMISSION(1900, HttpStatus.BAD_REQUEST, "Don't have permission"),
	REVIEW_EXISTED(1010, HttpStatus.BAD_REQUEST, "You have reviewed"),
	EMAIL_NOT_EXIST(1011, HttpStatus.BAD_REQUEST, "Cannot get email"),
	PAYMENT_AMOUNT_NOT_MATCHED(2000, HttpStatus.BAD_REQUEST, "Payment amount is not matched"),
	PAYMENT_ILLEGAL_STATE(2001, HttpStatus.BAD_REQUEST, "결제 오류가 발생했습니다. 관리자에게 문의하세요."),
	PHONE_CODE_INCORRECT(1009, HttpStatus.BAD_REQUEST, "phone code incorrect"),
	PHONE_CODE_EXPIRED_TIME(1008, HttpStatus.BAD_REQUEST, "phone code expired time"),
	PHONE_EXITED(1007, HttpStatus.BAD_REQUEST, "phone exited");

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
