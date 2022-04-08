import React, { useEffect, useState } from 'react'
import {
    CCardBody,
    CButton,
    CCard,
    CCol,
    CInput,
    CRow,
    CModal,
    CModalBody,
    CLabel,
    CImg,
    CInputFile,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const DavinciMathEdit = (props) => {
    const [small, setSmall] = useState(false)
    const [deleteComfirm, setDelConfirm] = useState(false)
    const [deleteDone, setDelDone] = useState(false)

    useEffect(() => {
        console.log(props.location.data)
    }, [])

    return (
        <>
            <h2 className="mb-4">과학수학 다빈치 수정</h2>
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
                                    강의명
                                </td>
                                <td>
                                    <CInput
                                        className="col-6"
                                        placeholder="강의명 입력"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    강의 소개
                                </td>
                                <td>
                                    <CInput
                                        className="col-6"
                                        placeholder="강의 소개 입력"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    대상학생
                                </td>
                                <td>
                                    <CInput
                                        className="col-6"
                                        placeholder="대상학생 입력"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    수업 준비
                                </td>
                                <td>
                                    <CInput
                                        className="col-6"
                                        placeholder="수업 준비 입력"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    전체 강의비
                                </td>
                                <td>
                                    <div className="form-inline">
                                        <CInput
                                            className="col-6"
                                            placeholder="전체 강의비 입력"
                                        />
                                        <span className="ml-2">원</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    강의 이미지
                                </td>
                                <td>
                                    <div className="form-inline">
                                        <CInput
                                            id="banner_pc"
                                            className="col-6"
                                            placeholder="이미지를 등록해주세요."
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
                                        - 최대 200MB의 jpg, png 이미지 파일만
                                        등록 가능합니다.
                                    </p>
                                    <p className="text-danger my-1">
                                        - 이미지 사이즈는 485 x 490를
                                        추천합니다.
                                    </p>
                                    <CImg
                                        src="https://picsum.photos/1024/480/?image=54"
                                        width="300px"
                                        className="my-2"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    강의 등록
                                </td>
                                <td>
                                    <fieldset className="fieldset-custom mb-3">
                                        <div className="d-flex justify-content-between">
                                            <h4>1강</h4>
                                        </div>
                                        <div className="form-inline mb-2">
                                            <CLabel className="mr-3">
                                                강의 제목
                                            </CLabel>
                                            <CInput
                                                placeholder="강의 제목 입력"
                                                className="mr-2"
                                            />
                                        </div>
                                        <div className="form-inline mb-2">
                                            <CLabel className="mr-3">
                                                강의 제목
                                            </CLabel>
                                            <CInput
                                                placeholder="강의 시간 입력"
                                                className="mr-2"
                                            />
                                            <span>분</span>
                                        </div>
                                        <div className="form-inline mb-2">
                                            <CLabel className="mr-3">
                                                개별 강의비
                                            </CLabel>
                                            <CInput
                                                placeholder="개별 강의비 입력"
                                                className="mr-2"
                                            />
                                            <span>원</span>
                                        </div>
                                        <div className="form-inline">
                                            <CInput
                                                className="col-6"
                                                placeholder="이미지를 등록해주세요."
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
                                            - mp4, avi 동영상 파일만 등록
                                            가능합니다.
                                        </p>
                                    </fieldset>

                                    <fieldset className="fieldset-custom mb-3">
                                        <div className="d-flex justify-content-between">
                                            <h4>2강</h4>
                                            <CCol md="2">
                                                <CButton
                                                    color="dark"
                                                    size="md"
                                                    block
                                                    onClick={() =>
                                                        setDelConfirm(
                                                            !deleteComfirm
                                                        )
                                                    }
                                                >
                                                    삭제
                                                </CButton>
                                            </CCol>
                                        </div>
                                        <div className="form-inline mb-2">
                                            <CLabel className="mr-3">
                                                강의 제목
                                            </CLabel>
                                            <CInput
                                                placeholder="강의 제목 입력"
                                                className="mr-2"
                                            />
                                        </div>
                                        <div className="form-inline mb-2">
                                            <CLabel className="mr-3">
                                                강의 제목
                                            </CLabel>
                                            <CInput
                                                placeholder="강의 시간 입력"
                                                className="mr-2"
                                            />
                                            <span>분</span>
                                        </div>
                                        <div className="form-inline mb-2">
                                            <CLabel className="mr-3">
                                                개별 강의비
                                            </CLabel>
                                            <CInput
                                                placeholder="개별 강의비 입력"
                                                className="mr-2"
                                            />
                                            <span>원</span>
                                        </div>
                                        <div className="form-inline">
                                            <CInput
                                                className="col-6"
                                                placeholder="이미지를 등록해주세요."
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
                                            - mp4, avi 동영상 파일만 등록
                                            가능합니다.
                                        </p>
                                    </fieldset>
                                    <fieldset className="fieldset-custom mb-3">
                                        <div className="d-flex justify-content-between">
                                            <h4>3강</h4>
                                            <CCol md="2">
                                                <CButton
                                                    color="dark"
                                                    size="md"
                                                    block
                                                    onClick={() =>
                                                        setDelConfirm(
                                                            !deleteComfirm
                                                        )
                                                    }
                                                >
                                                    삭제
                                                </CButton>
                                            </CCol>
                                        </div>
                                        <div className="form-inline mb-2">
                                            <CLabel className="mr-3">
                                                강의 제목
                                            </CLabel>
                                            <CInput
                                                placeholder="강의 제목 입력"
                                                className="mr-2"
                                            />
                                        </div>
                                        <div className="form-inline mb-2">
                                            <CLabel className="mr-3">
                                                강의 제목
                                            </CLabel>
                                            <CInput
                                                placeholder="강의 시간 입력"
                                                className="mr-2"
                                            />
                                            <span>분</span>
                                        </div>
                                        <div className="form-inline mb-2">
                                            <CLabel className="mr-3">
                                                개별 강의비
                                            </CLabel>
                                            <CInput
                                                placeholder="개별 강의비 입력"
                                                className="mr-2"
                                            />
                                            <span>원</span>
                                        </div>
                                        <div className="form-inline">
                                            <CInput
                                                className="col-6"
                                                placeholder="이미지를 등록해주세요."
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
                                            - mp4, avi 동영상 파일만 등록
                                            가능합니다.
                                        </p>
                                    </fieldset>
                                    <CButton
                                        color="dark"
                                        shape="pill"
                                        className="mt-2"
                                    >
                                        <CIcon name="cil-plus" />
                                        &nbsp;강의 추가
                                    </CButton>
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
                                to="/class/davinci-maths/davinci-maths/"
                            >
                                취소
                            </CButton>
                        </CCol>
                        <CCol md="2">
                            <CButton
                                onClick={() => setSmall(!small)}
                                block
                                color="dark"
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
                    <CButton
                        color="dark"
                        to="/class/davinci-maths/davinci-maths/"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
            <CModal
                show={deleteComfirm}
                onClose={() => setDelConfirm(!deleteComfirm)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>삭제하시겠습니까?</p>
                    <CButton
                        variant="outline"
                        color="dark"
                        onClick={() => setDelConfirm(!deleteComfirm)}
                        className="mx-2"
                    >
                        취소
                    </CButton>
                    <CButton
                        color="dark"
                        onClick={() => setDelDone(!deleteDone)}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
            <CModal
                show={deleteDone}
                onClose={() => setDelDone(!deleteDone)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>삭제되었습니다.</p>

                    <CButton
                        color="dark"
                        onClick={() => setDelDone(!deleteDone)}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}

export default DavinciMathEdit
