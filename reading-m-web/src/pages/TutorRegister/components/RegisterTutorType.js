import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'

const RegisterTutorType = ({onFinish}) => {
    const [selectLiveClassBookType, chooseLiveClassBookType] = useState(false)
    const [selectLiveClassGoalType, chooseLiveClassGoalType] = useState(false)

    const liveClassBookClassName = selectLiveClassBookType ? "tutortype-box tutortype-book type-selected" : "tutortype-box tutortype-book"
    const liveClassGoalClassName = selectLiveClassGoalType ? "tutortype-box tutortype-goal type-selected" : "tutortype-box tutortype-goal"

    const showError = selectLiveClassBookType === false && selectLiveClassGoalType === false
    const [tutorType, setTutorType] = useState("")

    const checkTutorType = () => {
        if (selectLiveClassBookType && selectLiveClassGoalType) {
            return setTutorType("ALL")
        }
        if (selectLiveClassBookType) {
            return setTutorType("LIVE_BOOK_TEXT")
        }
        if (selectLiveClassGoalType) {
            return setTutorType("LIVE_GOAL")
        }
        if (!selectLiveClassBookType && !selectLiveClassGoalType)
            return setTutorType("")
    }

    useEffect(() => {
        checkTutorType()
    }, [selectLiveClassBookType, selectLiveClassGoalType])

    function handleFinish() {
        if (selectLiveClassBookType === true || selectLiveClassGoalType == true) {
            onFinish({
                "type":tutorType,
                "bookClassInfo": selectLiveClassBookType,
                "goalClassInfo": selectLiveClassGoalType
            })
        }
    }

    return (
        <>
            <div className="registerselfintro-section">

                <div className="box-w790">
                    <div className="box-title text-center">
                        <h3>지원 유형 선택</h3>
                        <p>* 두가지 유형 모두 지원이 가능합니다.</p>
                    </div>
                    <div className="tutortype-section d-lg-flex justify-content-between">
                        <div className={liveClassBookClassName}
                             onClick={() => {
                                 chooseLiveClassBookType(!selectLiveClassBookType)

                             }}>
                            <div className="tutortype-box__header">
                                <i className="icon-tick"></i>
                                LiveClass 책글 지도교사
                            </div>
                            <div className="tutortype-box__body">
                                <div className="tutortype-box__icon text-center d-none d-lg-block">
                                    <i className="lcicon-tutorbook"></i>
                                </div>
                                <div className="tutortype-box__content">
                                    <ul>
                                        <li>LiveClass 책글 커리큘럼으로 수업</li>
                                        <li>LiveClass 독서, 글쓰기 지도 수업</li>
                                        <li>플랫폼의 모든 기능 활용</li>
                                        <li>선호 학년, 시간을 선택하여 지원, 논의 후 배치</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={liveClassGoalClassName}
                             onClick={() => chooseLiveClassGoalType(!selectLiveClassGoalType)}>
                            <div className="tutortype-box__header">
                                <i className="icon-tick"></i>
                                LiveClass 책글 지도교사
                            </div>
                            <div className="tutortype-box__body">
                                <div className="tutortype-box__icon text-center d-none d-lg-block">
                                    <i className="lcicon-tutorgoal"></i>
                                </div>
                                <div className="tutortype-box__content">
                                    <ul>
                                        <li>자신만의 커리큘럼으로 수업</li>
                                        <li>강좌와 관련된 플랫폼 기능 활용</li>
                                        <li>LiveClass 목적 수업 개설 가능</li>
                                        <li>
                                            콘텐츠의 저작권은 교사에게, 수익은 플랫폼과분배하는 구조
                                        </li>
                                        <li>자유로운 시간 대에 원하는 LiveClass로 수업</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-danger my-5 text-center" hidden={!showError}>
                        지원 유형을 선택해주세요.
                    </p>
                    <div className="d-flex justify-content-center mt-5">
                        <Button
                            variant="p500"
                            className="btw-386 btn-outline"
                            onClick={handleFinish}>
                            선택하기
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterTutorType
