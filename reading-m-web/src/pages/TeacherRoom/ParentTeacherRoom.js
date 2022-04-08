import ApplicationList from 'components/ApplicationList'
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Consultation from './common/Consultation'

export default function ParentTeacherRoom() {
    return (
        <div>
            <div className="parentteachroom-body">
                <h2 className="page-title mb-4">교무실</h2>
                <div className="nav-tabs-half g700">
                    <Tabs defaultActiveKey="consultation" mountOnEnter
                          unmountOnExit>
                        <Tab eventKey="consultation" title="상담하기">
                            <Consultation />
                        </Tab>
                        <Tab
                            eventKey="applicationlist"
                            title="수업 신청 리스트"
                        >
                            <ApplicationList />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
