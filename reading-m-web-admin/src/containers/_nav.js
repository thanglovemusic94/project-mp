// import React from 'react'
// import CIcon from '@coreui/icons-react'

const _nav = [
    /* Main nav item
  ----------------------------------- */
    {
        _tag: 'CSidebarNavDropdown',
        name: '메인 관리', // Main management
        route: '/main',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: '메인 배너 리스트', // Main banner list
                to: '/main/banners',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '동영상 등록', // Video registration
                to: '/main/video',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '매거진 리스트', // Magazine list
                to: '/main/magazines',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '공지사항 리스트', // Notice list
                to: '/main/notices',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '메인 팝업 등록', // Main popup registration
                to: '/main/popup',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '이벤트 배너 등록', // Event banner registration
                to: '/main/event',
            },
        ],
    },
    /* Class nav item
  ----------------------------------- */
    {
        _tag: 'CSidebarNavDropdown',
        name: '수업 관리', // Class management
        route: '/class',
        // icon: 'cil-cursor',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'LiveClass 수업 리스트', // LiveClass class
                to: '/class/liveclass-class',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'LiveClass 책글 주차 수정 리스트', // LiveClass Book
                to: '/class/liveclass-book',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '과학수학 다빈치 리스트', // Davinci Math
                to: '/class/davinci-maths',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '다빈치 로그 리스트', // Davinci list
                to: '/class/davinci-log-list',
            },
        ],
    },
    /* Book nav item
  ----------------------------------- */
    {
        _tag: 'CSidebarNavDropdown',
        name: '도서 관리', // Book management
        route: '/book',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: '도서 구매하기 등록', // Purchasing Book
                to: '/book/purchasing-book',
            },
        ],
    },

    /* Payment nav item
  ----------------------------------- */
    {
        _tag: 'CSidebarNavDropdown',
        name: '결제 관리', // Payment management
        route: '/payment',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: '결제 리스트', // Payment List
                to: '/payment/payment-list',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '환불 리스트', // Refund List
                to: '/payment/refund-list',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '현금 신청 리스트', // Cash List
                to: '/payment/cash-list',
            },
        ],
    },

    /* Member nav item
  ----------------------------------- */
    {
        _tag: 'CSidebarNavDropdown',
        name: '회원 관리', // Member management
        route: '/member',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: '회원 리스트', // Member List
                to: '/member/member-list',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '탈퇴 리스트', // withdrawal List
                to: '/member/withdrawal',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '쿠폰 리스트', // coupon List
                to: '/member/coupon-list',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '포인트 리스트', // point List
                to: '/member/point-list',
            },
        ],
    },

    /* Tutor nav item
  ----------------------------------- */
    {
        _tag: 'CSidebarNavDropdown',
        name: '지도교사 지원하기 관리', // Tutor management
        route: '/tutor',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: '지도교사 지원 리스트', // Tutor List
                to: '/tutor/tutor-register-list',
            },
        ],
    },

    /* Notice nav item
  ----------------------------------- */
    {
        _tag: 'CSidebarNavDropdown',
        name: '게시판 관리', // Notice management
        route: '/notice',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: '자주 묻는 질문 리스트', // FAQ List
                to: '/notice/faq-list',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '1:1 문의 리스트', // Inquiry List
                to: '/notice/inquiry-list',
            },
            {
                _tag: 'CSidebarNavItem',
                name: '후기 리스트', // Review List
                to: '/notice/review-list',
            },
        ],
    },

    /* Settlement nav item
  ----------------------------------- */
    {
        _tag: 'CSidebarNavDropdown',
        name: '정산 관리', // Settlement management
        route: '/settlement',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: '지도교사 정산 리스트', // FAQ List
                to: '/settlement/tutor-settled',
            },
        ],
    },
]

export default _nav
