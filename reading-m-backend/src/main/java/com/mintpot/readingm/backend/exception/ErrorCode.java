package com.mintpot.readingm.backend.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    INTERNAL_SERVER_ERROR(500, HttpStatus.INTERNAL_SERVER_ERROR, "관리자에게 문의부탁드립니다"),
    SYS_GET_COMPANY_SEQUENCE_FAILED(501, HttpStatus.INTERNAL_SERVER_ERROR, "Server configuration failed"),

    REG_TOKEN_NOT_FOUND(901, HttpStatus.BAD_REQUEST, "등록 토큰을 찾을 수 없습니다"),
    REG_TOKEN_EXPIRED(902, HttpStatus.BAD_REQUEST, "등록 토큰이 만료되었습니다."),
    OBJECT_NOT_FOUND(904, HttpStatus.NOT_FOUND, "객체를 찾을 수 없습니다"),
    APPLICATION_NOT_FOUND(905, HttpStatus.NOT_FOUND, "요청을 찾을 수 없습니다"),
    POST_NOT_FOUND(906, HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다"),
    USER_NOT_EXIST(800, HttpStatus.NOT_FOUND, "이용자를 찾을 수 없습니다"),
    COULD_NOT_RETRIEVE_NAVER_INFO(11000, HttpStatus.BAD_REQUEST, "네이버에서 정보를 검색 할 수 없습니다."),
    EMAIL_USED(801, HttpStatus.FOUND, "이메일 주소 이미 사용중입니다"),
    VALUE_NOT_RECOGNIZED(802, HttpStatus.BAD_REQUEST, "가치가 인식되지 않습니다"),
    INSUFFICIENT_PRIVILEGE(403, HttpStatus.FORBIDDEN, "권한이 부족합니다"),
    MAX_PARTICIPANTS_REACHED(803, HttpStatus.BAD_REQUEST, "최대 참여자가 도달했습니다"),
    PHONE_USED(804, HttpStatus.BAD_REQUEST, "전화 번호는 이미 사용중입니다."),
    ILLEGAL_STATE(1000, HttpStatus.BAD_REQUEST, "잘못된 상태입니다"),
    ILLEGAL_ARGUMENTS(1001, HttpStatus.BAD_REQUEST, "잘못된 변수입니다"),
    VALIDATION_FAILED(1002, HttpStatus.BAD_REQUEST, "확인 실패했습니다"),
    LOGIN_TOKEN_NOT_FOUND(1200, HttpStatus.UNAUTHORIZED, "로그인 토큰을 찾을 수 없습니다"),
    LOGIN_TOKEN_EXPIRED(1201, HttpStatus.UNAUTHORIZED, "로그인 토큰이 만료되었습니다"),
    REFRESH_TOKEN_NULL(1202, HttpStatus.BAD_REQUEST, "새로 고침 토큰이 무효입니다"),
    REFRESH_TOKEN_EXPIRED(1203, HttpStatus.BAD_REQUEST, "새로 고침 토큰이 만료되었습니다"),
    REFRESH_TOKEN_NOT_FOUND(1204, HttpStatus.NOT_FOUND, "새로 고침 토근을 찾을 수 없습니다"),
    TOP_EXPOSURE_TYPE_NOT_FOUND(1300, HttpStatus.BAD_REQUEST, "동행상위노출ID를 찾을 수 없습니다"),
    PAYMENT_NOT_ENOUGH_POINTS(1400, HttpStatus.BAD_REQUEST, "포인트가 부족합니다"),
    BOOKMARK_EXISTED(1500, HttpStatus.FOUND, "이미 찜하기를 했습니다"),
    APPLICATION_EXISTED(1501, HttpStatus.FOUND, "이미 동행요청을 했습니다"),
    REVIEW_EXISTED(1502, HttpStatus.FOUND, "Bookmark review was existed"),
    ENTITY_NOT_FOUND(404, HttpStatus.NOT_FOUND, "엔티티를 찾을 수 없습니다"),
    COMPANION_INFO_NOT_FOUND(1600, HttpStatus.NOT_FOUND, "동행정보를 찾을 수 없습니다"),

    NICE_ENCODING_SYSTEM_ERROR(3000, HttpStatus.INTERNAL_SERVER_ERROR, "암호화 시스템 에러입니다"),
    NICE_ENCODING_PROCEED_ERROR(3001, HttpStatus.INTERNAL_SERVER_ERROR, "암호화 처리오류입니다"),
    NICE_ENCODING_DATA_ERROR(3002, HttpStatus.INTERNAL_SERVER_ERROR, "암호화 데이터 오류입니다"),
    NICE_INPUT_DATA_ERROR(3003, HttpStatus.INTERNAL_SERVER_ERROR, "입력 데이터 오류입니다"),
    NICE_UNKNOWN_ERROR(3005, HttpStatus.INTERNAL_SERVER_ERROR, "알 수 없는 오류입니다"),

    POST_ILLEGAL_MAX_MEMBERS(4000, HttpStatus.BAD_REQUEST, "변경된 최대 값보다 더 많은 참여자가 있습니다 " +
            "참여자 수"),

    POST_ILLEGAL_IMAGE_ID(4001, HttpStatus.BAD_REQUEST, "게시글 작성자는 이 사진 ID가 없습니다"),
    POST_ILLEGAL_STATUS(4002, HttpStatus.BAD_REQUEST, "이 상태의 게시글은 이 작업을 수행 할 수 없습니다"),

    USER_ILLEGAL_STATUS(5000, HttpStatus.BAD_REQUEST, "이 상태의 사용자는이 작업을 수행 할 수 없습니다"),
    USER_NICKNAME_EXISTED(5001, HttpStatus.BAD_REQUEST, "다른 사람이 이 닉네임을 사용했습니다"),
    USER_FCM_TOKEN_NOT_FOUND(5002, HttpStatus.BAD_REQUEST, "User's FCM Token not found"),
    USER_ILLEGAL_NOTICE_SETTINGS(5003, HttpStatus.INTERNAL_SERVER_ERROR, "The user has wrong notice settings format"),
    USER_WRONG_CURRENT_PASSWORD(5004, HttpStatus.BAD_REQUEST, "Current password is wrong"),
    USER_CANNOT_CHANGE_PASSWORD_SNS_ACCOUNT(5005, HttpStatus.BAD_REQUEST, "Cannot change password of SNS account"),

    FEED_NOT_FOUND(6000, HttpStatus.NOT_FOUND, "피드를 찾을 수 없습니다"),

    MAGAZINE_NOT_FOUND(7000, HttpStatus.BAD_REQUEST, "magazine not exit"),
    BANNER_NOT_FOUND(8000, HttpStatus.BAD_REQUEST, "banner not exit"),

    FIREBASE_DB_ERROR(9000, HttpStatus.INTERNAL_SERVER_ERROR, "Firebase DB Error"),

    APPSTORE_REQUEST_FAILED(10000, HttpStatus.INTERNAL_SERVER_ERROR, "AppStored에게 호출 실패."),
    APPSTORE_PRODUCT_ID_NOT_FOUND(10001, HttpStatus.BAD_REQUEST, "영수증에 ProductID가 틀립니다. 고객센터 연락해주시기 바랍니다."),

    APPLE_ID_KEY_ID_NOT_FOUND(11000, HttpStatus.BAD_REQUEST, "Key ID not found"),
    APPLE_ID_KEY_TYPE_NOT_FOUND(11001, HttpStatus.INTERNAL_SERVER_ERROR, "Key Type not found"),
    APPLE_ID_VERIFICATION_FAILED_NONCE_FALSE(11002, HttpStatus.BAD_REQUEST, "nonce supported is false"),
    APPLE_ID_IDENTITY_TOKEN_EXPIRED(11003, HttpStatus.BAD_REQUEST, "Identity token has been expired"),

    AUTH_JWT_FAIL(12000, HttpStatus.UNAUTHORIZED, "Authentication fail"),
    AUTH_JWT_INVALID_SIGNATURE(12006, HttpStatus.UNAUTHORIZED, "Invalid JWT signature token"),
    AUTH_JWT_INVALID_TOKEN(12007, HttpStatus.UNAUTHORIZED, "Invalid JWT token"),
    AUTH_JWT_EXPIRED(12008, HttpStatus.UNAUTHORIZED, "JWT token is expired"),
    AUTH_JWT_UNSUPPORTED(12009, HttpStatus.UNAUTHORIZED, "JWT token is unsupported"),
    AUTH_JWT_CLAIM_EMPTY(12010, HttpStatus.UNAUTHORIZED, "JWT claims string is empty"),
    AUTH_TOKEN_USER_NOT_FOUND(12001, HttpStatus.UNAUTHORIZED, "Could not found user with token info"),
    AUTH_WRONG_PASSWORD(12002, HttpStatus.OK, "이메일이 잘못되었습니다."),
    AUTH_RESET_PASSWORD_SIG_EXPIRED(12003, HttpStatus.BAD_REQUEST, "Reset password timeout"),
    AUTH_FORBIDDEN(12004, HttpStatus.FORBIDDEN, "You don't have the right."),
    AUTH_WRONG_EMAIL(12005, HttpStatus.OK, "비밀번호가 잘못되었습니다."),
    AUTH_PHONE_VERIFICATION_EXPIRED(1050, HttpStatus.BAD_REQUEST, "Your phone verification process has been expired"),
    AUTH_ACCOUNT_NOT_EXISTS(1060, HttpStatus.BAD_REQUEST, "Your account is not exists"),
    AUTH_WRONG_VERIFICATION_NUMBER(1070, HttpStatus.BAD_REQUEST, "You phone verification number has wrong!"),

    PYMNT_ORDER_ID_NOT_FOUND(13000, HttpStatus.BAD_REQUEST, "Could not find OrderID"),
    PYMNT_ORDER_ILLEGAL_STATUS(13001, HttpStatus.BAD_REQUEST, "Order is at wrong state"),
    PYMNT_ORDER_WRONG_AMNT(13002, HttpStatus.BAD_REQUEST, "Wrong payment amount"),
    PYMNT_TRANSACTION_FAILED(13003, HttpStatus.INTERNAL_SERVER_ERROR, "Transaction failed"),
    PYMNT_PRODUCT_NOT_FOUND(13004, HttpStatus.INTERNAL_SERVER_ERROR, "Payment has been completed, but cannot find " +
            "product info"),
    PYMNT_STOCK_QUANTITY_EXCEEDED(13005, HttpStatus.UNPROCESSABLE_ENTITY, "Payment has been completed, but stock " +
            "quantity has exceeded."),

    PAYMENT_CHILD_NOT_FOUND(13010, HttpStatus.BAD_REQUEST, "Child not found"),
    PAYMENT_CLASS_HAS_PAID(13020, HttpStatus.BAD_REQUEST, "You have already been paid for this class"),
    PAYMENT_COUPON_NOT_VALID(13030, HttpStatus.BAD_REQUEST, "Coupon not found or has been used"),

    REFUND_EXISTS(1600, HttpStatus.BAD_REQUEST, "You has been required a refund for this payment"),

    CARD_NOT_FOUND(14000, HttpStatus.NOT_FOUND, "Card not found"),

    RESERVATION_USAGE_PERIOD_OUT_OF_RANGE(15000, HttpStatus.BAD_REQUEST, "Usage period is not valid"),

    LOCATION_NOT_EXIST(16000, HttpStatus.BAD_REQUEST, "Location not exist, please check try again!"),
    KAKAO_MAP_SERVICE_NOT_WORKING(16001, HttpStatus.REQUEST_TIMEOUT, "Request timeout, please check try again!"),
    CLASS_NOT_FOUND(1610, HttpStatus.NOT_FOUND, "Class not found"),
    CLASS_DETAIL_NOT_FOUND(1611, HttpStatus.NOT_FOUND, "Class detail not found"),
    CLASS_NOT_ALLOWED_DELETE(1612, HttpStatus.BAD_REQUEST, "This %s class is not allowed delete"),
    CLASS_HAS_BEEN_ADDED_TO_CART(1615, HttpStatus.NOT_ACCEPTABLE, "This class has been added to cart"),
    CMN_INVALID_SEARCH_PATTERN(17000, HttpStatus.BAD_REQUEST, "Invalid search pattern"),
    USER_NOT_ALLOWED(1020, HttpStatus.FORBIDDEN, "You are not allowed to perform this action"),
    MAX_NUMBER_FILES(13040, HttpStatus.BAD_REQUEST, "You cannot register more than 3 attachments"),
    CLASS_LESSON_HAS_NOT_START(2010, HttpStatus.NOT_FOUND, "Lesson has not start"),
    VIDEO_NOT_FOUND(13050, HttpStatus.BAD_REQUEST, "video not exist"),
    VIDEO_EXIST(13051, HttpStatus.BAD_REQUEST, "video already exist"),
    COURSE_EMPTY(13060, HttpStatus.BAD_REQUEST, "course is empty"),
    COURSE_STATUS_INVALID(13061, HttpStatus.BAD_REQUEST, "course status is invalid");

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
