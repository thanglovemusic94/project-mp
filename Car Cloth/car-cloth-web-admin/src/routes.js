import React from 'react';
import {
    ADMIN_ACCOUNT_ROUTER,
    BANNER_ROUTER,
    BRAND_ROUTER,
    CART_TYPE_ROUTER,
    CATEGORY_ROUTER,
    COMPANY_ROUTER,
    CONSTRUCTION_ROUTER,
    DASHBOARD_ROUTER,
    FAQ_ROUTER,
    GENERAL_ROUTER,
    MEMBERS_ROUTER,
    NOTIFICATION_ROUTER,
    POINT_ROUTER,
    PRODUCT_ROUTER,
    TERM_ROUTER,
    TRANSACTION_ROUTER
} from "./constants/RouterConstant";

// const DeliveredQuoteHistory = React.lazy(() => import('./views/quotes/DeliveredQuoteHistory'))

const TransactionManagement = React.lazy(() => import('./views/transactions/TransactionManagement'))
const TransactionDetails = React.lazy(() => import('./views/transactions/TransactionDetails'))

const ConstructionExamplesManagement = React.lazy(() => import('./views/constructions/ConstructionExamplesManagement'))
const ConstructionExampleDetails = React.lazy(() => import('./views/constructions/ConstructionExampleDetails'))
const ConstructionReviewsManagement = React.lazy(() => import('./views/constructions/ConstructionReviewsManagement'))
const ConstructionReviewDetails = React.lazy(() => import('./views/constructions/ConstructionReviewDetails'))

const CompanyManagement = React.lazy(() => import('./views/company/CompanyManagement'))
const CompanyDetails = React.lazy(() => import('./views/company/CompanyDetails'))
const CompanyAppRegisManagement = React.lazy(() => import('./views/company/CompanyAppRegisManagement'))
const CompanyAppRegisDetails = React.lazy(() => import('./views/company/CompanyAppRegisDetails'))

const MemberManagement = React.lazy(() => import('./views/member/MemberManagement'))
const MemberDetails = React.lazy(() => import('./views/member/MemberDetails'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//form screen 28 - > end in wireframe
const NoticeList = React.lazy(() => import('./views/notification/NoticeList'))
const NoticeEdit = React.lazy(() => import('./views/notification/NoticeEdit'))
const NoticeRegister = React.lazy(() => import('./views/notification/NoticeRegister'))
const BannerList = React.lazy(() => import('./views/banner/BannerList'))

const CategoryList = React.lazy(() => import('./views/product/category/CategoryList'))
const CategoryEdit = React.lazy(() => import('./views/product/category/CategoryEdit'))
// const CategoryRegister = React.lazy(() => import('./views/product/category/PopupCategoryRegister'))

const BrandList = React.lazy(() => import('./views/product/brand/BrandList'))
const BrandRegister = React.lazy(() => import('./views/product/brand/BrandRegister'))
const BrandEdit = React.lazy(() => import('./views/product/brand/BrandEdit'))

const CarTypeList = React.lazy(() => import('./views/product/car_type/CarTypeList'))
const CarTypeEdit = React.lazy(() => import('./views/product/car_type/CarTypeEdit'))
const CarTypeRegister = React.lazy(() => import('./views/product/car_type/CarTypeRegister'))

const AdminAccount = React.lazy(() => import('./views/general/AdminAccount'))

const FaqList = React.lazy(() => import('./views/general/faq/FaqList'))
const FaqEdit = React.lazy(() => import('./views/general/faq/FaqEdit'))
const FaqRegister = React.lazy(() => import('./views/general/faq/FaqRegister'))

const PointList = React.lazy(() => import('./views/general/PointList'))

const Term = React.lazy(() => import('./views/general/Terms'))

const routes = [
    { path: DASHBOARD_ROUTER, exact: true, component: Dashboard },

    { path: MEMBERS_ROUTER.MANAGEMENT, exact: true, component: MemberManagement },
    { path: MEMBERS_ROUTER.DETAILS, exact: true, component: MemberDetails },

    { path: COMPANY_ROUTER.MANAGEMENT, exact: true, component: CompanyManagement },
    { path: COMPANY_ROUTER.DETAILS, exact: true, component: CompanyDetails },
    { path: COMPANY_ROUTER.REGISTRATIONS, exact: true, component: CompanyAppRegisManagement },
    { path: COMPANY_ROUTER.REGISTRATION_DETAILS, exact: true, component: CompanyAppRegisDetails },

    { path: CONSTRUCTION_ROUTER.EXAMPLES, exact: true, component: ConstructionExamplesManagement },
    { path: CONSTRUCTION_ROUTER.EXAMPLES_DETAILS, exact: true, component: ConstructionExampleDetails },
    { path: CONSTRUCTION_ROUTER.REVIEWS, exact: true, component: ConstructionReviewsManagement },
    { path: CONSTRUCTION_ROUTER.REVIEWS_DETAILS, exact: true, component: ConstructionReviewDetails },

    { path: TRANSACTION_ROUTER.MANAGEMENT, exact: true, component: TransactionManagement },
    { path: TRANSACTION_ROUTER.DETAILS, exact: true, component: TransactionDetails },

    // { path: QUOTE_HISTORY_ROUTER, exact: true, component: DeliveredQuoteHistory },

    //form screen 28 - > end in wireframe
    { path: NOTIFICATION_ROUTER.LIST, exact: true, component: NoticeList },
    { path: NOTIFICATION_ROUTER.EDIT_ID, exact: false, component: NoticeEdit },
    { path: NOTIFICATION_ROUTER.REGISTER, exact: false, component: NoticeRegister },

    { path: BANNER_ROUTER.INDEX, exact: false, component: BannerList },


    { path: PRODUCT_ROUTER, exact: true, component: CategoryList },

    { path: CATEGORY_ROUTER.LIST, exact: true, component: CategoryList },
    { path: CATEGORY_ROUTER.EDIT, exact: false, component: CategoryEdit },
    // { path: CATEGORY_ROUTER.REGISTER, exact: false, component: CategoryRegister },

    { path: BRAND_ROUTER.LIST, exact: true, component: BrandList },
    { path: BRAND_ROUTER.REGISTER, exact: false, component: BrandRegister },
    { path: BRAND_ROUTER.EDIT_ID, exact: false, component: BrandEdit },

    { path: CART_TYPE_ROUTER.LIST, exact: true, component: CarTypeList },
    { path: CART_TYPE_ROUTER.EDIT_ID, exact: true, component: CarTypeEdit },
    { path: CART_TYPE_ROUTER.REGISTER, component: CarTypeRegister },

    { path: GENERAL_ROUTER, exact: true, component: AdminAccount },

    { path: ADMIN_ACCOUNT_ROUTER.INDEX, exact: false, component: AdminAccount },

    { path: FAQ_ROUTER.LIST, exact: true, component: FaqList },
    { path: FAQ_ROUTER.EDIT_ID, exact: false, component: FaqEdit },
    { path: FAQ_ROUTER.REGISTER, exact: false, component: FaqRegister },

    { path: POINT_ROUTER.LIST, exact: false, component: PointList },

    { path: TERM_ROUTER.INDEX, exact: false, component: Term },
]

export default routes;
