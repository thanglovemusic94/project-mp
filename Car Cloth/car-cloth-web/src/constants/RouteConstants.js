export const MAIN_PAGE_ROUTE = "/main"
export const PRODUCT_INFO_PAGE_ROUTE = {
    CATEGORY: "/product-info",
    BRAND: '/product-info/brand',
    BRAND_DETAIL: '/product-info/brand-detail',
}
export const TERMS_AND_CONDITIONS_ROUTE = "/terms"
export const IDENTITY_VERIFICATION_ROUTE = "/verify"
export const SPLASH_ROUTE = "/"
export const PERMISSION_ROUTE = "/permission"
export const SNS_LOGIN_ROUTE = "/login"
export const SNS_NAVER_LOGIN_CALLBACK_ROUTE = "/oauth2/callback/naver"
export const SNS_KAKAO_LOGIN_CALLBACK_ROUTE = "/oauth2/callback/kakao"
export const NOTICE_ROUTE = "/notices"
export const QUOTE_REQUEST_START_ROUTE = "/quote-request/start"
export const QUOTE_REQUEST_PART_SELECTION_ROUTE = "/quote-request/select-parts"
export const QUOTE_REQUEST_CREATE_ROUTE = "/quote-request/create"
export const QUOTE_REQUEST_ROUTE = "/quote-request"
export const CAR_REGISTER_ROUTE = "/car-register"

export const CONSTRUCTION_ROUTER = {
    CONSTRUCTION_LIST: '/construction-example-list',
    CONSTRUCTION_DETAIL: '/construction-example-detail',
    CONSTRUCTION_EDIT: '/construction-example-edit',
    CONSTRUCTION_REGISTER: '/construction-example-register',
}


export const USAGE_HISTORY_ROUTER = {
    API_USAGE_HISTORY: '/usage-history/transaction',
    API_RECEIVED_QUOTE: '/usage-history/transaction/:id/quotations',
    LIST: '/usage-history',
    DETAIL: '/usage-history/request-quote-detail',
    DETAIL_RECEIVED_QUOTE: '/usage-history/received-quote-detail',
    QUOTATION_DETAIL: '/usage-history/received-quote-detail/quotation-detail',
    REGISTER_REVIEW: '/usage-history/received-quote-detail/quotation-detail/register-review',
    EDIT_REVIEW: '/usage-history/received-quote-detail/quotation-detail/edit-review',
    COMPANY_INFO: '/usage-history/company-info',
    LIST_REVIEW: '/usage-history/my-page-info/reviews',
    RESERVATION_APPLICATION: '/usage-history/received-quote-detail/reservation',
    RESERVATION_HISTORY: '/usage-history/received-quote-detail/reservation/history',
}

export const MY_PAGE = "/my-page"
export const MY_PAGE_NOTIFICATION = "/my-page/notification"
export const MY_PAGE_FAQ = "/my-page/faq"
export const MY_PAGE_SETTING = "/my-page/setting"
export const MY_PAGE_ACCOUNT_SETTING = "/my-page/setting/account"
export const MY_PAGE_NOTICE_SETTING = "/my-page/setting/notice"
export const MY_PAGE_TERM = "/my-page/term"
export const MY_PAGE_PRIVACY_POLICY = "/my-page/privacy-policy"
// export const COMPANY_USAGE_GUIDE = "/my-page/usage"

export const COMPANY = {
    MANAGEMENT: "/my-page/management",
    REGISTER: "/my-page/register",
    REGISTER_HISTORY: "/my-page/register-application-history",
    QUOTATION_MANAGEMENT: "/my-page/quotes",
    REQUESTED_QUOTES: "/my-page/quotes/requested",
    SALE_MANAGEMENT: "/my-page/sale-management",
    NOTIFICATION: "/my-page/company-notification",
    CREATE_QUOTE: '/my-page/quotes/requested/detail/create-quote',
    DELIVERED_QUOTE: '/my-page/quotes/delivered-quote',
    REQUESTED_QUOTE_DETAIL: "/my-page/quotes/requested/detail",
    DELIVERED_QUOTE_DETAIL: '/my-page/quotes/delivered-quote/detail',
    RESERVATION_CONSTRUCTION: '/my-page/quotes/reservation-construction',
    CONSTRUCTION_COMPLETED: '/my-page/quotes/construction-completed',
    COMPANY_INFOR: "/my-page/info",
    COMPANY_INFOR_EDIT: "/my-page/info-edit",
    COMPANY_POINT: "/my-page/point",
    POINT_PURCHASE: "/my-page/point-purchase"
}
export const CHATTING = "/chatting"
