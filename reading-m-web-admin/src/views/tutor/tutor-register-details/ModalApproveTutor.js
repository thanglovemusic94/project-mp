import React, {useEffect, useState} from 'react'
import {
    CButton,
    CCol,
    CFormGroup, CInputCheckbox,
    CInputRadio,
    CLabel,
    CModal,
    CModalBody,
    CRow,
} from '@coreui/react'
import { TutorApplicationService } from 'src/services/TutorApplicationService'
import {TutorAplly, TutorApply, TutorType} from "../../../constants/tutor.type.constants";


const ModalApproveTutor = (props) => {

    const [tutorConfirm, setTutorConfirm] = useState(false)
    const [tutorDone, setTutorDone] = useState(false)
    const {source, setShow} = props

    const [checkBox, setCheckBox] = useState({
        typeBook: source.bookClassInfo !== null || source.tutor.tutorType === TutorType.ALL.value,
        typeGoal: source.goalClassInfo !== null || source.tutor.tutorType === TutorType.ALL.value
    })

    const handleApplication = () => {

        let data = {
            approvedType: TutorApply.LIVE_GOAL.value
        }
        if (checkBox.typeGoal) data = {...data, approvedType: TutorApply.LIVE_GOAL.value}
        if (checkBox.typeBook) data = {...data, approvedType: TutorApply.LIVE_BOOK.value}
        if (checkBox.typeBook && checkBox.typeGoal) data = {...data, approvedType: TutorApply.ALL.value}
        if (data.approvedType != null){
            console.log(data)
            TutorApplicationService.confirmTutorApplication(props.id, data).then((resp) => {
                if (resp.status === 200) {
                    setTutorConfirm(!tutorConfirm)
                    setTutorDone(!tutorDone)
                    setShow(false)
                }

            })
        }
    }

    const handleType = (e) => {
        const checked = e.target.checked;
        const {name} = e.target
        setCheckBox({...checkBox, [name]: checked})
    }


    return (
        <>
            <CModal
                show={props.show}
                onClose={() => props.setModalApproveTutor(false)}
                centered
                size="md"
            >
                <CModalBody>
                    <h3 className="text-center mt-2 mb-4">지도교사 승인하기</h3>
                    <p className="text-center">
                        승인할 지도교사 권한을 선택해 주세요.
                    </p>
                    <div className="px-5 py-2">
                        <CFormGroup variant="custom-checkbox">
                            <CInputCheckbox
                                id="book"
                                name="typeBook"
                                value={TutorType.LIVE_BOOK.value}
                                onChange={handleType}
                                checked={checkBox.typeBook}
                                custom
                            />
                            <CLabel variant="custom-checkbox" htmlFor="book">
                                LiveClass 책글 지도교사
                            </CLabel>
                        </CFormGroup>

                        <CFormGroup variant="custom-checkbox">
                            <CInputCheckbox
                                id="goal"
                                name="typeGoal"
                                value={TutorType.LIVE_GOAL.value}
                                onChange={handleType}
                                checked={checkBox.typeGoal}
                                custom
                            />
                            <CLabel variant="custom-checkbox" htmlFor="goal">
                                LiveClass 목적 지도교사
                            </CLabel>
                        </CFormGroup>

                    </div>

                    <CRow className="justify-content-center mt-5 mb-2">
                        <CCol md="6">
                            <CButton
                                block
                                variant="outline"
                                color="dark"
                                onClick={() =>
                                    props.setModalApproveTutor(false)
                                }
                            >
                                취소
                            </CButton>
                        </CCol>
                        <CCol md="6">
                            <CButton
                                block
                                color="dark"
                                onClick={()=>setTutorConfirm(!tutorConfirm)}
                            >
                                선택
                            </CButton>
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
            <CModal
                show={tutorConfirm}
                onClose={() => setTutorConfirm(!tutorConfirm)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>지원자에게 선택한 지도교사의 권한을 승인하시겠습니까?</p>
                    <CButton
                        variant="outline"
                        color="dark"
                        onClick={() => setTutorConfirm(!tutorConfirm)}
                        className="mx-2"
                    >
                        취소
                    </CButton>
                    <CButton
                        color="dark"
                        onClick={handleApplication}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
            <CModal
                show={tutorDone}
                onClose={() => setTutorDone(!tutorDone)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>지도교사 권한이 승인되었습니다.</p>

                    <CButton
                        color="dark"
                        onClick={() => setTutorDone(!tutorDone)}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}

export default ModalApproveTutor
