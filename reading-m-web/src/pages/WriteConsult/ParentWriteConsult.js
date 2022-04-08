import React, {useEffect, useLayoutEffect, useState} from 'react'
import {Button, Form, Modal, Table} from 'react-bootstrap'
import {TeacherRoomService} from "../../services/TeacherRoom";
import CustomDropdown from "../../components/CustomDropdown";
import {useHistory} from "react-router-dom";
import checkClassType from "../../constants/class.constants";

export default function ParentWriteConsult() {
    const history = useHistory();
    const [show, setShow] = useState(false)
    const [listChildren, setListChildren] = useState([]);

    const [listLiveClass, setLiveClass] = useState([{label: "수업 선택", value: 0}]);
    const [validated, setValidated] = useState(false)
    const [validDropdownClass, setValidDropdownClass] = useState(false)
    const [data, setData] = useState({
            childId: 0,
            classId: 0,
            question: "",
            title: ""
        }
    );

    async function getAllChildren() {
     let cd = await TeacherRoomService.getChildren().then((res) => {
        return res.data;
        }).catch((e) => {
            console.log(e)
        })
        return cd;
    }

    function getClassByStudentId(id) {
        TeacherRoomService.getClassByStudentId(id).then(res => {
            let array2 = res.data.map(v => {return {label: '['+ checkClassType(v.type) +'] '+ v.name, value: v.id}})
            array2.unshift({label: "수업 선택", value: 0})
            setLiveClass(array2)
            setData({...data, childId: id})
        }).catch(e => console.log(e))
    }


    const handleChangeInput = (e, k) => {
        const {name, value} = e.target;
        if (name === 'childId') {
            getClassByStudentId(k)
            setData({...data, childId: k})
        } else if (name === 'classId') {
            if (k === '0') setValidDropdownClass(true)
            else {
                setValidDropdownClass(false)
            }
            setData({...data, classId: k})
        } else {
            setData({...data, [name]: value})
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        if (data.classId === 0) setValidDropdownClass(true)
        if (form.checkValidity() === true && data.classId !== 0) {
            TeacherRoomService.createConsultation(data).then(res => {
                setShow(!show)
            }).catch(e => console.log(e))
        }
        setValidated(true)

    }

    useEffect(() => {
        getAllChildren().then(r => {
            setListChildren(r.map(v => {
                return {label: v.name, value: v.id}
            }))
            getClassByStudentId(r[0].id)
        })
    }, [])

    return (
        <>
            <div className="writeconsult-body">
                <h2 className="page-title mb-4">상담 작성하기</h2>
                <p className="text-g500 text-center mb-3">
                    * 종료 또는 이전에 진행된 수업은 선택이 불가능하며, 현재
                    학생이 진행하고 있는 수업만 상담이 가능합니다.
                </p>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    //className="was-validated"
                >
                    <Table className="table-form">
                        <tbody>
                        <tr>
                            <th className="th-285 align-middle">
                                자녀 선택
                            </th>
                            <td className="pr-0">
                                <label className="d-block d-lg-none">
                                    자녀 선택
                                </label>
                                {
                                    listChildren.length > 0 &&
                                    <CustomDropdown
                                        items={listChildren}
                                        onChange={handleChangeInput}
                                        name={'childId'}
                                        className={'ipw-488'}
                                    />
                                }

                            </td>
                        </tr>
                        <tr>
                            <th className="th-285 align-middle">
                                수업 선택
                            </th>
                            <td className="pr-0">
                                <label className="d-block d-lg-none">
                                    수업 선택
                                </label>


                                {
                                    listLiveClass.length > 1 &&
                                    <CustomDropdown
                                        items={listLiveClass}
                                        onChange={handleChangeInput}
                                        name={'classId'}
                                        className={'ipw-488'}
                                        defaultValue={0}
                                    />
                                }

                                {
                                    listLiveClass.length === 1 &&
                                    <CustomDropdown
                                        items={[{label: "수업 선택", value: 0}]}
                                        onChange={handleChangeInput}
                                        name={'classId'}
                                        className={'ipw-488'}
                                        defaultValue={0}
                                    />
                                }
                                <Form.Control.Feedback className={validDropdownClass ? "d-block" : "d-none"}
                                                       type="invalid">
                                    수업을 선택해주세요.
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
                                        type="text"
                                        placeholder="제목 입력 20자 이내 "
                                        required
                                        onChange={handleChangeInput}
                                        name={'title'}
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
                                    as="textarea"
                                    rows={10}
                                    placeholder="내용 입력"
                                    required
                                    onChange={handleChangeInput}
                                    name={'question'}
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
                            variant="b500"
                            className="btw-290"
                        >
                            저장하기
                        </Button>
                    </div>
                </Form>
            </div>
            <Modal
                show={show}
                onHide={() => setShow(!show)}
                dialogClassName="modalw-386 modal-comfirm"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner flex-column">
                        <i className="lcicon-modalComplete mb-2"></i>
                        <p className="mb-0">상담이 등록되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-btn-half">
                    <Button variant="g700"
                            onClick={() => history.push('/teacher-room')}
                    >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
