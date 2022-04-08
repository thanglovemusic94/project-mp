const BottomBar = {
    Home: "홈",
    ProductInformation: "상품 정보",
    UsageHistory: "이용내역",
    MyPage: "마이페이지",
};

const Splash = {
    Description: "차에 옷을 입히다",
};

const Common = {
  AppName: "차옷",
  Confirm: "확인",
  Cancel: "취소",
  Close: "닫기",
  Allow: "허용",
  NotAllow: "허용 안 함",
  TermOfUse: "이용약관",
  PrivacyPolicy: "개인정보처리방침",
  BusinessInformation: "사업자정보",
  CheckBusinessInfo: "사업자 정보확인",
  CEO: "대표이사",
  PIManager: "개인정보책임자",
  RegistrationNumber: "사업자 등록 번호",
  Address: "주소",
  RepresentativeNumber: "대표번호",
  Email: "이메일",
  Disclaimers:
    "차옷은 통신판매 중개자로서 개인 간 거래에 대한 책임을 지지 않습니다.",
  Required: "필수",
  Optional: "선택",
  Completed: "완료",
  SeeMore: "더보기",
  RequestQuote: "견적 요청",
  BrandSite: "사이트 이동",
  NoResultFound: "검색 결과가 없습니다.",
  Next: "다음",
  Select: "선택",
  SelectConstructionArea: "시공 지역 선택",
  All: "전체",
  FirstRow: "1열",
  SecondRow: "2열",
  ThirdRow: "3열",
  Search: "수색",
  SearchResult: "검색 결과",
  Domestic: "국산",
  Foreign: "외제",
  CarClothEmail: "차옷@차옷.com​",
  AM: 'AM',
  PM: 'PM'
};

const Postfix = {
    DaysAgo: "일 전",
};

const Permission = {
    Title1: "서비스 이용을 위한",
    Title2: "앱 접근권한 안내",
    Description1: "차옷을 사용하기 위해 아래의",
    Description2: "선택적 접근 권한을 이용하고 있습니다.",
    CameraAccessTitle: "카메라/저장공간 (선택)",
    CameraAccessDescription:
        "견적요청, 시공사례 등록, 채팅 사진 전송을 위한 활용",
    LocationAccessTitle: "위치 (선택)",
    LocationAccessDescription: "위치기반 견적서비스를 위한 활용",
    Notice1:
        "해당 기능 이용 시 동의를 받고 있으며, 허용하지 않아도 서비스 이용이 가능합니다.",
    Notice2: "권한이 거부될 경우 기능이 정상적으로 작동하지 않을 수 있습니다.",
};

const Login = {
    Welcome1: (
        <>
            <b>내 차</b>에
        </>
    ),
    Welcome2: (
        <>
            <b>옷</b>을 입히다!
        </>
    ),
    SNSLoginWelcome: "SNS 계정으로 회원가입/로그인",
};

const TermsAndConditions = {
    Title: "회원가입 이용약관",
    AcceptAll: "전체 약관 동의",
    TermsOfService: "서비스 이용약관",
    PrivacyPolicy: "개인정보 처리방침",
    OverAgeOf14: "만 14세 이상",
    LocationInformation: "위치 정보 서비스 이용약관",
    ThirdPartyInformation: "제 3자 정보제공",
    ReceiveNotification: "이벤트 / 혜택 알림 수신",
};

const IdentityVerification = {
    PageTitle: "본인인증",
    ValidationTime: "60초",
    ValidationTimeNoticeP1: "면 끝나는",
    ValidationTimeNoticeP2: "휴대폰 본인 인증하기!",
    ValidationSuggestionP1: "안전한 서비스 이용을 위해",
    ValidationSuggestionP2: "본인인증을 진행해주세요!",
    ValidationResultP1: "휴대폰 본인인증",
    ValidationCongrats: "본인인증을 완료했습니다!",
    ValidationStartButton: "본인 인증하기",
    GettingStartedButton: "차옷 시작하기",
    DuplicatedPhoneNumber1: "해당 번호로 이미 본인인증 된 계정이 있습니다.고객센터로 문의해주시기바랍니다.​",
    DuplicatedPhoneNumber2: "고객센터로 문의해주시기바랍니다.​",
};

const Main = {
    CarclothRecommendedItemTitle: "차옷의 추천 상품",
    ConstructionExampleTitle: "시공 사례",
    ExistedCarInfoWillBeDeteled: "기존 차 정보는 삭제됩니다.​",
    WouldYouLikeToRegisterNewCarInfo: "새로운 차 정보를 등록 하시겠습니까?​"
};

const Notice = {
    PageTitle: "알림",
    DeleteOnExpired: "최대 30일 동안만 보관되며, 이후 자동 삭제됩니다.",
    NoResult: "알림 내역이 없습니다."
};

const QuoteRequest = {
    PageTitle: "견적 요청",
    PleaseSelectDesiredConstruction: "원하는 시공을 선택해 주세요.",
    PleaseSelectDesiredConstructionPart: "원하는 시공을 부위를 선택해 주세요.",
    PleaseSelectDesiredConstructionDate: "원하는 시공 날짜를 선택해 주세요.",
    PleaseSelectDesiredConstructionArea: "원하는 시공 지역을 선택해 주세요.",
    PleaseSelectWithOrWithoutInsurance: "보험 유/무를 선택해 주세요.",
    InsuranceCase: "보험건",
    Uninsurance: "비보험건",
    PleaseEnterAnyOtherRequests: "기타 요청사항을 입력해 주세요.",
    PleaseEnterYourRequestInDetails: "요청사항을 상세하게 입력해 주세요.",
    PleaseAttachAtleastOnePhoto:
        "더 빠르고 정확한 견적을 위해 사진을 1장 이상 첨부해 주세요.",
    RequestQuote: "견적 요청하기",
    PleaseSelectConstructionType: "시공 유형을 선택 해주세요.",
    PleaseSelectConstructionArea: "시공 지역을 선택해주세요.",
    PleaseSelectConstructionParts: "시공 부위를 선택 해주세요.",
    YourQuoteRequestIsComplete: "견적 요청이 완료되었습니다!",
    YouCanCheckProgressInUsageHistorySection:
        "'이용 내역' 메뉴에서 진행상황을 확인할 수 있습니다.",
    MoreRequestLengthExceed: "요청사항은 300자까지 입력 가능합니다.",
    ImageAttachmentRequired: "이미지를 1장 이상 첨부해주세요",
    MaximumImageAttachmentsExceeded: "이미지는 최대 4장 까지 첨부할 수 있습니다.",
};

const CarPartNames = {
    AllExterior: "외관전체",
    Bonnet: "본넷",
    FrontBumper: "앞범퍼",
    FrontFenderLeft: "앞펜더 (운)",
    FrontFenderRight: "앞펜더 (조)",
    FrontDoorLeft: "앞문 (운)",
    FrontDoorRight: "앞문 (조)",
    BackDoorLeft: "뒷문 (운)",
    BackDoorRight: "뒷문 (조)",
    RearFenderLeft: "뒷펜더 (운)",
    RearFenderRight: "뒷펜더 (조)",
    SideSealLeft: "사이드씰 (운)",
    SideSealRight: "사이드씰 (조)",
    Loop: "루프",
    RearBumper: "뒷범퍼",
    Trunk: "트렁크",
    DoorHandle: "도어핸들",
    SideMirror: "사이드미러",
    LifeProtectionPackage: "생활보호패키지",
    FrontPackage: "프론트패키지",
    DoorEdge: "도어엣지",
    HeadLamp: "헤드램프",
    TailLamp: "테일램프",
    PPFRemoval: "PPF 제거",
    Wheels: "휠",
    WrappingRemoval: "랩핑제거",
    BBOneChannel: "1채널",
    BBTwoChannel: "2채널",
    BBFourChannel: "4채널",
    Tinting: "썬팅",
    BlackBox: "블랙박스",
    GlassCoating: "유리막 코팅",
    Polish: "광택",
    PPF: "PPF",
    LowerSoundProof: "하부방음",
    ExternalSoundProof: "외부방음",
    WindshieldSideAndBack: "측후면",
    WindshieldFront: "앞유리",
    WindshieldRear: "뒷유리",
    Sunroof: "썬루프",
    TintingRemoval: "썬팅 제거",
    Windshield: "윈드쉴드",
};

const Notification = {
    PageTitle: "공지사항",
};

const FAQ = {
    PageTitle: "자주 묻는 질문",
};

const MyPageSetting = {
    PageTitle: "설정",
};

const MyPageAccountSetting = {
    PageTitle: "계정 설정",
};
const MyPageNoticeSetting = {
    PageTitle: "알림 설정",
};
const MyPageTerm = {
    PageTitle: "이용약관",
};
const MyPagePrivacyPolicy = {
    PageTitle: "개인정보처리방침",
};

const UsageHistory = {
    //Quote Detail
    QuoteDetail: "견적서 상세",
};

const Company = {
    management: "업체 관리",
    quotation_management: "견적서 관리",
    requested_quotes: "요청 받은 견적서",
    requested_quotes_detail: "요청 받은 견적서 상세",
    RegisterApplicationHistory: "업체 등록 신청 내역",
    Register: "업체 등록 신청",
    BtnRegister: "등록",
    sale_management: "매출 관리",
    notification: "업체 공지사항",
};

const CarRegister = {
    CarModelNameSearch: "차 모델명 검색",
    CarNumberPlaceholder: "예) 12가3456",
    CarRegistionComplete: "차 등록 완료",
    MoveToMainHome: "메인 홈 이동",
    PageTitle: "내 차 등록하기",
    PleaseEnterTheSearchKeyword: "검색어를 입력해주세요.​",
    RegisterBrandSelection: "브랜드 선택 등록",
    RegisterBySearchBrandAndVehicleModel: "브랜드 & 차종 선택하여 등록하기",
    RegisterMyCarNumber: "내 차 번호 등록하기",
    SearchCarByModelName: "차 모델명으로 검색해 보세요."
};

const Camera = {
    Capture: "사진 캡처",
    Submit: "사진 제출"
};

export const Localizations = {
    BottomBar,
    Common,
    Splash,
    Permission,
    Login,
    TermsAndConditions,
    IdentityVerification,
    Main,
    Notice,
    Postfix,
    QuoteRequest,
    Notification,
    FAQ,
    CarPartNames,
    UsageHistory,
    MyPageSetting,
    MyPageAccountSetting,
    MyPageNoticeSetting,
    MyPagePrivacyPolicy,
    MyPageTerm,
    Company,
    CarRegister,
    Camera,
};
