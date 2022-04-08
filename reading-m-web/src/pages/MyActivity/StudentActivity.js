import React, { useState } from 'react'
import { Nav, NavDropdown, Tab } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import MyActivity from './common/MyActivity'
import MyFavorite from './common/MyFavorite'
import MyQA from './Student/MyQA'
import MyReview from './Student/MyReview'
import ApplicationList from 'components/ApplicationList'
import { ReviewTab } from './Student/MyReview'

export default function StudentActivity(props) {
    //Get initTab
    const initTab = props?.location?.state?.parentTabActive ||
        StudentActivityTab.MyActivity.key
    const initChildrenTab = props?.location?.state?.childrenTabActive ||
        ReviewTab.AvailableReview.eventKey
    const [tabActive, setTabActive] = useState(initTab)

    const dropdown = [
        { key: StudentActivityTab.MyActivity.key, title: StudentActivityTab.MyActivity.title, component: <MyActivity /> },
        { key: StudentActivityTab.MyQA.key, title: StudentActivityTab.MyQA.title, component: <MyQA /> },
        { key: StudentActivityTab.MyReview.key, title: StudentActivityTab.MyReview.title, component: <MyReview activeTab={initChildrenTab} /> },
        { key: StudentActivityTab.MyFavorite.key, title: StudentActivityTab.MyFavorite.title, component: <MyFavorite /> },
        { key: StudentActivityTab.ApplicationList.key, title: StudentActivityTab.ApplicationList.title, component: <ApplicationList /> },
    ]

    //Clear location.state
    const history = useHistory()
    if (history.location.state && history.location.state) {
        history.replace({ ...history.location, state: null });
    }

    const [title, settitle] = useState(dropdown[0].title)

    const handleChange = (value) => settitle(value)

    return (
        <>
            <div className="myactivity-body">
                <h2 className="page-title mb-4">내 활동</h2>
                <Tab.Container defaultActiveKey={tabActive} unmountOnExit mountOnEnter>
                    <div className="text-center mb-4">
                        {/* On Desktop */}
                        <div className="nav-tabs-radius m500 d-none d-lg-block">
                            <Nav>
                                {dropdown.map((item, index) => {
                                    return (
                                        <Nav.Item key={index}>
                                            <Nav.Link eventKey={item.key}>
                                                {item.title}
                                            </Nav.Link>
                                        </Nav.Item>
                                    )
                                })}
                            </Nav>
                        </div>
                        {/* On Mobile */}
                        <div className="nav-tabs-mobile m500 d-block d-lg-none">
                            <Nav>
                                <NavDropdown title={title} id="nav-dropdown">
                                    {dropdown.map((item, index) => {
                                        return (
                                            <NavDropdown.Item
                                                key={index}
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
                    </div>
                    <div className="tab-content">
                        <Tab.Content>
                            {dropdown.map((item, index) => {
                                return (
                                    <Tab.Pane
                                        key={index}
                                        eventKey={item.key}>
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

export const StudentActivityTab = {
    MyActivity: {
        key: 'myactivity',
        title: '내 수업활동'
    },
    MyQA: {
        key: 'myqa',
        title: '수업 Q&A'
    },
    MyReview: {
        key: 'myreview',
        title: '후기'
    },
    MyFavorite: {
        key: 'myfavorite',
        title: '찜한 수업'
    },
    ApplicationList: {
        key: 'applicationlist',
        title: '수업 신청 리스트'
    }
}