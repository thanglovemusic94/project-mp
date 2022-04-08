import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import TutorActivityList from './Tutor/TutorActivityList'
import TutorQA from './Tutor/TutorQA'

export default function TutorActivity() {
    return (
        <>
            <div className="tutoractivity-body">
                <h2 className="page-title mb-4">내 활동</h2>

                <div className="nav-tabs-half g700">
                    <Tabs defaultActiveKey="tutoractivity" mountOnEnter unmountOnExit>
                        <Tab eventKey="tutoractivity" title="수업활동 리스트">
                            <TutorActivityList />
                        </Tab>
                        
                        <Tab eventKey="tutorqa" title="수업 Q&A">
                            <TutorQA />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
