import React from 'react'

const Main = React.lazy(() => import('./pages/Main/Main'))
const Login = React.lazy(() => import('./pages/Login/Login'))
const Terms = React.lazy(() => import('./pages/TermConditions/TermConditions'))
const Register = React.lazy(() => import('./pages/Register/Register'))
const FindIdPass = React.lazy(() => import('./pages/FindIdPass/FindIdPass'))
const NoticeList = React.lazy(() => import('./pages/NoticeList/NoticeList'))
const NoticeDetails = React.lazy(() =>
    import('./pages/NoticeDetails/NoticeDetails')
)
const LiveclassPlatform = React.lazy(() =>
    import('./pages/LiveclassPlatform/LiveclassPlatform')
)
const ReadingmEvent = React.lazy(() =>
    import('./pages/ReadingmEvent/ReadingmEvent')
)
const TutorProcess = React.lazy(() =>
    import('./pages/TutorProcess/TutorProcess')
)
const LiveclassGuide = React.lazy(() =>
    import('./pages/LiveclassGuide/LiveclassGuide')
)
const MagazineList = React.lazy(() =>
    import('./pages/MagazineList/MagazineList')
)
const MagazineDetails = React.lazy(() =>
    import('./pages/MagazineDetails/MagazineDetails')
)
const LiveclassBook = React.lazy(() =>
    import('./pages/LiveclassBook/LiveclassBook')
)
const LiveclassDetails = React.lazy(() =>
    import('./pages/LiveclassDetails/LiveclassDetails')
)
const LiveclassGoal = React.lazy(() =>
    import('./pages/LiveclassGoal/LiveclassGoal')
)
const WriteQA = React.lazy(() => import('./pages/WriteQA/WriteQA'))
const WriteReview = React.lazy(() => import('./pages/WriteReview/WriteReview'))
const WriteInquiry = React.lazy(() =>
    import('./pages/WriteInquiry/WriteInquiry')
)
const WriteConsult = React.lazy(() =>
    import('./pages/WriteConsult/WriteConsult')
)
const TeacherRoom = React.lazy(() => import('./pages/TeacherRoom/TeacherRoom'))

const Payment = React.lazy(() => import('./pages/Payment/Payment'))
const PaymentComplete = React.lazy(() =>
    import('./pages/Payment/components/PaymentComplete')
)
const MathDavinci = React.lazy(() => import('./pages/MathDavinci/MathDavinci'))
const MathdavinciDetails = React.lazy(() =>
    import('./pages/MathdavinciDetails/MathdavinciDetails')
)
const BookCalendar = React.lazy(() =>
    import('./pages/BookCalendar/BookCalendar')
)
const TutorApply = React.lazy(() => import('./pages/TutorApply/TutorApply'))
const TutorTerms = React.lazy(() => import('./pages/TutorTerms/TutorTerms'))
const TutorRegister = React.lazy(() =>
    import('./pages/TutorRegister/TutorRegister')
)
const TutorRegisBook = React.lazy(() =>
    import('./pages/TutorRegisBook/TutorRegisBook')
)
const TutorRegisGoal = React.lazy(() =>
    import('./pages/TutorRegisGoal/TutorRegisGoal')
)

const MyProfile = React.lazy(() => import('./pages/MyProfile/MyProfile'))
const WithDraw = React.lazy(() => import('./pages/MyProfile/common/WithDraw'))
const ProfileEdit = React.lazy(() => import('./pages/MyProfile/ProfileEdit'))
const ParentAddChildren = React.lazy(() =>
    import('./pages/MyProfile/Parent/ParentAddChild')
)

const MyClass = React.lazy(() => import('./pages/MyClass/MyClass'))
const MyClassBookDetails = React.lazy(() =>
    import('./pages/MyClass/common/MyClassBookDetails')
)
const MyClassGoalDetails = React.lazy(() =>
    import('./pages/MyClass/common/MyClassGoalDetails')
)
const MyMathDavinciDetails = React.lazy(() =>
    import('./pages/MyClass/common/MyMathDavinciDetails')
)
const ClassActivity = React.lazy(() =>
    import('./pages/MyClass/common/ClassActivity')
)

const Newspaper = React.lazy(() => import('./pages/MyClass/common/Newspaper'))
const TutorClass = React.lazy(() => import('./pages/MyClass/TutorClass'))
const TutorWeekSort = React.lazy(() =>
    import('./pages/MyClass/Tutor/TutorWeekSort')
)
const TutorClassBookDetails = React.lazy(() =>
    import('./pages/MyClass/Tutor/TutorClassBookDetails')
)
const TutorOpenClassBook = React.lazy(() =>
    import('pages/MyClass/Tutor/TutorOpenClassBook')
)
const TutorClassActivity = React.lazy(() =>
    import('./pages/MyClass/Tutor/TutorActivity')
)
const MyBookCalendar = React.lazy(() =>
    import('./pages/MyBookCalendar/MyBookCalendar')
)
const StudentActivity = React.lazy(() =>
    import('./pages/MyActivity/StudentActivity')
)
const ParentActivity = React.lazy(() =>
    import('./pages/MyActivity/ParentActivity')
)
const TutorActivity = React.lazy(() =>
    import('./pages/MyActivity/TutorActivity')
)
const MyInquiry = React.lazy(() => import('./pages/MyInquiry/MyInquiry'))

const MyPayment = React.lazy(() => import('./pages/MyPayment/MyPayment'))
const PaymentDetails = React.lazy(() =>
    import('./pages/MyPayment/MyPaymentDetails')
)
const PaymentRefund = React.lazy(() =>
    import('./pages/MyPayment/MyPaymentRefund')
)

const CashRegister = React.lazy(() =>
    import('./pages/MyPayment/components/CashRegister')
)

const RefundDetails = React.lazy(() =>
    import('./pages/MyPayment/MyRefundDetails')
)
const Settlement = React.lazy(() => import('./pages/Settlement/Settlement'))
const FrequentlyQA = React.lazy(() =>
    import('./pages/FrequentlyQA/FrequentlyQA')
)
const PrivacyPolicy = React.lazy(() =>
    import('./pages/PrivacyPolicy/PrivacyPolicy')
)
const Directions = React.lazy(() => import('./pages/Directions/Directions'))

const Elements = React.lazy(() => import('./pages/Elements/Elements'))

const RoadSearchPopup = React.lazy(() =>
    import('./components/common/RoadSearchPopup')
)

const routes = [
    { path: '/', exact: true, component: Main },
    { path: '/login', exact: false, component: Login },
    { path: '/terms', exact: false, component: Terms },
    { path: '/register', exact: false, component: Register },
    { path: '/findidpass', exact: false, component: FindIdPass },
    { path: '/notice-list', exact: false, component: NoticeList },
    { path: '/notice-details/:id', exact: false, component: NoticeDetails },
    {
        path: '/mathdavinci-details/:id',
        exact: false,
        component: MathdavinciDetails,
    },
    { path: '/liveclass-platform', exact: false, component: LiveclassPlatform },
    { path: '/readingm-event', exact: false, component: ReadingmEvent },
    { path: '/tutor-process', exact: false, component: TutorProcess },
    { path: '/liveclass-guide', exact: false, component: LiveclassGuide },
    { path: '/magazine-list', exact: false, component: MagazineList },
    { path: '/magazine-details/:id', exact: false, component: MagazineDetails },
    { path: '/liveclass-book', exact: false, component: LiveclassBook },
    {
        path: '/liveclass-details',
        exact: false,
        component: LiveclassDetails,
    },
    { path: '/payment', exact: false, component: Payment },
    {
        path: '/paymentComplete/:status',
        exact: false,
        component: PaymentComplete,
    },
    { path: '/math-davinci', exact: false, component: MathDavinci },
    { path: '/liveclass-goal', exact: false, component: LiveclassGoal },
    { path: '/write-qa', exact: false, component: WriteQA },
    { path: '/write-review', exact: false, component: WriteReview },
    { path: '/write-inquiry', exact: false, component: WriteInquiry ,  authURL: true},
    { path: '/write-consult', exact: true, component: WriteConsult },
    { path: '/book-calendar', exact: false, component: BookCalendar },
    { path: '/tutor-apply', exact: false, component: TutorApply },
    { path: '/tutor-terms', exact: false, component: TutorTerms },
    { path: '/tutor-register', exact: false, component: TutorRegister },
    { path: '/tutor-register-book', exact: false, component: TutorRegisBook },
    { path: '/tutor-register-goal', exact: false, component: TutorRegisGoal },

    { path: '/my-profile', exact: true, component: MyProfile },
    { path: '/my-profile/withdrawal', component: WithDraw },
    { path: '/my-profile/edit', component: ProfileEdit },
    { path: '/my-profile/add-children', component: ParentAddChildren },

    { path: '/my-class', exact: true, component: MyClass },
    {
        path: '/my-class/book-detail',
        exact: false,
        component: MyClassBookDetails,
    },
    {
        path: '/my-class/goal-detail',
        exact: false,
        component: MyClassGoalDetails,
    },
    {
        path: '/my-class/davinci-detail',
        exact: false,
        component: MyMathDavinciDetails,
    },
    {
        path: '/my-class/class-activity',
        exact: false,
        component: ClassActivity,
    },

    {path: '/my-class/newspaper', exact: true, component: Newspaper},
    { path: '/tutor/my-class', exact: true, component: TutorClass },

    { path: '/tutor/my-class/week-sort', component: TutorWeekSort },
    { path: '/tutor/my-class/edit', component: TutorOpenClassBook },
    { path: '/tutor/my-class-activity', component: TutorClassActivity },
    { path: '/tutor/my-class/details', component: TutorClassBookDetails },
    { path: '/tutor/my-class/open', component: TutorOpenClassBook },
    { path: '/my-book-calendar', exact: false, component: MyBookCalendar },
    {
        path: '/student/my-activity',
        exact: false,
        component: StudentActivity,
    },
    {
        path: '/parent/my-activity',
        exact: false,
        component: ParentActivity,
    },
    {
        path: '/tutor/my-activity',
        exact: false,
        component: TutorActivity,
    },
    { path: '/my-inquiry', exact: false, component: MyInquiry,  authURL: true },
    { path: '/teacher-room', exact: true, component: TeacherRoom },

    { path: '/my-payment', exact: true, component: MyPayment },
    {
        path: '/my-payment/details/:id',
        exact: false,
        component: PaymentDetails,
    },
    {
        path: '/my-payment/payment-refund',
        exact: false,
        component: PaymentRefund,
    },
    {
        path: '/my-payment/cash-application',
        exact: false,
        component: CashRegister,
    },

    { path: '/refund-details/:id', exact: false, component: RefundDetails },
    { path: '/settlement', exact: false, component: Settlement },
    { path: '/frequently-qa', exact: false, component: FrequentlyQA },
    { path: '/privacy-policy', exact: false, component: PrivacyPolicy },
    { path: '/directions', exact: false, component: Directions },

    { path: '/elements', exact: false, component: Elements },

    { path: '/roadPopup', exact: true, component: RoadSearchPopup },
]

export default routes
