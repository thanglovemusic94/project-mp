import { ClassType, SUBJECT_SELECTIONS } from 'constants/class.constants'
import { schoolgrade } from 'constants/schoolgrade.constants'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ClassService } from 'services/ClassService'
import { LoginService } from 'services/LoginService'
import CurriculumList from './components/CurriculumList'
import CurriculumListRearrangeMode from './components/CurriculumListRearrangeMode'
import ModalClassDateTime from './ModalClassDateTime'
import ModalNewspaperColumn from './ModalNewspaperColumn'
import CustomDropdown from 'components/CustomDropdown'
import FormattedDateTime from 'components/common/FormattedDateTime'
import { GRADE_MAP } from 'constants/student.target.constants'

export const COMPONENT_MODE = {
    "CREATE": 1,
    "UPDATE": 2,
    "UPDATE_REARRANGE_CURRICULUMS": 3
}

export default function TutorOpenClassBook(props) {
    const propsPageType = props.location.state.type;
    const propsCurriculum = props.location.state.curriculum ? props.location.state.curriculum : {
        "curriculumBooks": [],
        "targetStudentString": "",
        "curriculumDateString": ""
    }
    const propsLiveClassId = props.location.state.liveClassId ? props.location.state.liveClassId : undefined;

    const [crudMode, setCRUDMode] = useState(propsLiveClassId ? COMPONENT_MODE.UPDATE : COMPONENT_MODE.CREATE);
    const turnCurriculumsRearrangeModeOn = () => setCRUDMode(COMPONENT_MODE.UPDATE_REARRANGE_CURRICULUMS);
    const turnUpdateModeOn = () => setCRUDMode(COMPONENT_MODE.UPDATE);

    const [liveClassInfo, setLiveClassInfo] = useState({
        "tutorName": "",
        "tutorIntroduction": "",
        "targetStudent": propsCurriculum.targetStudentString,
        "classDateTime": propsCurriculum.curriculumDateString,
        "name": "",
        "materials": "",
        "guide": "",
        "tuitionFee": "",
        "stdNo": "",
        "revisionReason": ""
    })

    const [curriculumsInfo, setCurriculumsInfo] = useState(
        propsPageType === ClassType.TextBookClass.value ?
            [ ...propsCurriculum.curriculumBooks ]
            :
            [
                {
                    "content": "",
                    "material": ""
                }
            ]
    )

    const [validated, setValidated] = useState(false);

    const [selectedWeekIndex, setSelectedWeekIndex] = useState(-1);

    // State Confirm
    const [successPopup, setSuccessPopup] = useState(false)
    const showSuccessPopup = () => setSuccessPopup(true)
    const hideSuccessPopup = () => setSuccessPopup(false)

    // State ModalClassDateTime
    const [dateTimePopup, setDateTimePopup] = useState(false)
    const showDateTimePopup = () => setDateTimePopup(true)

    // State ModalNewspaperColumn
    const [newspaperPopup, setNewspaperPopup] = useState(false)
    const showNewspaperPopup = () => setNewspaperPopup(true)

    useEffect(() => {

        LoginService.getProfile().then((resp) => {

            if (resp.status === 200) {
                const { name, bookTextIntroduction } = resp.data;

                setLiveClassInfo({ 
                    ...liveClassInfo,
                    "tutorName": name, 
                    "tutorIntroduction": bookTextIntroduction
                });
            }
        })

        if (crudMode === COMPONENT_MODE.UPDATE) {

            ClassService.getClassDetails(propsLiveClassId).then((resp) => {

                if (resp.status === 200) {
                    const { 
                        tutorName, 
                        introduction, 
                        targetStudent, 
                        openDate,
                        name, 
                        materials, 
                        guide, 
                        tuitionFee,
                        numberOfPeople
                    } = resp.data;
                    
                    const targetStudentString = schoolgrade[targetStudent];
                    const createdDate = new Date(openDate);
                    const classDateTimeString = `${createdDate.getFullYear()}년.${createdDate.getMonth() + 1}월`

                    let liveClassData = {
                        "tutorName": tutorName,
                        "tutorIntroduction": introduction,
                        "targetStudent": targetStudentString,
                        "classDateTime": classDateTimeString,
                        "name": name,
                        "materials": materials,
                        "guide": guide,
                        "tuitionFee": tuitionFee,
                        "stdNo": numberOfPeople,
                        "revisionReason": ""
                    }

                    if (propsPageType === ClassType.GoalClass.value) liveClassData["category"] = resp.data.category;

                    setLiveClassInfo(liveClassData);

                    const { curriculum } = resp.data;

                    // This part is for correcting time between server and client.
                    let correctedCurriculum = []

                    for (let item of curriculum) {

                        let start = new Date(item.start);
                        start.setMinutes(start.getMinutes() - start.getTimezoneOffset())

                        let end = new Date(item.end);
                        end.setMinutes(end.getMinutes() - end.getTimezoneOffset());

                        correctedCurriculum.push({
                            ...item,
                            "start": start.toString(),
                            "end": end.toString()
                        })
                    }
                    // end

                    setCurriculumsInfo([...correctedCurriculum]);
                }
            })
        } else if (crudMode === COMPONENT_MODE.CREATE) {
            const { cclass, cgrade } = propsCurriculum;
            let newCurriculumsInfo = [...curriculumsInfo]
                    
            const canReadNewsPaper = cclass === "ELEMENTARY" ? cgrade === "GRADE_6" : true;

            for (let item of newCurriculumsInfo) {
                item["canReadNewsPaper"] = canReadNewsPaper;
            }

            setCurriculumsInfo(newCurriculumsInfo);
        }
    }, [])

    function submitOpen() {
        let curriculum = []

        for (const item of curriculumsInfo) {
            const { newsPaper, id, start, end, material, content } = item;
            let newItem = {
                "start": new Date(start), 
                "end": new Date(end), 
                material, 
                content 
            }

            if (propsPageType === ClassType.GoalClass.value) {
                newItem["name"] = item.name;
            } else if (propsPageType === ClassType.TextBookClass.value) {
                newItem["bookId"] = id;
                newItem["newPaperId"] = newsPaper ? newsPaper.id : null;
            }

            curriculum.push(newItem);
        }

        const rootName = propsPageType === ClassType.TextBookClass.value ? "livebook" : "livegoal";

        let body = {
            [rootName]: {
                "name": liveClassInfo.name,
                "materials": liveClassInfo.materials,
                "tuitionFee": parseInt(liveClassInfo.tuitionFee),
                "source": "READINGM",
                "status": "SHOW",
                "guide": liveClassInfo.guide,
                "stdNo": parseInt(liveClassInfo.stdNo),
                "curriculum": curriculum
            }
        }
        
        if (propsPageType === ClassType.TextBookClass.value) {
            body[rootName].openDate = FormattedDateTime({"source": new Date(), "format": "YYYY-MM-DD"});
            body[rootName].targetStudentGrade = GRADE_MAP[`${propsCurriculum.cgrade}`];
        } else if (propsPageType === ClassType.GoalClass.value) {
            body[rootName].introduction = liveClassInfo.tutorIntroduction;
            body[rootName].category = liveClassInfo.category;
        }

        ClassService.openLiveClass(body).then((resp) => {

            if (resp.status === 201) {

                showSuccessPopup();
            }
        })
    }

    function submitUpdate() {
        let curriculum = []

        for (const item of curriculumsInfo) {
            const { name, start, end, material, content, newPaper, book } = item;

            let newItem = {
                content,
                "end": new Date(end),
                material,
                "notification": null,
                "start": new Date(start)
            }

            if (propsPageType === ClassType.TextBookClass.value) {
                newItem["bookId"] = book.id;
                newItem["newPaperId"] = newPaper.id;
            } else {
                newItem["name"] = name;
            }

            curriculum.push(newItem);
        }

        const { name, materials, guide, tuitionFee, revisionReason } = liveClassInfo;

        let body = {
            curriculum,
            guide,
            "introduction": liveClassInfo.tutorIntroduction,
            materials, name, 
            revisionReason,
            tuitionFee             
        }

        if (propsPageType === ClassType.GoalClass.value) {
            body["category"] = liveClassInfo.category;
        }

        ClassService.updateLiveClass(propsLiveClassId, body).then((resp) => {

            if (resp.status === 204) {

                showSuccessPopup();
            }
        })
    }

    function handleCurriculumsRearrangementFinished(data) {
        const { curriculums, reason } = data;

        setLiveClassInfo({
            ...liveClassInfo,
            "revisionReason": reason
        })

        setCurriculumsInfo([...curriculums]);

        turnUpdateModeOn();
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        ev.stopPropagation()

        const form = ev.target;

        if (form.checkValidity() === true) {
            if (crudMode === COMPONENT_MODE.CREATE) {
                submitOpen();
            } else {
                submitUpdate();
            }
        }

        setValidated(true);
    }

    function handleClassDateTimeOpenModal(index) {

        setSelectedWeekIndex(index);
        showDateTimePopup();
    }

    function handleClassDateTimeSelect(data) {
        let start = new Date(data.date);
        let end = new Date(data.date);

        const addTime = data.timeOfDay === "AM" ? 0 : 12;

        if (data.fromHour !== "") 
            start.setHours(parseInt(data.fromHour) + addTime);
        
        if (data.fromMinute !== "")
            start.setMinutes(parseInt(data.fromMinute));

        if (data.toHour !== "")
            end.setHours(parseInt(data.toHour) + addTime);

        if (data.toMinute !== "")
            end.setMinutes(parseInt(data.toMinute));

        let newCurriculumsInfo = [ ...curriculumsInfo ]

        newCurriculumsInfo[selectedWeekIndex] = {
            ...newCurriculumsInfo[selectedWeekIndex],
            "start": start.toString(),
            "end": end.toString()
        }

        setCurriculumsInfo(newCurriculumsInfo)
    }

    function handleChange(ev) {
        const name = ev.target.name;
        const value = ev.target.value;

        let newState = { 
            ...liveClassInfo,
            [name]: value
        }

        setLiveClassInfo({ ...newState });
    }

    function handleDropdownChange(ev, val) {
        const name = ev.target.name;

        let newState = { 
            ...liveClassInfo,
            [name]: val
        }

        setLiveClassInfo({ ...newState });
    }

    function handleWeekChange(ev, index) {
        const name = ev.target.name;
        const value = ev.target.value;

        let newState = [...curriculumsInfo]

        newState[index] = {
            ...newState[index],
            [name]: value
        }

        setCurriculumsInfo(newState);
    }

    function handleAddCurriculum() {
        let newCurriculums = [...curriculumsInfo]
        newCurriculums.push({
            "content": "",
            "material": ""
        })
        setCurriculumsInfo(newCurriculums);
    }

    function handleDeleteCurriculum(index) {
        let newCurriculums = [...curriculumsInfo]
        newCurriculums.splice(index, 1);
        setCurriculumsInfo(newCurriculums);
    }

    function handleShowNewspaperPopup(index) {
        setSelectedWeekIndex(index);
        showNewspaperPopup();
    }

    function handleNewspaperSelected(item) {
        let newCurriculumsInfo = [ ...curriculumsInfo ]

        newCurriculumsInfo[selectedWeekIndex] = {
            ...newCurriculumsInfo[selectedWeekIndex],
            "newsPaper": item
        }

        setCurriculumsInfo(newCurriculumsInfo)
    }

    function removeSelectedNewspaper(ev, index) {
        let newCurriculumsInfo = [ ...curriculumsInfo ]

        newCurriculumsInfo[index] = {
            ...newCurriculumsInfo[index],
            "newsPaper": null
        }

        setCurriculumsInfo(newCurriculumsInfo);
    }

    return (
        <>
            <div className="tutoropenclassbook-body">
                {
                    propsPageType === ClassType.TextBookClass.value ?
                    <h2 className="page-title bg-m500">LiveClass 책글 개설하기</h2>
                    :
                    <h2 className="page-title bg-b500">LiveClass 목적 개설하기</h2>
                }
                <Form
                    validated={validated}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <section className="box-section">
                        <div className="box-w612 py-lg-5">
                            <Form.Group className="d-lg-flex">
                                <Form.Label>지도교사</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={ liveClassInfo.tutorName }
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>
                                    지도교사 <br className="d-none d-lg-flex" />
                                    소개인사
                                </Form.Label>
                                {
                                    propsPageType === ClassType.TextBookClass.value ?
                                    <div className="ipw-488">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={ liveClassInfo.tutorIntroduction }
                                        />
                                    </div>
                                    :
                                    <div className="ipw-488">
                                        <Form.Control
                                            name="tutorIntroduction"
                                            as="textarea"
                                            rows={5}
                                            placeholder="지도교사 소개인사 입력 100자 이내"
                                            value={ liveClassInfo.tutorIntroduction }
                                            onChange={ handleChange }
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            지도교사 소개인사를 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                }
                            </Form.Group>
                            {
                                propsPageType === ClassType.GoalClass.value
                                    ?
                                    <Form.Group className="d-lg-flex">
                                        <Form.Label>카테고리</Form.Label>
                                        <div className="ipw-488">
                                            <CustomDropdown
                                                name="category"
                                                items={ SUBJECT_SELECTIONS }
                                                mapping={ ["name", "value"] }
                                                onChange={ handleDropdownChange }
                                                selectedValue={ liveClassInfo.category }
                                            />                                              
                                            <Form.Control.Feedback type="invalid">
                                                카테고리를 선택해주세요.
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                    :
                                    <></>
                            }
                            <Form.Group className="d-lg-flex">
                                <Form.Label>수업명</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        name="name"
                                        type="text"
                                        placeholder="수업명 입력"
                                        value={ liveClassInfo.name }
                                        onChange={ handleChange }
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        수업명을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>수업 준비</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        name="materials"
                                        type="text"
                                        placeholder="수업 준비 입력"
                                        value={ liveClassInfo.materials }
                                        onChange={ handleChange }
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        수업 준비 내용을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex align-items-start">
                                <Form.Label>수업안내</Form.Label>
                                <div className="ipw-488">
                                    <Form.Control
                                        name="guide"
                                        as="textarea"
                                        rows={3}
                                        placeholder="수업안내 입력"
                                        value={ liveClassInfo.guide }
                                        onChange={ handleChange }
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        수업 안내 내용을 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>교육비</Form.Label>
                                <div className="ipw-488">
                                    <div className="d-flex">
                                        <Form.Control
                                            name="tuitionFee"
                                            className="ipw-240"
                                            type="text"
                                            placeholder="교육비 입력"
                                            value={ liveClassInfo.tuitionFee }
                                            onChange={ handleChange }
                                            pattern="^[0-9]*$"
                                            required
                                        />
                                        <label className="mt-3 ml-3">원</label>
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        교육비를 입력해주세요.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Form.Group className="d-lg-flex">
                                <Form.Label>인원</Form.Label>
                                {
                                    crudMode !== COMPONENT_MODE.CREATE ? 
                                    <div className="ipw-488">
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={ liveClassInfo.stdNo }
                                        />
                                    </div>
                                    :
                                    <div className="ipw-488">
                                        <Form.Control
                                            name="stdNo"
                                            className="ipw-240"
                                            type="text"
                                            placeholder="교육비 입력"
                                            value={ liveClassInfo.stdNo }
                                            onChange={ handleChange }
                                            pattern="^[0-9]*$"
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            * 최소 1명 최대 60명까지 인원 설정이
                                            가능합니다.
                                        </Form.Text>

                                        <Form.Control.Feedback type="invalid">
                                            인원을 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                }                                
                            </Form.Group>
                            {
                                propsPageType === ClassType.TextBookClass.value ?
                                <>
                                    <Form.Group className="d-lg-flex">
                                        <Form.Label>대상학생</Form.Label>
                                        <div className="ipw-488">
                                            <Form.Control
                                                plaintext
                                                readOnly
                                                defaultValue={ liveClassInfo.targetStudent }
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="d-lg-flex">
                                        <Form.Label>수업일시</Form.Label>
                                        <div className="ipw-488">
                                            <Form.Control
                                                plaintext
                                                readOnly
                                                defaultValue={ liveClassInfo.classDateTime }
                                            />
                                        </div>
                                    </Form.Group>
                                </>
                                :
                                <></>
                            }
                        </div>
                    </section>
                    
                    {
                        crudMode !== COMPONENT_MODE.UPDATE_REARRANGE_CURRICULUMS ?
                        <CurriculumList
                            itemType={ propsPageType }
                            mode={ crudMode }
                            source={ curriculumsInfo }
                            onItemAdded={ handleAddCurriculum }
                            onItemDeleted={ handleDeleteCurriculum }
                            callbacks={ {
                                handleClassDateTimeOpenModal,
                                showDateTimePopup,
                                handleWeekChange,
                                handleShowNewspaperPopup,
                                turnCurriculumsRearrangeModeOn,
                                removeSelectedNewspaper
                            } }
                        />
                        :
                        <CurriculumListRearrangeMode
                            source={ curriculumsInfo }
                            onFinish={ handleCurriculumsRearrangementFinished }
                            onCancel={ turnUpdateModeOn }
                        />
                    }
                    
                </Form>
            </div>
            
            <ModalClassDateTime 
                show={dateTimePopup} 
                setShow={setDateTimePopup} 
                selectedClassDateTime={curriculumsInfo[selectedWeekIndex]}
                onSelect={ handleClassDateTimeSelect }
            >
            </ModalClassDateTime>
            
            <ModalNewspaperColumn 
                show={newspaperPopup} 
                setShow={setNewspaperPopup} 
                onSelect={handleNewspaperSelected}
            />

            <Modal
                show={successPopup}
                onHide={hideSuccessPopup}
                dialogClassName="modalw-386 modal-comfirm"
                backdrop="static"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">
                            {
                                crudMode === COMPONENT_MODE.CREATE ?
                                    propsPageType === ClassType.TextBookClass.value ?
                                        "LiveClass 책글 개설이 완료되었습니다."
                                        :
                                        "LiveClass 목적 개설이 완료되었습니다."
                                    :
                                    "저장되었습니다."
                            }
                            
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button 
                        variant="g700" 
                        as={Link}
                        to="/tutor/my-class" >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
