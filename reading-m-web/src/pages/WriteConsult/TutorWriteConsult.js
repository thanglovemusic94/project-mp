import React, { useEffect, useReducer, useState } from 'react'
import { Button, Dropdown, Form, Modal, Table } from 'react-bootstrap'
import { TeacherRoomService } from 'services/TeacherRoom'
import CustomDropdown from 'components/CustomDropdown'
import { ParentService } from 'services/ParentService'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const REDUCER_ACTION = {
    "HANDLE_DROPDOWN_CHANGE": 1,
    "HANDLE_TEXT_CHANGE": 2
}

const initialSubmitData = {
    "childId": -1,
    "parentId": -1,
    "classId": -1,
    "question": "",
    "title": ""
}

function submitDataReducer(state, action) {
    let newState = {}
    
    switch(action.type) {
        case REDUCER_ACTION.HANDLE_DROPDOWN_CHANGE:
            newState = { ...state, [action.data.name]: parseInt(action.data.value) }

            return newState;

        case REDUCER_ACTION.HANDLE_TEXT_CHANGE:
            newState = { ...state, [action.data.name]: action.data.value }

            return newState;
    }
}

export default function TutorWriteConsult() {
    const history = useHistory();

    const [classTutors, setClassTutors] = useState([]);
    const [classTutorParents, setClassTutorParents] = useState([]);
    const [classParentChildrens, setClassParentChildrens] = useState([]);

    const [submitData, setSubmitData] = useReducer(submitDataReducer, initialSubmitData);

    // Modal Ok confirm
    const [show1, setShow1] = useState(false)
    const handleShow1 = () => setShow1(true)
    const handleClose1 = () => setShow1(false)

    // Validate form
    const [validated, setValidated] = useState(false)

    useEffect(() => {

        TeacherRoomService.getClassByTutor().then((resp) => {

            if (resp.status === 200) {
                
                setClassTutors(resp.data);
            }
        })
    }, [])

    function dispatchDropdownChange(e, value) {
        const name = e.target.name;

        setSubmitData({
            "type": REDUCER_ACTION.HANDLE_DROPDOWN_CHANGE,
            "data": { name, value }
        })
    }

    function dispatchTextChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setSubmitData({
            "type": REDUCER_ACTION.HANDLE_TEXT_CHANGE,
            "data": { name, value }
        })
    }

    function handleLoadTutorParents(e, value) {
        dispatchDropdownChange(e, value);

        if (parseInt(value) !== -1) {

            ParentService.getClassParents(value).then((resp) => {
    
                if (resp.status === 200) {
                    
                    setClassTutorParents(resp.data);
                }
            })
        } else {
            setClassTutorParents([]);
        }
    }

    function handleLoadParentChildrens(e, value) {
        dispatchDropdownChange(e, value);

        if (parseInt(value) !== -1) {

            ParentService.getParentChildrens(value).then((resp) => {
    
                if (resp.status === 200) {
                    
                    setClassParentChildrens(resp.data);
                }
            })
        } else {
            setClassParentChildrens([]);
        }
    }

    function validateData() {
        let res = true;
        
        if (submitData.classId === -1 || submitData.childId === -1)
            res = false;

        return res;
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const form = event.currentTarget

        if (form.checkValidity() === true && validateData() === true) {
            TeacherRoomService.createConsultation(submitData).then((resp) => {

                if (resp.status === 201) {

                    handleShow1();
                }
            })
        }

        setValidated(true)
    }

    function handleFinish() {

        handleClose1();
        history.push("/teacher-room");
    }

    return (
        <>
            <div className="writeconsult-body">
                <h2 className="page-title mb-4">상담 작성하기</h2>
                <p className="text-g500 text-center mb-3">
                    * 현재 진행하고 있는 수업을 신청한 학생의 학부모만 상담이
                    가능합니다.
                </p>
                <Form
                    noValidate 
                    validated={validated}
                    onSubmit={handleSubmit}
                    // className="was-validated"
                >
                    <Table className="table-form">
                        <tbody>
                            <tr>
                                <th className="th-285 align-middle">
                                    수업 선택
                                </th>
                                <td className="pr-0">
                                    <label className="d-block d-lg-none">
                                        수업 선택
                                    </label>
                                    <CustomDropdown
                                        name="classId"
                                        className="ipw-488"
                                        items={classTutors}
                                        mapping={["name", "id"]}
                                        onChange={ handleLoadTutorParents }
                                        defaultToggleLabel="수업 선택"
                                        defaultToggleValue="-1"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        문의 유형을 입력해주세요.
                                    </Form.Control.Feedback>
                                </td>
                            </tr>
                            <tr>
                                <th className="th-285 align-middle">
                                    학부모 선택
                                </th>
                                <td className="pr-0">
                                    <label className="d-block d-lg-none">
                                        학부모 선택
                                    </label>
                                    <CustomDropdown
                                        name="parentId"
                                        className="ipw-488"
                                        items={classTutorParents}
                                        mapping={["name", "id"]}
                                        onChange={ handleLoadParentChildrens }
                                        defaultToggleLabel="학부모 선택"
                                        defaultToggleValue="-1"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        문의 유형을 입력해주세요.
                                    </Form.Control.Feedback>
                                </td>
                            </tr>
                            <tr>
                                <th className="th-285 align-middle">
                                    학생 선택
                                </th>
                                <td className="pr-0">
                                    <label className="d-block d-lg-none">
                                        학생 선택
                                    </label>
                                    <CustomDropdown
                                        name="childId"
                                        className="ipw-488"
                                        items={classParentChildrens}
                                        mapping={["name", "id"]}
                                        onChange={ dispatchDropdownChange }
                                        defaultToggleLabel="학생 선택"
                                        defaultToggleValue="-1"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        문의 유형을 입력해주세요.
                                    </Form.Control.Feedback>
                                </td>
                            </tr>
                            <tr>
                                <th className="th-285 align-middle">제목</th>
                                <td className="pr-0">
                                    <label className="d-block d-lg-none">
                                        제목
                                    </label>
                                    <div>
                                        <Form.Control
                                            name="title"
                                            type="text"
                                            placeholder="제목 입력 20자 이내 "
                                            onChange={dispatchTextChange}
                                            required
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            제목을 입력해주세요.
                                        </Form.Control.Feedback>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="th-285 align-top">내용</th>
                                <td className="pr-0 pb-0">
                                    <label className="d-block d-lg-none">
                                        내용
                                    </label>
                                    <Form.Control
                                        name="question"
                                        as="textarea"
                                        rows={10}
                                        placeholder="내용 입력"
                                        onChange={dispatchTextChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        내용을 입력해주세요.
                                    </Form.Control.Feedback>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <div className="text-right">
                        <Button
                            type="submit"
                            variant="p500"
                            className="btw-290"
                            // onClick={handleShow1}
                        >
                            저장하기
                        </Button>
                    </div>
                </Form>
            </div>
            <Modal
                show={show1}
                onHide={handleFinish}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable={true}>
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">상담이 등록되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700" onClick={handleFinish}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
