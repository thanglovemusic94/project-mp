import React, { useState } from 'react'
import {
    CCardBody,
    CButton,
    CCard,
    CCol,
    CInput,
    CRow,
    CModalBody,
    CModal,
    CTextarea,
} from '@coreui/react'

const FaqEdit = () => {
    const [small, setSmall] = useState(false)

    return (
        <>
            <h2 className="mb-4">자주 묻는 질문 수정</h2>
            <CCard>
                <CCardBody>
                    <div className="d-flex justify-content-end">
                        <p className="text-danger">
                            * 표시된 영역은 필수 입력 영역 입니다.
                        </p>
                    </div>

                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    질문
                                </td>
                                <td>
                                    <CInput
                                        className="col-6"
                                        placeholder="{faq}"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    답변
                                </td>
                                <td>
                                    <CTextarea
                                        rows="9"
                                        placeholder="{faq_text}"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <CRow className="justify-content-center mt-5">
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                variant="outline"
                                to="/notice/faq-list/faqs/Faqs"
                            >
                                취소
                            </CButton>
                        </CCol>
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                onClick={() => setSmall(!small)}
                            >
                                저장
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <CModal
                show={small}
                onClose={() => setSmall(!small)}
                size="sm"
                centered
            >
                <CModalBody className="text-center">
                    <p>저장되었습니다.</p>
                    <CButton color="dark" to="/notice/faq-list/faqs/Faqs">
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}

export default FaqEdit
