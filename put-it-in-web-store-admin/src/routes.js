import AnnouncementCreate from "./component/AnnouncementManage/AnnouncementCreate";
import Announcement from "./component/AnnouncementManage/AnnouncementManage";
import Homepage from "./component/Homepage/Homepage";
import InquiryCreate from "./component/InquiryManage/InquiryCreate";
import InquiryManage from "./component/InquiryManage/InquiryManage";
import Login from "./component/Login/Login";
import ManagerCreateOrEdit from "./component/ManagerManage/ManagerCreateOrEdit";
import ManagerManage from "./component/ManagerManage/ManagerManage";
import MemberManage from "./component/MemberManage/MemberManage";
import ProductCreateOrEdit from "./component/ProductManage/ProductCreateOrEdit";
import ProductInformation from "./component/ProductManage/ProductInformation";
import ProductManage from "./component/ProductManage/ProductManage";
import CompanyList from "./component/StoreManage/CompanyList";
import ReservationManage from "./component/ReservationManagement/ReservationManage";
import SettlementDetail from "./component/Settlement/SettlementDetail";
import SettlementBrokerage from "./component/Settlement/SettlementBrokerage";
import CompanySave from "./component/StoreManage/CompanySave";
import CompanyDetails from "./component/StoreManage/CompanyDetails";
import BranchDetails from "./component/BranchManage/BranchDetails";
import BranchList from "./component/BranchManage/BranchList";
import BranchSave from "./component/BranchManage/BranchSave";
import FAQManage from "./component/FAQManage/FAQManage";
import FAQCreate from "./component/FAQManage/FAQCreate";

export const routes = [
    {path: "/login", exact: false, component: Login},

    {path: "/index.html", exact: false, component: BranchList},
    {path: "/", exact: true, component: BranchList},

    {path: "/companies/create", exact: true, component: CompanySave},
    {path: "/companies/:id/edit", exact: false, component: CompanySave},
    {path: "/companies/:id", exact: false, component: CompanyDetails},
    {path: "/companies", exact: true, component: CompanyList},

    {path: "/branches/create", exact: true, component: BranchSave},
    {path: "/branches/:id/edit", exact: false, component: BranchSave},
    {path: "/branches/:id", exact: false, component: BranchDetails},
    {path: "/branches", exact: true, component: BranchList},

    {path: "/managers/create", exact: true, component: ManagerCreateOrEdit},
    {path: "/managers/:id/edit", exact: false, component: ManagerCreateOrEdit},
    {path: "/managers", exact: true, component: ManagerManage},

    {path: "/product", exact: true, component: ProductManage},
    {path: "/product/management", exact: false, component: ProductManage},
    {path: "/product/detail/:id", exact: true, component: ProductInformation},
    {path: "/product/create/", exact: true, component: ProductCreateOrEdit},
    {path: "/product/edit/:id", exact: false, component: ProductCreateOrEdit},

    {path: "/reservation", exact: true, component: ReservationManage},
    {path: "/reservation/management", exact: false, component: ReservationManage},

    {path: "/settlement", exact: true, component: SettlementDetail},
    {path: "/settlement/management", exact: false, component: SettlementDetail},
    {path: "/settlement/brokerage", exact: false, component: SettlementBrokerage},

    {path: "/member", exact: true, component: MemberManage},
    {path: "/member/management", exact: false, component: MemberManage},

    { path: "/announcement", exact: true, component: Announcement },
    { path: "/announcement/management", exact: false, component: Announcement },
    { path: "/announcement/create/", exact: true, component: AnnouncementCreate },
    { path: "/announcement/edit/:id", exact: true, component: AnnouncementCreate },

    { path: "/inquiry", exact: true, component: InquiryManage },
    { path: "/inquiry/management", "exact": false, component: InquiryManage },
    { path: "/inquiry/create", "exact": true, component: InquiryCreate },
    { path: "/inquiry/answer/:id", "exact": true, component: InquiryCreate },

    { path: "/faq", exact: true, component: FAQManage },
    { path: "/faq/management", exact: false, component: FAQManage },
    { path: "/faq/create", exact: true, component: FAQCreate },
    { path: "/faq/edit/:id", exact: true, component: FAQCreate },

]

export const navigation = [
    {
        mainMenu: "업체 관리",
        subMenu: [
            {name: "입점사 관리", url: "/companies"},
            {name: "지점 관리", url: "/branches"},
            {name: "담당자 관리", url: "/managers"},
        ]
    },
    {
        "mainMenu": "상품 관리",
        "url": "/product"
    },
    {
        "mainMenu": "예약 관리",
        "url": "/reservation"
    },
    {
        "mainMenu": "정산 관리"
        , "subMenu": [
            {"name": "정산내역", "url": "/settlement"},
            {"name": "중개 수수료 설정", "url": "/settlement/brokerage"}
        ]
    },
    {
        "mainMenu": "회원 관리",
        "url": "/member"
    },
    {
        "mainMenu": "메뉴 관리"
        , "subMenu": [
            {"name": "공지사항", "url": "/announcement"},
            {"name": "1:1 문의", "url": "/inquiry"},
            {"name": "자주 묻는 질문", "url": "/faq"}
        ]
    }
]

export default routes;