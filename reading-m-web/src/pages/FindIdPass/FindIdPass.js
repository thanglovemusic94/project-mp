import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import FindId from './components/FindId'
import ResetPassword from './components/ResetPassword'

const FindIdPass = () => {
    return (
        <>
            <div className="findidpass-body">
                <h2 className="page-title mb-4">ID/비밀번호 찾기</h2>
                <div className="nav-tabs-half b500">
                    <Tabs defaultActiveKey="findid">
                        <Tab eventKey="findid" title="ID찾기">
                            <FindId />
                        </Tab>
                        <Tab eventKey="resetpassword" title="비밀번호 재설정">
                            <ResetPassword />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default FindIdPass
