import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import TutorOpenClassBook from './Tutor/TutorOpenClassBook'
import TutorOpenClassGoal from './Tutor/TutorOpenClassGoal'
import TutorClassBook from './Tutor/TutorClassBook'
import TutorClassBookDetails from './Tutor/TutorClassBookDetails'
import TutorClassGoal from './Tutor/TutorClassGoal'
import TutorClassGoalDetails from './Tutor/TutorClassGoalDetails'
import TutorClassBookEdit from './Tutor/TutorClassBookEdit'
import TutorWeekSort from './Tutor/TutorWeekSort'
import TutorClassGoalEdit from './Tutor/TutorClassGoalEdit'
import { ClassType } from 'constants/class.constants'

export default function TutorClass() {
    return (
        <>
            <div className="myclass-body">
                <h2 className="page-title mb-4">내 수업</h2>
                <div className="nav-tabs-half g700">
                    <Tabs defaultActiveKey="tutorclassbook">
                        <Tab eventKey="tutorclassbook" title="LiveClass 책글">
                            <TutorClassBook type={ ClassType.TextBookClass.value } />
                            {/* <TutorOpenClassBook />  */}
                            {/* <TutorClassBookDetails /> */}
                            {/* <TutorClassBookEdit /> */}
                            {/* <TutorWeekSort /> */}
                        </Tab>
                        <Tab eventKey="tutorclassgoal" title="LiveClass 목적">
                            <TutorClassBook type={ ClassType.GoalClass.value } />
                            {/* <TutorOpenClassGoal /> */}
                            {/* <TutorClassGoalDetails /> */}
                            {/* <TutorClassGoalEdit /> */}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
