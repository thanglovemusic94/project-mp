import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import ClassAppList from './components/ClassAppList'
import ClassGoalList from './components/ClassGoalList'

const LiveclassGoal = () => {
    
    return (
        <>
            <div className="liveclassgoal-body">
                <div className="nav-tabs-half g700">
                    <Tabs defaultActiveKey="tutorlist" mountOnEnter unmountOnExit>
                        <Tab eventKey="tutorlist" title="LiveClass 목적 리스트">
                            <ClassGoalList />
                        </Tab>
                        <Tab
                            eventKey="applist"
                            title="LiveClass 목적 신청 리스트"
                        >
                            <ClassAppList />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default LiveclassGoal
