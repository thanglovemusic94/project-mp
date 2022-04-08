import React, {useState} from 'react'
import {Nav, NavDropdown, Tab} from 'react-bootstrap'
import MyCashList from './components/MyCashList'
import MyCouponList from './components/MyCouponList'
import MyPaymentList from './components/MyPaymentList'
import MyPointList from './components/MyPointList'
import MyRefundList from './components/MyRefundList'
import {useLocation} from 'react-router'

export default function MyPayment() {
    let {state} = useLocation();
    const dropdown = [
        {
            key: 'mypaymentlist',
            title: '결제 리스트',
            component: <MyPaymentList />,
        },
        {
            key: 'myrefundlist',
            title: '환불 리스트',
            component: <MyRefundList />,
        },
        {
            key: 'mycouponlist',
            title: '쿠폰 리스트',
            component: <MyCouponList />,
        },
        {
            key: 'mypointlist',
            title: '포인트 리스트',
            component: <MyPointList />,
        },
        {
            key: 'mycashlist',
            title: '현금 신청 리스트',
            component: <MyCashList />,
        },
    ]
    const [title, settitle] = useState(dropdown[0].title)

    const handleChange = (value) => settitle(value)

    return (
        <>
            <div className="mypayment-body">
                <h2 className="page-title mb-4">수업 결제 내역</h2>
                <Tab.Container defaultActiveKey={state ? state.keytab : "mypaymentlist"}
                               mountOnEnter
                               unmountOnExit
                >
                    {/* On Desktop */}
                    <div className="nav-tabs-half g700 d-none d-lg-block">
                        <Nav className="nav-tabs">
                            {dropdown.map((item, i) => {
                                return (
                                    <Nav.Link eventKey={item.key} key={i}>
                                        {item.title}
                                    </Nav.Link>
                                )
                            })}
                        </Nav>
                    </div>
                    {/* On Mobile */}
                    <div className="nav-tabs-mobile g700 d-block d-lg-none mb-4">
                        <Nav>
                            <NavDropdown title={title} id="nav-dropdown">
                                {dropdown.map((item, i) => {
                                    return (
                                        <NavDropdown.Item key={i}
                                            eventKey={item.key}
                                            onClick={() =>
                                                handleChange(item.title)
                                            }
                                        >
                                            {item.title}
                                        </NavDropdown.Item>
                                    )
                                })}
                            </NavDropdown>
                        </Nav>
                    </div>
                    <div className="tab-content">
                        <Tab.Content>
                            {dropdown.map((item, i) => {
                                return (
                                    <Tab.Pane eventKey={item.key} key={i}>
                                        {item.component}
                                    </Tab.Pane>
                                )
                            })}
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </div>
        </>
    )
}
