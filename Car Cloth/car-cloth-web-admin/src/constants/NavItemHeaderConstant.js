import {
    BANNER_ROUTER,
    COMPANY_ROUTER,
    DASHBOARD_ROUTER,
    GENERAL_ROUTER,
    MEMBERS_ROUTER,
    NOTIFICATION_ROUTER,
    PRODUCT_ROUTER,
    TRANSACTION_ROUTER
} from "./RouterConstant";

export const NavItemHeaderConstant = [
    {
        'name': '대시보드',
        'route': DASHBOARD_ROUTER
    },
    {
        'name': '회원관리​',
        'route': MEMBERS_ROUTER.MANAGEMENT
    },
    {
        'name': '업체관리',
        'route': COMPANY_ROUTER.MANAGEMENT
    },
    {
        'name': '거래 관리​',
        'route': TRANSACTION_ROUTER.MANAGEMENT
    },
    {
        'name': '공지사항 관리​',
        'route': NOTIFICATION_ROUTER.LIST
    },
    {
        'name': '배너 관리​',
        'route': BANNER_ROUTER.INDEX
    },
    {
        'name': '상품 / 차종 관리',
        'route': PRODUCT_ROUTER
    },
    {
        'name': '기본 설정',
        'route': GENERAL_ROUTER
    }
];
