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
    CImg,
    CFormGroup,
    CInputRadio,
    CLabel,
    CInputFile,
} from '@coreui/react'

const NoticeEdit = () => {
    const [small, setSmall] = useState(false)
    return (
        <>
            <h2 className="mb-4">공지사항 등록</h2>
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
                                    공지사항 제목
                                </td>
                                <td>
                                    <CInput
                                        id="banner_name"
                                        className="col-6"
                                        placeholder="공지사항 제목 입력"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    구분
                                </td>
                                <td>
                                    <div className="radio-group-custom">
                                        <CFormGroup variant="checkbox">
                                            <CInputRadio
                                                id="radio1"
                                                name="radios"
                                                value="option1"
                                                defaultChecked
                                            />
                                            <CLabel
                                                variant="checkbox"
                                                htmlFor="radio1"
                                            >
                                                전체
                                            </CLabel>
                                        </CFormGroup>
                                        <CFormGroup variant="checkbox">
                                            <CInputRadio
                                                id="radio2"
                                                name="radios"
                                                value="option2"
                                            />
                                            <CLabel
                                                variant="checkbox"
                                                htmlFor="radio2"
                                            >
                                                학생
                                            </CLabel>
                                        </CFormGroup>
                                        <CFormGroup variant="checkbox">
                                            <CInputRadio
                                                id="radio3"
                                                name="radios"
                                                value="option3"
                                            />
                                            <CLabel
                                                variant="checkbox"
                                                htmlFor="radio3"
                                            >
                                                학부모
                                            </CLabel>
                                        </CFormGroup>
                                        <CFormGroup variant="checkbox">
                                            <CInputRadio
                                                id="radio4"
                                                name="radios"
                                                value="option4"
                                            />
                                            <CLabel
                                                variant="checkbox"
                                                htmlFor="radio4"
                                            >
                                                지도교사
                                            </CLabel>
                                        </CFormGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">첨부 파일</td>
                                <td>
                                    <div className="form-inline">
                                        <CInput
                                            id="banner_mobile"
                                            className="col-6"
                                            placeholder="파일을 등록해주세요."
                                        />
                                        <span className="btn-upload-file ml-2">
                                            <CInputFile
                                                id="photoMobile"
                                                name="file-name"
                                            />
                                            <CLabel
                                                htmlFor="photoMobile"
                                                className="btnu-label"
                                            >
                                                파일 선택
                                            </CLabel>
                                        </span>
                                    </div>
                                    <p className="text-danger my-1">
                                        - 한글, ppt, pdf, img(jpg, png) 파일만
                                        등록 가능합니다.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    내용
                                </td>
                                <td>
                                    <CImg
                                        src="https://picsum.photos/1024/480/?image=54"
                                        fluidGrow
                                        className="my-2"
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
                                to="/main/notices/notices"
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
                    <CButton color="dark" to="/main/notices/notices">
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}

export default NoticeEdit
