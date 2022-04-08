import React, { useEffect, useState, useReducer } from 'react'
import {
    CButton,
    CInputFile,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInputRadio,
    CLabel,
    CModal,
    CModalBody,
    CRow,
    CTextarea,
} from '@coreui/react'
import { UserRole } from '../../../../constants/role.constants'
import { NoticeService } from '../../../../services/NoticeService'
import ModalNotification from 'src/views/common/ModalNotification'
import {
    POPUP_ENTER_REQUIRED_INFORMATION,
    POPUP_INFORMATION_SAVED,
} from 'src/constants/popup.constants'
import { setValueByNestedPath, handleChange } from 'src/utils/Utils'
import { StorageService } from 'src/services/StorageService'

const SUPPORTED_FORMATS = [
    "application/pdf",
    // "application/msword",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "image/jpg",
    "image/jpeg",
    "image/png"
];

const initNotice = {
    "title": '',
    "role": '',
    "content": '',
    "file": '',
    "fileName": ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'HANDLE_INIT':
            return { ...action.notice }

        case 'HANDLE_CHANGE':
            let newState = { ...state }
            let isFile = action.value instanceof File;

            if (isFile === true) {
                const foundedFormat = SUPPORTED_FORMATS.filter(s => s === action.value.type);

                setValueByNestedPath(
                    newState, 
                    action.name, 
                    foundedFormat.length > 0 ? action.value : null
                )

                setValueByNestedPath(
                    newState,
                    `${action.name}Name`,
                    action.value.name
                )
            } else {
                setValueByNestedPath(newState, action.name, action.value)
            }

            return newState;
    }
}

export default function NoticeSave(props) {
    const [notice, dispatch] = useReducer(reducer, initNotice)

    const [content, setContent] = useState('')

    const [popupShow, setPopupShow] = useState(false)
    const [small, setSmall] = useState(false)

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});

    // function handleChange(e) {
    //     const { name, value } = e.target
    //     setNotice({ ...notice, [name]: value })
    // }

    useEffect(() => {
        const attachmentError = notice.file === null;

        setErrors({...errors, "attachment": attachmentError});
    }, [notice.file])

    useEffect(() => {
        const noticeId = props.match.params.id

        if (noticeId) {

            NoticeService.getDetailsById(noticeId).then((resp) => {

                dispatch({ type: 'HANDLE_INIT', notice: resp.data })
            })
        }
    }, [props.match.params.id])

    function checkError() {
        const foundErrors = Object.values(errors).filter(s => s === true);

        return foundErrors.length === 0;
    }

    function handleSubmit(e) {
        e.stopPropagation()
        e.preventDefault()

        const form = e.currentTarget

        if (form.checkValidity() === true) {
            if (checkError() === true) {
                if (!notice.id) {

                    NoticeService.create(notice).then((resp) => {
    
                        if (resp.status === 201) {
    
                            StorageService.upload(resp.data.urls[0], notice.file).then((resp) => {
    
                                if (resp.status === 200) {
    
                                    setSmall(true)
                                }
                            })
                        }
                    })
                } else {
    
                    NoticeService.edit(notice, notice.id).then((resp) => {

                        if (resp.status === 204) {
    
                            setSmall(true)
                        }
                    })
                }
            }
        } else {

            setContent(POPUP_ENTER_REQUIRED_INFORMATION)
            setPopupShow(true)
        }

        setValidated(true);
    }

    return (
        <>
            <h2 className="mb-4">공지사항 등록</h2>
            <CForm
                noValidate
                wasValidated={validated}
                onSubmit={handleSubmit}
            >
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
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        공지사항 제목
                                    </td>
                                    <td>
                                        <CInput
                                            name="title"
                                            required
                                            className="col-6"
                                            placeholder="공지사항 제목 입력"
                                            value={notice.title}
                                            onChange={(ev) =>
                                                handleChange(dispatch, ev)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        구분
                                    </td>
                                    <td>
                                        <div className="radio-group-custom">
                                            <CFormGroup variant="checkbox">
                                                <CInputRadio
                                                    id="role_all"
                                                    name="role"
                                                    value=""
                                                    checked={
                                                        notice.role === null || notice.role === ''
                                                    }
                                                    onChange={(ev) =>
                                                        handleChange(
                                                            dispatch,
                                                            ev
                                                        )
                                                    }
                                                />
                                                <CLabel
                                                    variant="checkbox"
                                                    htmlFor="role_all"
                                                >
                                                    전체
                                                </CLabel>
                                            </CFormGroup>

                                            <CFormGroup variant="checkbox">
                                                <CInputRadio
                                                    id="role_student"
                                                    name="role"
                                                    value={UserRole.STUDENT.value}
                                                    checked={
                                                        notice.role ===
                                                        UserRole.STUDENT.value
                                                    }
                                                    onChange={(ev) =>
                                                        handleChange(
                                                            dispatch,
                                                            ev
                                                        )
                                                    }
                                                />
                                                <CLabel
                                                    variant="checkbox"
                                                    htmlFor="role_student"
                                                >
                                                    학생
                                                </CLabel>
                                            </CFormGroup>

                                            <CFormGroup variant="checkbox">
                                                <CInputRadio
                                                    id="role_parent"
                                                    name="role"
                                                    value={UserRole.PARENT.value}
                                                    checked={
                                                        notice.role ===
                                                        UserRole.PARENT.value
                                                    }
                                                    onChange={(ev) =>
                                                        handleChange(
                                                            dispatch,
                                                            ev
                                                        )
                                                    }
                                                />
                                                <CLabel
                                                    variant="checkbox"
                                                    htmlFor="role_parent"
                                                >
                                                    {' '}
                                                    학부모{' '}
                                                </CLabel>
                                            </CFormGroup>

                                            <CFormGroup variant="checkbox">
                                                <CInputRadio
                                                    id="role_tutor"
                                                    name="role"
                                                    value={UserRole.TUTOR.value}
                                                    checked={
                                                        notice.role ===
                                                        UserRole.TUTOR.value
                                                    }
                                                    onChange={(ev) =>
                                                        handleChange(
                                                            dispatch,
                                                            ev
                                                        )
                                                    }
                                                />
                                                <CLabel
                                                    variant="checkbox"
                                                    htmlFor="role_tutor"
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
                                                name="fileName"
                                                className="col-6"
                                                placeholder="파일을 등록해주세요."
                                                readOnly
                                                value={notice.fileName}
                                            />

                                            <span className="btn-upload-file ml-2">
                                                <CInputFile
                                                    id="file"
                                                    name="file"
                                                    placeholder="이미지를 등록해주세요."
                                                    onChange={(ev) =>
                                                        handleChange(
                                                            dispatch,
                                                            ev
                                                        )
                                                    }
                                                />
                                                <CLabel
                                                    htmlFor="file"
                                                    className="btnu-label"
                                                >
                                                    파일 선택
                                                </CLabel>
                                            </span>
                                        </div>
                                        <span 
                                            className="text-danger my-1" 
                                            hidden={
                                                validated === false || errors.attachment === false
                                            }
                                        >
                                            - 한글, ppt, pdf, img(jpg, png)
                                            파일만 등록 가능합니다.
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        내용
                                    </td>
                                    <td>
                                        {/*<HtmlEditor content={notice.content} handleContentChange={(content) => {
                                    setNotice({...notice, content})
                                }}/>*/}
                                        <CTextarea
                                            name="content"
                                            className="col-6"
                                            rows="20"
                                            required
                                            value={notice.content}
                                            onChange={(ev) =>
                                                handleChange(dispatch, ev)
                                            }
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
                                <CButton type="submit" block color="dark">
                                    {' '}
                                    저장{' '}
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CForm>
            <CModal
                show={small}
                onClose={() => setSmall(!small)}
                size="sm"
                centered
            >
                <CModalBody className="text-center">
                    <p>{POPUP_INFORMATION_SAVED}</p>
                    <CButton color="dark" to="/main/notices/notices">
                        확인
                    </CButton>
                </CModalBody>
            </CModal>

            <ModalNotification
                show={popupShow}
                onShow={setPopupShow}
                content={content}
            />
        </>
    )
}
