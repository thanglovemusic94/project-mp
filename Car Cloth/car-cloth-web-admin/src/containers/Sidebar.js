import {CButton, CNavItem, CSidebar, CSidebarNav} from "@coreui/react";
import {
    ADMIN_ACCOUNT_ROUTER,
    BANNER_ROUTER,
    BRAND_ROUTER,
    CART_TYPE_ROUTER, CATEGORY_ROUTER,
    COMPANY_ROUTER,
    CONSTRUCTION_ROUTER,
    DASHBOARD_ROUTER,
    FAQ_ROUTER,
    MEMBERS_ROUTER,
    NOTIFICATION_ROUTER,
    POINT_ROUTER, TERM_ROUTER, TRANSACTION_ROUTER
} from "../constants/RouterConstant";
import {useHistory, useLocation} from "react-router";

function Sidebar({ section }) {
    const navItems = [
        [
            { 'name': '대시보드', 'route': DASHBOARD_ROUTER }
        ],
        [
            { 'name': '회원 관리', 'route': MEMBERS_ROUTER.MANAGEMENT },
            // { 'name': '휴면회원 관리', 'route': '/' }
        ],
        [
            { 'name': '업체 관리', 'route': COMPANY_ROUTER.MANAGEMENT },
            { 'name': '시공 사례 관리', 'route': CONSTRUCTION_ROUTER.EXAMPLES },
            { 'name': '시공 후기 관리', 'route': CONSTRUCTION_ROUTER.REVIEWS },
            { 'name': '업체 등록 신청 관리', 'route': COMPANY_ROUTER.REGISTRATIONS }
        ],
        [
            { 'name': '거래 관리', 'route': TRANSACTION_ROUTER.MANAGEMENT }
        ],
        [
            { 'name': '공지사항 관리', 'route': NOTIFICATION_ROUTER.LIST }
        ],
        [
            { 'name': '배너 관리', 'route': BANNER_ROUTER.INDEX }
        ],
        [
            { 'name': '상품 관리', 'route': CATEGORY_ROUTER.LIST },
            { 'name': '브랜드 관리', 'route': BRAND_ROUTER.LIST },
            { 'name': '차종 관리', 'route': CART_TYPE_ROUTER.LIST }
        ],
        [
            { 'name': '관리자 계정 관리', 'route': ADMIN_ACCOUNT_ROUTER.INDEX },
            { 'name': 'FAQ 관리', 'route': FAQ_ROUTER.LIST },
            { 'name': '약관&정책 관리', 'route': TERM_ROUTER.INDEX },
            { 'name': '포인트 관리', 'route': POINT_ROUTER.LIST }
        ]
    ]

    const selectedSection = section !== -1 ? section : 0;
    const history = useHistory()
    const url = useLocation().pathname

    return (
        <CSidebar className={'min-vh-100'} >
            <CSidebarNav  className={'mt-4 '}>
                {
                    navItems[selectedSection].map((item, index) => {

                        return (
                            <CNavItem key={`nav-side-bar-${index}`}
                            >
                                <CButton
                                    className="w-100 text-nowrap fs-6 text-white text-start shadow-none border-0 py-3"
                                    component="button"
                                    role="button"
                                    size="lg"
                                    color="dark"
                                    variant="ghost"
                                    shape="rounded-0"
                                    onClick={()=>history.push(item.route)}
                                    active={url === item.route}
                                >
                                    {item.name}
                                </CButton>

                            </CNavItem>
                        );
                    })
                }
            </CSidebarNav>
        </CSidebar>
    );
}

export default Sidebar;
