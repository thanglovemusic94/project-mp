import React from 'react'

// const Toaster = React.lazy(() =>
//     import('./views/notifications/toaster/Toaster')
// )
// const Tables = React.lazy(() => import('./views/base/tables/Tables'))

// const Breadcrumbs = React.lazy(() =>
//     import('./views/base/breadcrumbs/Breadcrumbs')
// )
// const Cards = React.lazy(() => import('./views/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
// const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'))

// const Jumbotrons = React.lazy(() =>
//     import('./views/base/jumbotrons/Jumbotrons')
// )
// const ListGroups = React.lazy(() =>
//     import('./views/base/list-groups/ListGroups')
// )
// const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'))
// const Navs = React.lazy(() => import('./views/base/navs/Navs'))
// const Paginations = React.lazy(() =>
//     import('./views/base/paginations/Pagnations')
// )
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
// const ProgressBar = React.lazy(() =>
//     import('./views/base/progress-bar/ProgressBar')
// )
// const Switches = React.lazy(() => import('./views/base/switches/Switches'))

// const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))
// const BrandButtons = React.lazy(() =>
//     import('./views/buttons/brand-buttons/BrandButtons')
// )
// const ButtonDropdowns = React.lazy(() =>
//     import('./views/buttons/button-dropdowns/ButtonDropdowns')
// )
// const ButtonGroups = React.lazy(() =>
//     import('./views/buttons/button-groups/ButtonGroups')
// )
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const Charts = React.lazy(() => import('./views/charts/Charts'))
// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const CoreUIIcons = React.lazy(() =>
//     import('./views/icons/coreui-icons/CoreUIIcons')
// )
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
// const Typography = React.lazy(() =>
//     import('./views/theme/typography/Typography')
// )
// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
// const Users = React.lazy(() => import('./views/users/Users'))
// const User = React.lazy(() => import('./views/users/User'))

// Define Routes of ReadingM project
const Banners = React.lazy(() => import('./views/main/banners/banners/Banners'))
const BannerRegister = React.lazy(() =>
    import('./views/main/banners/banner-register/BannerRegister')
)
const BannerEdit = React.lazy(() =>
    import('./views/main/banners/banner-edit/BannerEdit')
)
const Video = React.lazy(() => import('./views/main/video/Video'))
const Magazines = React.lazy(() =>
    import('./views/main/magazines/magazines/Magazines')
)
const MagazineRegister = React.lazy(() =>
    import('./views/main/magazines/magazine-register/MagazineRegister')
)
const MagazineEdit = React.lazy(() =>
    import('./views/main/magazines/magazine-edit/MagazineEdit')
)
const Notices = React.lazy(() => import('./views/main/notices/notices/Notice'))
const NoticeSave = React.lazy(() =>
    import('./views/main/notices/notice-register/NoticeSave')
)

const Popup = React.lazy(() => import('./views/main/popup/PopupRegister'))
const Event = React.lazy(() => import('./views/main/event/EventRegister'))
const LiveclassClass = React.lazy(() =>
    import('./views/class/liveclass-class/LiveclassClass')
)
const LiveclassBook = React.lazy(() =>
    import('./views/class/liveclass-book/LiveclassBook')
)
const DavinciMaths = React.lazy(() =>
    import('./views/class/davinci-maths/davinci-maths/DavinciMaths')
)

const DavinciMathRegister = React.lazy(() =>
    import(
        './views/class/davinci-maths/davinci-math-register/DavinciMathRegister'
    )
)
const DavinciMathEdit = React.lazy(() =>
    import('./views/class/davinci-maths/davinci-math-edit/DavinciMathEdit')
)
const DavinciList = React.lazy(() =>
    import('./views/class/davinci-log-list/DavinciLogList')
)
const PurchasingBook = React.lazy(() =>
    import('./views/book/purchasing-book/PurchasingBook')
)
const Payments = React.lazy(() =>
    import('./views/payment/payment-list/payments/Payments')
)
const PaymentDetails = React.lazy(() =>
    import('./views/payment/payment-list/payment-details/PaymentDetails')
)

const Refunds = React.lazy(() =>
    import('./views/payment/refund-list/refunds/Refunds')
)
const RefundDetails = React.lazy(() =>
    import('./views/payment/refund-list/refund-details/RefundDetails')
)

const Cashs = React.lazy(() => import('./views/payment/cash-list/cashs/Cashs'))
const CashDetails = React.lazy(() =>
    import('./views/payment/cash-list/cash-details/CashDetails')
)

const Members = React.lazy(() =>
    import('./views/member/member-list/members/Members')
)
const Parent = React.lazy(() =>
    import('./views/member/member-list/parent/Parent')
)
const Student = React.lazy(() =>
    import('./views/member/member-list/student/Student')
)
const Tutor = React.lazy(() => import('./views/member/member-list/tutor/Tutor'))

const Withdrawal = React.lazy(() =>
    import('./views/member/withdrawal/Withdrawals')
)
const Coupons = React.lazy(() =>
    import('./views/member/coupon-list/coupons/Coupons')
)
const CouponRegister = React.lazy(() =>
    import('./views/member/coupon-list/coupon-register/CouponRegister')
)
const CouponEdit = React.lazy(() =>
    import('./views/member/coupon-list/coupon-edit/CouponEdit')
)
const Points = React.lazy(() =>
    import('./views/member/point-list/points/Points')
)
const PointRegister = React.lazy(() =>
    import('./views/member/point-list/point-register/PointRegister')
)
const PointEdit = React.lazy(() =>
    import('./views/member/point-list/point-edit/PointEdit')
)

const TutorRegisterList = React.lazy(() =>
    import('./views/tutor/tutor-register-list/TutorRegisterList')
)
const TutorRegisterDetails = React.lazy(() =>
    import('./views/tutor/tutor-register-details/TutorRegisterDetails')
)

const FAQs = React.lazy(() => import('./views/notice/faq-list/faqs/Faqs'))
const FaqRegister = React.lazy(() =>
    import('./views/notice/faq-list/faq-register/FaqRegister')
)
const FaqEdit = React.lazy(() =>
    import('./views/notice/faq-list/faq-edit/FaqEdit')
)

const Inquiries = React.lazy(() =>
    import('./views/notice/inquiry-list/inquiries/Inquiries')
)
const InquiryAnswer = React.lazy(() =>
    import('./views/notice/inquiry-list/inquiry-answer/InquiryAnswer')
)
const InquiryComplete = React.lazy(() =>
    import('./views/notice/inquiry-list/inquiry-complete/InquiryComplete')
)
const Reviews = React.lazy(() => import('./views/notice/review-list/Reviews'))
const TutorSettled = React.lazy(() =>
    import('./views/settlement/tutor-settled/TutorSettled')
)

// End Define Routes of ReadingM project

const routes = [
    // Define Routes of ReadingM project
    { path: '/main/banners', name: 'Banners', component: Banners, exact: true },
    {
        path: '/main/banners/banners',
        name: 'Banners',
        component: Banners,
        exact: true,
    },
    {
        path: '/main/banners/banner-register/',
        name: 'BannerRegister',
        component: BannerRegister,
    },
    {
        path: '/main/banners/banner-edit/:id',
        name: 'BannerEdit',
        component: BannerEdit,
    },
    { path: '/main/video', name: 'Video', component: Video },
    {
        path: '/main/magazines/',
        name: 'Magazines',
        component: Magazines,
        exact: true,
    },
    // {
    //     path: '/main/magazines',
    //     name: 'Magazines',
    //     component: Magazines,
    // },
    {
        path: '/main/magazines/magazine-register',
        name: 'MagazineRegister',
        component: MagazineRegister,
    },
    {
        path: '/main/magazines/magazine-edit/:id',
        name: 'MagazineEdit',
        component: MagazineEdit,
    },
    { path: '/main/notices', name: 'Notices', component: Notices, exact: true },
    {
        path: '/main/notices/notices',
        name: 'Notice List',
        component: Notices,
    },
    {
        path: '/main/notices/notice-register',
        name: 'Notice Register',
        component: NoticeSave,
    },
    {
        path: '/main/notices/notice-edit/:id',
        name: 'Notice Edit',
        component: NoticeSave,
    },

    { path: '/main/popup', name: 'Popup', component: Popup },
    { path: '/main/event', name: 'Event', component: Event },

    {
        path: '/class/liveclass-class',
        name: 'LiveclassClass',
        component: LiveclassClass,
    },
    {
        path: '/class/liveclass-book',
        name: 'LiveclassBook',
        component: LiveclassBook,
    },
    {
        path: '/class/davinci-maths/',
        name: 'DavinciMaths list',
        component: DavinciMaths,
        exact: true,
    },
    {
        path: '/class/davinci-maths/davinci-maths',
        name: 'DavinciMaths',
        component: DavinciMaths,
    },
    {
        path: '/class/davinci-maths/davinci-math-register',
        name: 'DavinciMathRegister',
        component: DavinciMathRegister,
    },
    {
        path: '/class/davinci-maths/davinci-math-edit/:id',
        name: 'DavinciMathEdit',
        component: DavinciMathRegister,
    },

    {
        path: '/class/davinci-log-list',
        name: 'DavinciList',
        component: DavinciList,
    },
    {
        path: '/book/purchasing-book',
        name: 'PurchasingBook',
        component: PurchasingBook,
    },
    {
        path: '/payment/payment-list',
        name: 'Payment List',
        component: Payments,
        exact: true,
    },
    {
        path: '/payment/payment-list/payments',
        name: 'Payments',
        component: Payments,
    },
    {
        path: '/payment/payment-list/payment-details/:id',
        name: 'PaymentDetails',
        component: PaymentDetails,
    },

    {
        path: '/payment/refund-list',
        name: 'Refund List',
        component: Refunds,
        exact: true,
    },
    {
        path: '/payment/refund-list/refunds',
        name: 'Refunds',
        component: Refunds,
    },
    {
        path: '/payment/refund-list/refund-details/:id',
        name: 'RefundDetails',
        component: RefundDetails,
    },

    {
        path: '/payment/cash-list',
        name: 'Cash list',
        component: Cashs,
        exact: true,
    },
    {
        path: '/payment/cash-list/cashs',
        name: 'Cashs',
        component: Cashs,
    },
    {
        path: '/payment/cash-list/cash-details/:id',
        name: 'CashDetails',
        component: CashDetails,
    },

    {
        path: '/member/member-list',
        name: 'Member list',
        component: Members,
        exact: true,
    },
    {
        path: '/member/member-list/members',
        name: 'Members',
        component: Members,
    },
    {
        path: '/member/member-list/parent',
        name: 'Parent',
        component: Parent,
    },
    {
        path: '/member/member-list/student',
        name: 'Student',
        component: Student,
    },
    {
        path: '/member/member-list/tutor',
        name: 'Tutor',
        component: Tutor,
    },

    { path: '/member/withdrawal', name: 'Withdrawal', component: Withdrawal },

    {
        path: '/member/coupon-list',
        name: 'Coupon List',
        component: Coupons,
        exact: true,
    },
    {
        path: '/member/coupon-list/coupons',
        name: 'Coupons',
        component: Coupons,
    },
    {
        path: '/member/coupon-list/coupon-register/',
        name: 'CouponRegister',
        component: CouponRegister,
    },
    {
        path: '/member/coupon-list/coupon-edit/',
        name: 'CouponEdit',
        component: CouponEdit,
    },

    {
        path: '/member/point-list',
        name: 'Point List',
        component: Points,
        exact: true,
    },
    {
        path: '/member/point-list/points',
        name: 'Points',
        component: Points,
    },
    {
        path: '/member/point-list/point-register/',
        name: 'PointRegister',
        component: PointRegister,
    },
    {
        path: '/member/point-list/point-edit/',
        name: 'PointEdit',
        component: PointEdit,
    },

    {
        path: '/tutor',
        name: 'Tutor',
        component: TutorRegisterList,
        exact: true,
    },
    {
        path: '/tutor/tutor-register-list',
        name: 'Tutor register List',
        component: TutorRegisterList,
    },
    {
        path: '/tutor/tutor-register-details/:id',
        name: 'Tutor register details',
        component: TutorRegisterDetails,
    },

    {
        path: '/notice/faq-list',
        name: 'FAQ List',
        component: FAQs,
        exact: true,
    },
    {
        path: '/notice/faq-list/faqs',
        name: 'FAQs',
        component: FAQs,
    },
    {
        path: '/notice/faq-list/faq-register',
        name: 'FaqRegister',
        component: FaqRegister,
    },
    {
        path: '/notice/faq-list/faq-edit/:id',
        name: 'FaqEdit',
        component: FaqRegister,
    },
    {
        path: '/notice/inquiry-list',
        name: 'Inquiry List',
        component: Inquiries,
        exact: true,
    },
    {
        path: '/notice/inquiry-list/inquiries',
        name: 'Inquiries',
        component: Inquiries,
    },
    {
        path: '/notice/inquiry-list/inquiry-answer/:id',
        name: 'InquiryAnswer',
        component: InquiryAnswer,
    },
    {
        path: '/notice/inquiry-list/inquiry-complete/:id',
        name: 'InquiryComplete',
        component: InquiryComplete,
    },

    { path: '/notice/review-list', name: 'Reviews', component: Reviews },

    {
        path: '/settlement/tutor-settled',
        name: 'TutorSettled',
        component: TutorSettled,
    },

    // End Define Routes of ReadingM project

    // { path: '/', exact: true, name: 'Home' },
    // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    // { path: '/theme', name: 'Theme', component: Colors, exact: true },
    // { path: '/theme/colors', name: 'Colors', component: Colors },
    // { path: '/theme/typography', name: 'Typography', component: Typography },
    // { path: '/base', name: 'Base', component: Cards, exact: true },
    // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
    // { path: '/base/cards', name: 'Cards', component: Cards },
    // { path: '/base/carousels', name: 'Carousel', component: Carousels },
    // { path: '/base/collapses', name: 'Collapse', component: Collapses },
    // { path: '/base/forms', name: 'Forms', component: BasicForms },
    // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
    // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
    // { path: '/base/navbars', name: 'Navbars', component: Navbars },
    // { path: '/base/navs', name: 'Navs', component: Navs },
    // { path: '/base/paginations', name: 'Paginations', component: Paginations },
    // { path: '/base/popovers', name: 'Popovers', component: Popovers },
    // {
    //     path: '/base/progress-bar',
    //     name: 'Progress Bar',
    //     component: ProgressBar,
    // },
    // { path: '/base/switches', name: 'Switches', component: Switches },
    // { path: '/base/tables', name: 'Tables', component: Tables },
    // { path: '/base/tabs', name: 'Tabs', component: Tabs },
    // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
    // { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
    // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
    // {
    //     path: '/buttons/button-dropdowns',
    //     name: 'Dropdowns',
    //     component: ButtonDropdowns,
    // },
    // {
    //     path: '/buttons/button-groups',
    //     name: 'Button Groups',
    //     component: ButtonGroups,
    // },
    // {
    //     path: '/buttons/brand-buttons',
    //     name: 'Brand Buttons',
    //     component: BrandButtons,
    // },
    // { path: '/charts', name: 'Charts', component: Charts },
    // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
    // {
    //     path: '/icons/coreui-icons',
    //     name: 'CoreUI Icons',
    //     component: CoreUIIcons,
    // },
    // { path: '/icons/flags', name: 'Flags', component: Flags },
    // { path: '/icons/brands', name: 'Brands', component: Brands },
    // {
    //     path: '/notifications',
    //     name: 'Notifications',
    //     component: Alerts,
    //     exact: true,
    // },
    // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
    // { path: '/notifications/badges', name: 'Badges', component: Badges },
    // { path: '/notifications/modals', name: 'Modals', component: Modals },
    // { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
    // { path: '/widgets', name: 'Widgets', component: Widgets },
    // { path: '/users', exact: true, name: 'Users', component: Users },
    // { path: '/users/:id', exact: true, name: 'User Details', component: User },
]

export default routes
