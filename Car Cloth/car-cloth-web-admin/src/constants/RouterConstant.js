export const NOTIFICATION_ROUTER = {
    API_NOTICE: '/admin/notifications',
    LIST: "/notification",
    EDIT: `/notification/edit`,
    EDIT_ID: `/notification/edit/:id`,
    REGISTER: "/notification/register",
}

export const BANNER_ROUTER = {
    API_BANNER: '/admin/banners',
    INDEX: '/banner'
}

export const PRODUCT_ROUTER = '/product'

export const CATEGORY_ROUTER = {
    API_CATEGORY: '/admin/car/category',
    LIST: "/product/category",
    EDIT: "/product/category/edit",
    EDIT_ID: "/product/category/edit/:id",
    REGISTER: "/product/category/register",
}

export const BRAND_ROUTER = {
    API_BRAND: '/admin/car/brand',
    LIST: "/product/brand",
    EDIT: "/product/brand/edit",
    EDIT_ID: "/product/brand/edit/:id",
    REGISTER: "/product/brand/register",
}

export const CART_TYPE_ROUTER = {
    API_CAR_TYPE: '/admin/car/car-type',
    LIST: "/product/car-type",
    EDIT: "/product/car-type/edit",
    EDIT_ID: "/product/car-type/edit/:id",
    REGISTER: "/product/car-type/register",
}

export const GENERAL_ROUTER = '/general'

export const ADMIN_ACCOUNT_ROUTER = {
    API_ADMIN_CHANGE_PASS: '/admin/password',
    INDEX: '/general/admin-account'
}

export const FAQ_ROUTER = {
    API_FAQ: '/admin/faqs',
    LIST: '/general/faq',
    REGISTER: '/general/faq/register',
    EDIT: '/general/faq/edit',
    EDIT_ID: `/general/faq/edit/:id`,
}

export const POINT_ROUTER = {
    API_POINT: '/admin/points',
    LIST: '/general/point'
}

export const TERM_ROUTER = {
    API_TERM: '/admin/terms-policy/',
    INDEX: '/general/term'
}

export const DASHBOARD_ROUTER = "/";

export const MEMBERS_ROUTER = {
    API_MEMBER: '/admin/members',
    MANAGEMENT: "/members",
    DETAILS: "/members/:id/details"
}

export const COMPANY_ROUTER = {
    MANAGEMENT: "/companies",
    DETAILS: "/companies/:id/details",
    REGISTRATIONS: "/companies/registrations",
    REGISTRATION_DETAILS: "/companies/registration/:id/details"
}

export const LOGIN_ROUTER = "/login"

export const CONSTRUCTION_ROUTER = {
    EXAMPLES: "/companies/constructions-examples",
    EXAMPLES_DETAILS: "/companies/constructions-examples/:id/details",
    REVIEWS: "/companies/constructions-reviews",
    REVIEWS_DETAILS: "/companies/constructions-reviews/:id/details",
}

export const TRANSACTION_ROUTER = {
    MANAGEMENT: "/transactions",
    DETAILS: "/transactions/:id/details"
}

export const QUOTE_HISTORY_ROUTER = "/quotes/:id/history"
