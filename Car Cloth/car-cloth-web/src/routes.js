import React from "react";
import OptItemNotification from "./components/extras/OptItemNotification";
import {
  CAR_REGISTER_ROUTE,
  CHATTING,
  COMPANY,
  CONSTRUCTION_ROUTER,
  IDENTITY_VERIFICATION_ROUTE,
  MAIN_PAGE_ROUTE,
  MY_PAGE,
  MY_PAGE_NOTIFICATION,
  MY_PAGE_FAQ,
  MY_PAGE_SETTING,
  MY_PAGE_ACCOUNT_SETTING,
  MY_PAGE_NOTICE_SETTING,
  MY_PAGE_TERM,
  MY_PAGE_PRIVACY_POLICY,
  NOTICE_ROUTE,
  PERMISSION_ROUTE,
  PRODUCT_INFO_PAGE_ROUTE,
  QUOTE_REQUEST_ROUTE,
  QUOTE_REQUEST_START_ROUTE,
  QUOTE_REQUEST_PART_SELECTION_ROUTE,
  QUOTE_REQUEST_CREATE_ROUTE,
  SNS_LOGIN_ROUTE,
  SNS_NAVER_LOGIN_CALLBACK_ROUTE,
  SNS_KAKAO_LOGIN_CALLBACK_ROUTE,
  SPLASH_ROUTE,
  TERMS_AND_CONDITIONS_ROUTE,
  USAGE_HISTORY_ROUTER,
} from "./constants/RouteConstants";
import { Localizations } from "./texts/Localizations";
import CompanyInfoHeader from "./components/extras/CompanyInfoHeader";
import QuotationHeaderIcon from "./components/extras/QuotationHeaderIcon";
import PointPurchaseHeaderIcon from "./components/extras/PointPurchaseHeaderIcon";
import ConstructionRegisterHeaderIcon from "./components/extras/ConstructionRegisterHeaderIcon";
import ConstructionEditHeaderIcon from "./components/extras/ConstructionEditHeaderIcon";

const BrandDetailPage = React.lazy(() =>
  import("./pages/product-info/BrandDetailPage")
);
const BrandListPage = React.lazy(() =>
  import("./pages/product-info/BrandListPage")
);
const CarRegisterPage = React.lazy(() =>
  import("./pages/car-register/CarRegisterPage")
);

const LoginPage = React.lazy(() => import("./pages/login/LoginPage"));
const MainPage = React.lazy(() => import("./pages/MainPage"));
const NoticePage = React.lazy(() => import("./pages/NoticePage"));
const PermissionsPage = React.lazy(() => import("./pages/PermissionsPage"));
const ProductInfoPage = React.lazy(() =>
  import("./pages/product-info/ProductInfoPage")
);
const QuoteRequestPage = React.lazy(() =>
  import("./pages/quote-request/QuoteRequestPage")
);
const SplashPage = React.lazy(() => import("./pages/SplashPage"));

const TermsAndConditionsPage = React.lazy(() =>
  import("./pages/TermsAndConditionsPage")
);
const IdentityVerificationPage = React.lazy(() =>
  import("./pages/IdentityVerificationPage")
);

const NaverLoginPageCallback = React.lazy(() =>
  import("./pages/login/NaverLoginPageCallback")
);
const KakaoLoginPageCallback = React.lazy(() =>
  import("./pages/login/KakaoLoginPageCallback")
);

//Construction
const ConstructionExampleListPage = React.lazy(() =>
  import("./pages/construction-example/ConstructionExampleListPage")
);
const ConstructionExampleDetailPage = React.lazy(() =>
  import("./pages/construction-example/ConstructionExampleDetailPage")
);
const ConstructionExampleRegisterPage = React.lazy(() =>
  import("./pages/construction-example/ConstructionExampleRegisterPage")
);
const ConstructionExampleEditPage = React.lazy(() =>
  import("./pages/construction-example/ConstructionExampleEditPage")
);

//END Construction

//USAGE HISTORY
const UsageHistoryListPage = React.lazy(() =>
  import("./pages/usage-history-manager/UsageHistoryPage")
);
const QuotationDetailPage = React.lazy(() =>
  import("./pages/usage-history-manager/QuotationDetailPage")
);
const UsageRequestQuoteDetailPage = React.lazy(() =>
  import("./pages/usage-history-manager/UsageRequestQuoteDetailPage")
);
const ReceivedQuotePage = React.lazy(() =>
  import("./pages/usage-history-manager/ReceivedQuotePage")
);
const RegisterReviewPage = React.lazy(() =>
  import("./pages/usage-history-manager/RegisterReviewPage")
);
const CompanyInforPage = React.lazy(() =>
  import("./pages/company/CompanyInforPage")
);
const ListReviews = React.lazy(() =>
  import("./pages/usage-history-manager/ListReviews")
);
const ReservationApplicationPage = React.lazy(() =>
  import("./pages/usage-history-manager/ReservationApplicationPage")
);
const ReservationHistoryPage = React.lazy(() =>
  import("./pages/usage-history-manager/ReservationHistoryPage")
);
//END USAGE HISTORY

//MY PAGE
const MyPage = React.lazy(() => import("./pages/my-page/MyPage"));
const NotificationPage = React.lazy(() =>
  import("./pages/my-page/NotificationPage")
);
const FAQPage = React.lazy(() => import("./pages/my-page/FAQPage"));
const SettingPage = React.lazy(() => import("./pages/my-page/SettingPage"));
const AccountSettingPage = React.lazy(() =>
  import("./pages/my-page/AccountSettingPage")
);
const NoticeSettingPage = React.lazy(() =>
  import("./pages/my-page/NoticeSettingPage")
);
const TermPage = React.lazy(() => import("./pages/my-page/TermPage"));
const PrivacyPolicyPage = React.lazy(() =>
  import("./pages/my-page/PrivacyPolicyPage")
);

//END MY PAGE

//COMPANY
const CompanyRegistration = React.lazy(() =>
  import("./pages/company/CompanyRegistrationPage")
);
const CompanyApplicationHistoryPage = React.lazy(() =>
  import("./pages/company/CompanyApplicationHistoryPage")
);
const CompanyManagementPage = React.lazy(() =>
  import("./pages/company/CompanyManagementPage")
);
const CompanyQuotePage = React.lazy(() =>
  import("./pages/quotation-management/CompanyQuotePage")
);
const CompanySaleManagement = React.lazy(() =>
  import("./pages/company/CompanySaleManagement")
);
const CompanyNotification = React.lazy(() =>
  import("./pages/company/CompanyNotification")
);
const CompanyInforEdit = React.lazy(() =>
  import("./pages/company/CompanyInforEditPage")
);
const RequestQuotesPage = React.lazy(() =>
  import("./pages/quotation-management/RequestQuotesPage")
);
const RequestQuoteDetailPage = React.lazy(() =>
  import("./pages/quotation-management/RequestQuoteDetailPage")
);
const CreateQuotePage = React.lazy(() =>
  import("./pages/quotation-management/CreateQuotePage")
);
const DeliveredQuotesPage = React.lazy(() =>
  import("./pages/quotation-management/DeliveredQuotesPage")
);
const DeliveredQuoteDetailPage = React.lazy(() =>
  import("./pages/quotation-management/DeliveredQuoteDetailPage")
);
const ReservationConstructionPage = React.lazy(() =>
  import("./pages/quotation-management/ReservationConstructionPage")
);
const ConstructionCompletedPage = React.lazy(() =>
  import("./pages/quotation-management/ConstructionCompletedPage")
);
const CompanyPoint = React.lazy(() =>
  import("./pages/company/CompanyPointPage")
);
const PointPackages = React.lazy(() =>
  import("./components/pages/company/PointPackages")
);
//END COMPANY

const ChatPage = React.lazy(() => import("./pages/ChatPage"));

const routes = [
  {
    path: MAIN_PAGE_ROUTE,
    exact: true,
    component: MainPage,
    menu: {
      name: Localizations.BottomBar.Home,
      isRoot: true,
      optionalItem: <OptItemNotification />,
    },
  },
  {
    path: SNS_NAVER_LOGIN_CALLBACK_ROUTE,
    exact: true,
    component: NaverLoginPageCallback,
    menu: { name: "" },
  },
  {
    path: SNS_KAKAO_LOGIN_CALLBACK_ROUTE,
    exact: true,
    component: KakaoLoginPageCallback,
    menu: { name: "" },
  },
  //product info
  {
    path: PRODUCT_INFO_PAGE_ROUTE.CATEGORY,
    exact: true,
    component: ProductInfoPage,
    menu: {
      name: Localizations.BottomBar.Home,
      isRoot: true,
      optionalItem: <OptItemNotification />,
    },
  },
  {
    path: PRODUCT_INFO_PAGE_ROUTE.BRAND,
    exact: true,
    component: BrandListPage,
    menu: { name: "" },
  },
  {
    path: PRODUCT_INFO_PAGE_ROUTE.BRAND_DETAIL,
    exact: true,
    component: BrandDetailPage,
    menu: { name: "" },
  },
  {
    path: TERMS_AND_CONDITIONS_ROUTE,
    exact: true,
    component: TermsAndConditionsPage,
    menu: { name: "" },
  },
  {
    path: IDENTITY_VERIFICATION_ROUTE,
    exact: true,
    component: IdentityVerificationPage,
    menu: { name: Localizations.IdentityVerification.PageTitle },
  },
  { path: SPLASH_ROUTE, exact: true, component: SplashPage },
  { path: PERMISSION_ROUTE, exact: true, component: PermissionsPage },
  { path: SNS_LOGIN_ROUTE, exact: true, component: LoginPage },
  {
    path: NOTICE_ROUTE,
    exact: true,
    component: NoticePage,
    menu: { name: Localizations.Notice.PageTitle },
  },
  {
    path: QUOTE_REQUEST_START_ROUTE,
    menu: { name: Localizations.QuoteRequest.PageTitle },
    skip: true,
  },
  { path: QUOTE_REQUEST_PART_SELECTION_ROUTE, menu: { name: "" }, skip: true },
  { path: QUOTE_REQUEST_CREATE_ROUTE, menu: { name: "" }, skip: true },
  {
    path: QUOTE_REQUEST_ROUTE,
    exact: false,
    component: QuoteRequestPage,
    menu: { name: "" },
  },
  {
    path: CAR_REGISTER_ROUTE,
    exact: true,
    component: CarRegisterPage,
    menu: { name: "" },
  },

  //COMMON
  {
    path: CONSTRUCTION_ROUTER.CONSTRUCTION_LIST,
    exact: true,
    component: ConstructionExampleListPage,
    menu: { name: "시공 사례" },
  },
  {
    path: CONSTRUCTION_ROUTER.CONSTRUCTION_DETAIL,
    exact: true,
    component: ConstructionExampleDetailPage,
    menu: {
      name: "시공 사례 상세",
      optionalItem: <ConstructionEditHeaderIcon />,
    },
  },
  {
    path: CONSTRUCTION_ROUTER.CONSTRUCTION_REGISTER,
    exact: true,
    component: ConstructionExampleRegisterPage,
    menu: {
      name: "시공 사례 등록",
      optionalItem: <ConstructionRegisterHeaderIcon />,
    },
  },
  {
    path: CONSTRUCTION_ROUTER.CONSTRUCTION_EDIT,
    exact: true,
    component: ConstructionExampleEditPage,
    menu: {
      name: "시공 사례 상세",
      optionalItem: <ConstructionRegisterHeaderIcon />,
    },
  },
  //COMMON

  //screen 45 -> 55 : USAGE HISTORY
  {
    path: USAGE_HISTORY_ROUTER.LIST,
    exact: true,
    component: UsageHistoryListPage,
    menu: { name: Localizations.BottomBar.UsageHistory },
  },
  {
    path: USAGE_HISTORY_ROUTER.DETAIL,
    exact: true,
    component: UsageRequestQuoteDetailPage,
    menu: { name: "요청 견적 상세" },
  },
  {
    path: USAGE_HISTORY_ROUTER.DETAIL_RECEIVED_QUOTE,
    exact: true,
    component: ReceivedQuotePage,
    menu: { name: "견적서 목록" },
  },
  {
    path: USAGE_HISTORY_ROUTER.QUOTATION_DETAIL,
    exact: true,
    component: QuotationDetailPage,
    menu: { name: "견적서 상세", optionalItem: <QuotationHeaderIcon /> },
  },
  {
    path: USAGE_HISTORY_ROUTER.REGISTER_REVIEW,
    exact: true,
    component: RegisterReviewPage,
    menu: { name: "후기 등록" },
  },
  {
    path: USAGE_HISTORY_ROUTER.EDIT_REVIEW,
    exact: true,
    component: RegisterReviewPage,
    menu: { name: "후기 등록" },
  },
  {
    path: USAGE_HISTORY_ROUTER.COMPANY_INFO,
    exact: true,
    component: CompanyInforPage,
    menu: { name: "업체 정보" },
  },
  {
    path: USAGE_HISTORY_ROUTER.LIST_REVIEW,
    exact: true,
    component: ListReviews,
    menu: { name: "후기" },
  },
  {
    path: USAGE_HISTORY_ROUTER.RESERVATION_APPLICATION,
    exact: true,
    component: ReservationApplicationPage,
    menu: { name: "예약 신청" },
  },
  {
    path: USAGE_HISTORY_ROUTER.RESERVATION_HISTORY,
    exact: true,
    component: ReservationHistoryPage,
    menu: { name: "예약 내역" },
  },
  //screen 45 -> 55 screen end

  //screen 57 -> 64 : MY PAGE

  {
    path: MY_PAGE,
    exact: true,
    component: MyPage,
    menu: { name: Localizations.BottomBar.MyPage, isRoot: true },
  },

  {
    path: MY_PAGE_NOTIFICATION,
    exact: true,
    component: NotificationPage,
    menu: { name: Localizations.Notification.PageTitle },
  },
  {
    path: MY_PAGE_FAQ,
    exact: true,
    component: FAQPage,
    menu: { name: Localizations.FAQ.PageTitle },
  },
  {
    path: MY_PAGE_SETTING,
    exact: true,
    component: SettingPage,
    menu: { name: Localizations.MyPageSetting.PageTitle },
  },

  {
    path: MY_PAGE_ACCOUNT_SETTING,
    exact: true,
    component: AccountSettingPage,
    menu: { name: Localizations.MyPageAccountSetting.PageTitle },
  },
  {
    path: MY_PAGE_NOTICE_SETTING,
    exact: true,
    component: NoticeSettingPage,
    menu: { name: Localizations.MyPageNoticeSetting.PageTitle },
  },
  {
    path: MY_PAGE_TERM,
    exact: true,
    component: TermPage,
    menu: { name: Localizations.MyPageTerm.PageTitle },
  },
  {
    path: MY_PAGE_PRIVACY_POLICY,
    exact: true,
    component: PrivacyPolicyPage,
    menu: { name: Localizations.MyPagePrivacyPolicy.PageTitle },
  },

  //company
  {
    path: COMPANY.REGISTER,
    exact: true,
    component: CompanyRegistration,
    menu: { name: Localizations.Company.Register },
  },
  {
    path: COMPANY.REGISTER_HISTORY,
    exact: true,
    component: CompanyApplicationHistoryPage,
    menu: { name: "업체 등록 신청 내역" },
  },
  {
    path: COMPANY.MANAGEMENT,
    exact: true,
    component: CompanyManagementPage,
    menu: { name: Localizations.Company.management },
  },
  {
    path: COMPANY.QUOTATION_MANAGEMENT,
    exact: true,
    component: CompanyQuotePage,
    menu: { name: Localizations.Company.quotation_management },
  },
  {
    path: COMPANY.REQUESTED_QUOTES,
    exact: true,
    component: RequestQuotesPage,
    menu: { name: Localizations.Company.requested_quotes },
  },
  {
    path: COMPANY.COMPANY_POINT,
    exact: true,
    component: CompanyPoint,
    menu: { name: "포인트&업체 이용 안내" },
  },
  {
    path: COMPANY.POINT_PURCHASE,
    exact: true,
    component: PointPackages,
    menu: { name: "포인트 구매", optionalItem: <PointPurchaseHeaderIcon /> },
  },

  //Quotation-management
  {
    path: COMPANY.REQUESTED_QUOTE_DETAIL,
    exact: true,
    component: RequestQuoteDetailPage,
    menu: { name: Localizations.Company.requested_quotes_detail },
  },
  {
    path: COMPANY.CREATE_QUOTE,
    exact: true,
    component: CreateQuotePage,
    menu: { name: "견적서 작성" },
  },
  {
    path: COMPANY.DELIVERED_QUOTE,
    exact: true,
    component: DeliveredQuotesPage,
    menu: { name: "전달한 견적서" },
  },
  {
    path: COMPANY.DELIVERED_QUOTE_DETAIL,
    exact: true,
    component: DeliveredQuoteDetailPage,
    menu: { name: "전달 견적 상세" },
  },
  {
    path: COMPANY.RESERVATION_CONSTRUCTION,
    exact: true,
    component: ReservationConstructionPage,
    menu: { name: "예약&시공 관리" },
  },
  {
    path: COMPANY.CONSTRUCTION_COMPLETED,
    exact: true,
    component: ConstructionCompletedPage,
    menu: { name: "시공 완료" },
  },
  //End Quotation-management

  {
    path: COMPANY.COMPANY_INFOR,
    exact: true,
    component: CompanyInforPage,
    menu: { name: "업체 정보", optionalItem: <CompanyInfoHeader /> },
  },
  {
    path: COMPANY.COMPANY_INFOR_EDIT,
    exact: true,
    component: CompanyInforEdit,
    menu: { name: "업체 정보 수정" },
  },

  {
    path: COMPANY.SALE_MANAGEMENT,
    exact: true,
    component: CompanySaleManagement,
    menu: { name: Localizations.Company.sale_management },
  },
  {
    path: COMPANY.NOTIFICATION,
    exact: true,
    component: CompanyNotification,
    menu: { name: Localizations.Company.notification },
  },

  //end company

  //chatting
  { path: CHATTING, exact: true, component: ChatPage, menu: { name: "" } },
];

export function getMenuInfoByPath(path) {
  for (var i = 0; i < routes.length; i++) {
    if (routes[i].path === path) {
      return routes[i].menu;
    }
  }

  return undefined;
}

export default routes;
