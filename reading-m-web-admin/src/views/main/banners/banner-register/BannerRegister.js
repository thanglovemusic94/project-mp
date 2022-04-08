import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CInput,
    CInputFile,
    CLabel,
    CModal,
    CModalBody,
    CRow,
    CInvalidFeedback,
    CFormGroup,
} from '@coreui/react'
import { BannerService } from '../../../../services/BannerService'
import ModalNotification from 'src/views/common/ModalNotification'
import {
    POPUP_CAPACITY_EXCEEDED,
    POPUP_ENTER_REQUIRED_INFORMATION,
    POPUP_INFORMATION_SAVED,
} from 'src/constants/popup.constants'
import { useHistory } from 'react-router-dom'

const FILE_SIZE = 200 * 1024 * 1000

export default function BannerRegister() {
    const history = useHistory()

    const [noticeMessage, setNoticeMessage] = useState(POPUP_ENTER_REQUIRED_INFORMATION)
    const [small, setSmall] = useState(false)
    const showPopup = (message) => {
        setNoticeMessage(message)
        setSmall(true)
    }

    const [savedPopup, setSavedPopup] = useState(false)
    const showSavedPopup = () => setSavedPopup(true)

    const [data, setData] = useState({
        "bannerName": null,
        "imageMb": null,
        "imagePc": null,
        "orderBanner": null,
    })

    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target

        if (e.target.type == 'file') {
            if (isFileSizeExceeded(e.target.files[0]) === true) {
                showPopup(POPUP_CAPACITY_EXCEEDED)
            }

            setData({ ...data, [name]: e.target.files[0] })
            setErrors({ ...errors, [name]: validate(name, e.target.files[0]) })
        } else {
            setData({ ...data, [name]: value })
            setErrors({ ...errors, [name]: validate(name, value) })
        }
    }

    const validate = (name, value) => {
        switch (name) {
            case 'bannerName':
                if (!value || value.trim() === '') {
                    return true
                }

                return false

            case 'imageMb':
                if (
                    !value ||
                    isFileSizeExceeded(value) === true ||
                    isImageType(value) === false
                ) {
                    return true
                }

                return false

            case 'imagePc':
                if (
                    !value ||
                    isFileSizeExceeded(value) === true ||
                    isImageType(value) === false
                ) {
                    return true
                }

                return false

            case 'orderBanner':
                if (!value || parseInt(value) < 1) {
                    return true
                }

                return false

            default: {
                return true
            }
        }
    }

    const isFileSizeExceeded = (file) => {
        return file.size > FILE_SIZE
    }

    const isImageType = (file) => {
        let types = ['image/png', 'image/jpeg']

        let isValid = false

        for (const type of types) {
            if (file.type === type) {
                isValid = true

                break
            }
        }

        return isValid
    }

    const handleOnCloseSavedPopup = () => {
        history.push('/main/banners')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()

        let validationErrors = {}

        Object.keys(data).forEach((name) => {
            const error = validate(name, data[name])

            if (error) {
                validationErrors[name] = error
            }
        })

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)

            showPopup(POPUP_ENTER_REQUIRED_INFORMATION)

            return
        } else {
            const formData = new FormData()

            formData.append('name', data.bannerName)
            formData.append('imageMb', data.imageMb)
            formData.append('imagePc', data.imagePc)
            formData.append('orderBanner', data.orderBanner)

            BannerService.post(formData).then((resp) => {
                if (resp.status === 200) {
                    showSavedPopup()
                }
            })
        }
    }

    return (
        <>
            <h2 className="mb-4">메인 배너 등록</h2>
            <CCard>
                <CCardBody>
                    <div className="d-flex justify-content-end">
                        {(errors.name ||
                            errors.imagePc ||
                            errors.imageMb ||
                            errors.orderBanner) && (
                            <p className="text-danger">
                                * 표시된 영역은 필수 입력 영역 입니다.
                            </p>
                        )}
                    </div>
                    <p></p>
                    <CForm 
                        noValidate
                        onSubmit={handleSubmit}>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className="td203" htmlFor="banner_name">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        메인 배너명
                                    </td>
                                    <td>
                                        <CInput
                                            id="banner_name"
                                            className="col-6"
                                            placeholder="메인 배너명 입력"
                                            name="bannerName"
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        메인 배너 이미지 (PC)
                                    </td>
                                    <td>
                                        <div className="form-inline">
                                            <CInput
                                                id="banner_pc"
                                                className="col-6"
                                                placeholder="이미지를 등록해주세요."
                                                value={
                                                    data.imagePc
                                                        ? data.imagePc.name
                                                        : ''
                                                }
                                                onChange={() => {}}
                                            />
                                            <span className="btn-upload-file ml-2">
                                                <CInputFile
                                                    id="imagePc"
                                                    type="file"
                                                    name="imagePc"
                                                    onChange={handleInputChange}
                                                    placeholder="이미지를 등록해주세요."
                                                />
                                                <CLabel
                                                    htmlFor="imagePc"
                                                    className="btnu-label"
                                                >
                                                    파일 선택
                                                </CLabel>
                                            </span>
                                        </div>
                                        {errors.imagePc && (
                                            <>
                                                <p className="text-danger my-1">
                                                    - 최대 200MB의 jpg, png
                                                    이미지 파일만 등록
                                                    가능합니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 이미지 사이즈는 1920 x
                                                    580를 추천합니다.
                                                </p>
                                            </>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        메인 배너 이미지(Mobile)
                                    </td>
                                    <td>
                                        <CFormGroup>
                                            <div className="form-inline">
                                                <CInput
                                                    id="banner_mobile"
                                                    className="col-6"
                                                    placeholder="이미지를 등록해주세요."
                                                    value={
                                                        data.imageMb
                                                            ? data.imageMb.name
                                                            : ''
                                                    }
                                                    onChange={() => {}}
                                                />

                                                <span
                                                    className="btn-upload-file ml-2"
                                                    id="clickMb"
                                                >
                                                    <CInputFile
                                                        id="imageMb"
                                                        type="file"
                                                        name="imageMb"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />
                                                    <CLabel
                                                        htmlFor="imageMb"
                                                        className="btnu-label"
                                                    >
                                                        파일 선택
                                                    </CLabel>
                                                </span>
                                            </div>
                                        </CFormGroup>
                                        {errors.imageMb && (
                                            <div>
                                                <p className="text-danger my-1">
                                                    - 최대 200MB의 jpg, png
                                                    이미지 파일만 등록
                                                    가능합니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 이미지 사이즈는 410 x
                                                    490를 추천합니다.
                                                </p>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        노출 순서
                                    </td>
                                    <td>
                                        <CInput
                                            type="text"
                                            className="col-6"
                                            placeholder="노출 순서를 입력해주세요."
                                            name="orderBanner"
                                            onChange={handleInputChange}
                                            required
                                            pattern="^[1-9]*$"
                                        />

                                        {errors.orderBanner && (
                                            <div>
                                                <p className="text-danger my-1">
                                                    - 숫자만 입력이 가능하며,
                                                    텍스트 입력시 순서가
                                                    반영되지 않으며 마지막에
                                                    노출됩니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 숫자는 음수와 0을 제외한
                                                    모든 양수로 입력이
                                                    가능합니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 숫자는 작을수록 메인 배너
                                                    영역 맨 처음에 노출됩니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 동일한 숫자 입력 시, 최근
                                                    등록한 배너가 더 먼저
                                                    노출됩니다.
                                                </p>
                                            </div>
                                        )}
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
                                    to="/main/banners"
                                >
                                    취소
                                </CButton>
                            </CCol>
                            <CCol md="2">
                                <CButton block color="dark" type="submit">
                                    저장
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
            {/* <CModal
                show={small}
                onClose={() => setSmall(!small)}
                size="sm"
                centered
            >
                <CModalBody className="text-center">
                    <p>저장되었습니다.</p>
                    <CButton color="dark" to="/main/banners">
                        확인
                    </CButton>
                </CModalBody>
            </CModal> */}

            <ModalNotification
                show={small}
                onShow={setSmall}
                content={noticeMessage}
            />

            <ModalNotification
                show={savedPopup}
                onClose={handleOnCloseSavedPopup}
                onShow={setSavedPopup}
                content={POPUP_INFORMATION_SAVED}
                clickOnBackToClose={false}
            />
        </>
    )
}
