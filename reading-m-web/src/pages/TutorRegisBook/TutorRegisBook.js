import RemovableItem from 'components/common/RemovableItem'
import CustomDropdown from 'components/CustomDropdown'
import React, { createContext, useContext, useReducer, useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { TutorService } from '../../services/TutorService'
import formatDate from '../../utils/DateUtils'
import {useDispatch} from "react-redux";
import {SHOW_ERROR_POPUP} from "../../constants/action.type.constants";
import {getUserDetails} from "../../action/user";

//#region REDUCER

const DESIRED_GRADE_ACTION = 'DESIRED_GRADE_REDUCER_ACTION'
const DESIRED_DATETIME_ACTION = 'DESIRED_DATETIME_REDUCER_ACTION'
const DESIRED_DATETIME_REMOVE_ITEM_ACTION =
    'DESIRED_DATETIME_REMOVE_ITEM_REDUCER_ACTION'

const initialState = {
    desires: [{}, {}, {}],
    desireDateTimes: [],
}

function tutorBookReducer(state, action) {
    switch (action.type) {
        case DESIRED_GRADE_ACTION:
            let desireItems = [...state.desires]
            desireItems[action.index] = {
                ...desireItems[action.index],
                ...action.data,
            }

            return { ...state, desires: [...desireItems] }

        case DESIRED_DATETIME_ACTION:
            return {
                ...state,
                desireDateTimes: [...state.desireDateTimes, action.data],
            }

        case DESIRED_DATETIME_REMOVE_ITEM_ACTION:
            let desireDatetimeItems = [...state.desireDateTimes]
            desireDatetimeItems.splice(action.index, 1)

            return { ...state, desireDateTimes: [...desireDatetimeItems] }
    }
}

//#endregion

//#region DESIRED_GRADE_FORM_ITEM COMPONENT

const SCHOOL_SELECTIONS = [
    { label: '학교 선택', value: null },
    { label: '초등학교', value: 'PRIMARY' },
    { label: '중학교', value: 'SECONDARY' },
]

const GRADE_SELECTIONS = [
    { label: '학년 선택', value: null },
    { label: '1학년', value: 'G1' },
    { label: '2학년', value: 'G2' },
    { label: '3학년', value: 'G3' },
    { label: '4학년', value: 'G4' },
    { label: '5학년', value: 'G5' },
    { label: '6학년', value: 'G6' },
    { label: '모든학년', value: 'ALL' },
]

function DesiredGradeFormItem({ source }) {
    const { validated, setData } = useContext(TutorRegisterBookContext)

    const [selectedSchool, setSelectedSchool] = useState(null)
    const [selectedGrade, setSelectedGrade] = useState(null)
    const [reason, setReason] = useState(null)

    function handleSchoolSelect(val) {
        setSelectedSchool(val)
        handleChange(val, selectedGrade, reason)
    }

    function handleGradeSelect(val) {
        setSelectedGrade(val)
        handleChange(selectedSchool, val, reason)
    }

    function handleReasonChange(val) {
        setReason(val)
        handleChange(selectedSchool, selectedGrade, val)
    }

    function handleChange(school, grade, reason) {
        let gradeVals = []

        if (grade !== null) {
            if (grade === 'ALL') {
                for (let item of GRADE_SELECTIONS) {
                    if (item.value !== 'ALL' && item.value !== null)
                        gradeVals.push(item.value)
                }
            } else {
                gradeVals.push(grade)
            }
        }

        setData({
            type: DESIRED_GRADE_ACTION,
            index: source.index,
            data: { grade: [...gradeVals], school: school, reason: reason },
        })
    }

    return (
        <>
            <Form.Group className="d-lg-flex">
                <Form.Label>
                    {source.index + 1}지망{' '}
                    <span className="text-danger">*</span>
                </Form.Label>
                <div className="form-group-half ipw-488">
                    <div className="row">
                        <div className="col-6">
                            <CustomDropdown
                                items={SCHOOL_SELECTIONS}
                                onChange={(e, k) => handleSchoolSelect(k)}
                                classNameToggle="ipw-240"
                            />
                        </div>
                        <div className="col-6">
                            <CustomDropdown
                                items={GRADE_SELECTIONS}
                                onChange={(e, k) => handleGradeSelect(k)}
                                classNameToggle="ipw-240"
                            />
                        </div>
                    </div>
                    {validated === true &&
                        (selectedSchool === null || selectedGrade === null) && (
                            <Form.Control.Feedback type={"invalid"} className={'d-block'}>
                            학교 및 학년을 선택해주세요.
                            </Form.Control.Feedback>
                        )}
                </div>
            </Form.Group>
            <Form.Group className="d-lg-flex mb-5">
                <Form.Label></Form.Label>
                <div>
                    <Form.Control
                        className="ipw-488"
                        type="text"
                        // placeholder="이름 입력"
                        placeholder={`${source.index + 1}지망 선택 사유 입력`}
                        onChange={(e) =>
                            handleReasonChange(e.currentTarget.value)
                        }
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {source.index + 1}지망 선택 사유를 입력해주세요.
                    </Form.Control.Feedback>
                </div>
            </Form.Group>
        </>
    )
}

//#endregion

//#region TIME_SELECTOR
const MINUTE_AVAILABLE = ['', '00', '30']

const HOUR_AVAILABLE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const TimeSelector = ({ onChange }) => {
    const [selectedHour, setSelectedHour] = useState(null)
    const [selectedMinute, setSelectedMinute] = useState(null)

    function handleHourSelect(val) {
        setSelectedHour(val)

        handleChange(val, selectedMinute)
    }

    function handleMinuteSelect(val) {
        setSelectedMinute(val)

        handleChange(selectedHour, val)
    }

    function handleChange(hour, minute) {
        onChange({ hour, minute })
    }

    return (
        <>
            <Dropdown
                className="form-control-dropdown mr-2"
                onSelect={(k, e) => handleHourSelect(k)}
            >
                <Dropdown.Toggle id="dropdown" className="ipw-152" variant="">
                    {selectedHour === null
                        ? '희망 시간 선택'
                        : `${selectedHour}시`}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {HOUR_AVAILABLE.map((item, index) => {
                        let dropdownItem =
                            item === 0 ? (
                                <Dropdown.Item key={index} eventKey={null}>
                                    희망 시간 선택
                                </Dropdown.Item>
                            ) : (
                                <Dropdown.Item key={index} eventKey={item}>
                                    {item}시
                                </Dropdown.Item>
                            )

                        return dropdownItem
                    })}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown
                className="form-control-dropdown mr-2"
                onSelect={(k, e) => handleMinuteSelect(k)}
            >
                <Dropdown.Toggle id="dropdown" className="ipw-152" variant="">
                    {selectedMinute === null
                        ? '희망 시간 선택'
                        : `${selectedMinute}분`}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {MINUTE_AVAILABLE.map((item, index) => {
                        let dropdownItem =
                            item === '' ? (
                                <Dropdown.Item key={index} eventKey={null}>
                                    희망 시간 선택
                                </Dropdown.Item>
                            ) : (
                                <Dropdown.Item key={index} eventKey={item}>
                                    {item}분
                                </Dropdown.Item>
                            )

                        return dropdownItem
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
//#endregion

//#region RANGE_DATETIME_SELECTOR_FORM_ITEM COMPONENT

const DAY_OF_WEEK = [
    { label: '요일 선택', value: '' },
    { label: '월', value: 'MONDAY' },
    { label: '화', value: 'TUESDAY' },
    { label: '수', value: 'WEDNESDAY' },
    { label: '목', value: 'THURSDAY' },
    { label: '금', value: 'FRIDAY' },
    { label: '토', value: 'SATURDAY' },
    { label: '일', value: 'SUNDAY' },
]

const TIME_OF_DAY = [
    { label: '오전', value: 'AM' },
    { label: '오후', value: 'PM' },
]

const PeriodSelector = () => {
    const { setData } = useContext(TutorRegisterBookContext)

    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(null)
    const [selectedTimeOfDay, setSelectedTimeOfDay] = useState(TIME_OF_DAY[0])
    const [selectedPeriod, setSelectedPeriod] = useState({
        end: {
            hour: null,
            minute: null,
        },
        start: {
            hour: null,
            minute: null,
        },
    })

    const PERIOD_TYPE = {
        PERIOD_START: 'PERIOD_TYPE_START',
        PERIOD_END: 'PERIOD_TYPE_END',
    }

    function getDayOfWeek(val) {
        for (let item of DAY_OF_WEEK) {
            if (item.value === val) return item
        }

        return null
    }

    function getTimeOfDay(val) {
        for (let item of TIME_OF_DAY) {
            if (item.value === val) return item
        }

        return null
    }

    function handleDayOfWeekSelect(val) {
        setSelectedDayOfWeek(getDayOfWeek(val))
    }

    function handleTimeOfDaySelect(val) {
        setSelectedTimeOfDay(getTimeOfDay(val))
    }

    function handleSetPeriod(val, periodType) {
        switch (periodType) {
            case PERIOD_TYPE.PERIOD_START:
                let start = { ...val }

                setSelectedPeriod({ ...selectedPeriod, start })
                break

            case PERIOD_TYPE.PERIOD_END:
                let end = { ...val }

                setSelectedPeriod({ ...selectedPeriod, end })
                break
        }
    }

    function canFinish() {
        let finish = true

        finish = finish && selectedDayOfWeek !== null
        finish = finish && selectedTimeOfDay !== null
        finish =
            finish &&
            selectedPeriod.start.hour !== null &&
            selectedPeriod.start.minute !== null
        finish =
            finish &&
            selectedPeriod.end.hour !== null &&
            selectedPeriod.end.minute !== null

        return finish
    }

    function handleFinish() {
        if (canFinish() === true) {
            let result = {
                day: selectedDayOfWeek,
                end: {
                    ...selectedPeriod.end,
                },
                start: {
                    ...selectedPeriod.start,
                },
                timeOfDay: selectedTimeOfDay,
            }

            setData({
                type: DESIRED_DATETIME_ACTION,
                data: { ...result },
            })
            console.log(result)
        }

    }

    return (
        <>
            <div className="group-datetime d-lg-flex">
                <div className="d-lg-flex">
                    <CustomDropdown
                        items={DAY_OF_WEEK}
                        onChange={(e, k) => handleDayOfWeekSelect(k)}
                        classNameToggle="ipw-130"
                        className="mr-2"
                    />

                    <CustomDropdown
                        items={TIME_OF_DAY}
                        onChange={(e, k) => handleTimeOfDaySelect(k)}
                        classNameToggle="ipw-100"
                        className="mr-2"
                    />
                </div>
                <TimeSelector
                    onChange={(period) =>
                        handleSetPeriod(period, PERIOD_TYPE.PERIOD_START)
                    }
                ></TimeSelector>
                <span className="date-divider">~</span>
            </div>

            <div className="group-datetime d-lg-flex">
                <TimeSelector
                    onChange={(period) =>
                        handleSetPeriod(period, PERIOD_TYPE.PERIOD_END)
                    }
                ></TimeSelector>

                <Button
                    variant="g700"
                    className="btw-184 btn-search btn-square mt-3 mt-lg-0"
                    onClick={handleFinish}
                >
                    선택
                </Button>
            </div>
        </>
    )
}

//#endregion

//#region CONTEXT

const TutorRegisterBookContext = createContext()

//#endregion

const TutorRegisBook = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [data, setData] = useReducer(tutorBookReducer, initialState)

    const [validated, setValidated] = useState(false)
    const [TutorRegisBook, setTutorRegisBook] = useState(false)
    const handleTutorRegisBook = () => setTutorRegisBook(true)
    const handleCloseTutorRegisBook = () => setTutorRegisBook(false)

    function handlePeriodRemove(index) {
        setData({
            type: DESIRED_DATETIME_REMOVE_ITEM_ACTION,
            index: index,
        })
    }

    function handleApply(event) {
        event.preventDefault()
        event.stopPropagation()

        const form = event.currentTarget
        if (form.checkValidity() === false ||  data.desireDateTimes.length === 0) {
        }
        else {
            const { registrationData, bothTutorType } = props.location.state
            const { desires, desireDateTimes } = data

            let convertedDesireDateTimes = desireDateTimes.map(
                (item, index) => {
                    let { day, start, end, timeOfDay } = item
                    return {
                        day: day.value,
                        start: formatDate(
                            start.hour + start.minute + timeOfDay.value,
                            'hmmA',
                            'HH:mm'
                        ),
                        end: formatDate(
                            end.hour + end.minute + timeOfDay.value,
                            'hmmA',
                            'HH:mm'
                        ),
                    }
                }
            )

            let body = {
                ...registrationData,
                bookClassInfo: {
                    desires,
                    desireDateTimes: [...convertedDesireDateTimes],
                },
            }

            if (bothTutorType === true) {
                history.push({
                    pathname: '/tutor-register-goal',
                    state: {
                        registrationData: body,
                    },
                })
            } else {
                const formData = new FormData();
                if (registrationData.id !==null ){
                    formData.append("tutorAppDto", JSON.stringify(body));
                    TutorService.updateApplyTutor(formData, registrationData.id).then((resp) => {
                        if (resp.status === 204) {
                            handleTutorRegisBook()
                            dispatch(getUserDetails())
                        }
                    }).catch(e => dispatch({type: SHOW_ERROR_POPUP, contents: "Internal error " + e.message}))
                }else {
                    formData.append("imagePc", body.imagePC);
                    delete body.imagePC;
                    formData.append("tutorAppDto", JSON.stringify(body));
                    TutorService.applyForTutor(formData).then((resp) => {
                        if (resp.status === 201) {
                            handleTutorRegisBook()
                        }
                    }).catch(e => dispatch({type: SHOW_ERROR_POPUP, contents: "Internal error " + e.message}))
                }

            }
        }

        setValidated(true)
    }

    return (
        <TutorRegisterBookContext.Provider value={{ validated, data, setData }}>
            <div className="tutorregisbook-body">
                <Form noValidate validated={validated} onSubmit={handleApply}>
                    <section className="box-section">
                        <div className="box-w612">
                            <div className="box-label">
                                LiveClass 책글 지도교사
                            </div>
                            <div className="box-title">
                                <h3>희망 학년 선택</h3>
                                <p className="mb-0 font-18">
                                    희망 학교 및 학년, 사유에 대해 입력해주세요.
                                </p>
                                <p className="text-g500">
                                    희망 학년을 최대한 반영하여 배치합니다.
                                </p>
                                <p className="text-danger">
                                    *희망 학년은 필수사항입니다.
                                </p>
                            </div>

                            {data.desires.map((item, index) => {
                                let itemSource = { ...item, index: index }

                                return (
                                    <DesiredGradeFormItem
                                        source={itemSource}
                                        key={index}
                                    ></DesiredGradeFormItem>
                                )
                            })}
                        </div>
                    </section>
                    <section className="box-section">
                        <div className="box-w612">
                            <div className="box-title">
                                <h3>수업일시 선택</h3>
                                <p className="mb-0 font-18">
                                    희망 수업일시를 선택해주세요.{' '}
                                </p>
                                <p className="text-g500">
                                    희망 수업일시를 최대한 반영하여 배치합니다.
                                    희망 수업일시는 여러개 선택이 가능합니다.
                                </p>
                                <p className="text-danger">
                                    *희망 수업일시 선택은 필수사항입니다.
                                </p>
                            </div>
                            <PeriodSelector></PeriodSelector>
                            <div className="datetime-list">
                                <ul className="reset-list">
                                    {data.desireDateTimes.map((item, index) => {
                                        let itemSource = `${item.day.label} ${ item.timeOfDay.label}
                                            ${item.start.hour}시 ${item.start.minute === '00' ? '': item.start.minute + "분"}
                                        ~ ${item.end.hour}시 ${item.end.minute === '00'? '': item.end.minute + "분"}`
                                        
                                        return (
                                            <li key={index}>
                                                <RemovableItem
                                                    source={itemSource}
                                                    onDelete={() =>
                                                        handlePeriodRemove(
                                                            index
                                                        )
                                                    }
                                                ></RemovableItem>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <p
                                    className="text-danger mt-3"
                                    hidden={data.desireDateTimes.length > 0}
                                >
                                    희망 수업일시를 선택해주세요.
                                </p>
                            </div>
                        </div>
                    </section>
                     <div className="text-center">
                        <Button
                          type="submit"
                          variant="p500"
                          className="btw-386 mt-5"
                        >
                          {props.location.state.bothTutorType === true ? "다음" : "지원하기"}
                        </Button>
                     </div>
                </Form>
            </div>
            <Modal
                show={TutorRegisBook}
                onHide={handleCloseTutorRegisBook}
                dialogClassName="modalw-386 modalh-480 modal-comfirm modal-tutorbook-confirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <p className="text-top">
                            지도교사 지원이 완료되었습니다.
                        </p>
                        <i className="lcicon-tutorbook-confirm my-2"></i>
                        <p className="text-bottom">
                            로그인은 승인 이후에 가능하며, <br /> 승인 여부는
                            개별적으로 전달드립니다.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="p500" as={Link} to="/">
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </TutorRegisterBookContext.Provider>
    )
}

export default TutorRegisBook
