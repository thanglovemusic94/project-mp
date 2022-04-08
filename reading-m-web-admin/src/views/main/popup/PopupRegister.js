import React, { useState, useEffect } from 'react'
import {
    CCardBody,
    CButton,
    CCard,
    CCol,
    CInput,
    CRow,
    CImg,
    CInputFile,
    CLabel,
    CForm,
    CInvalidFeedback,
} from '@coreui/react'
import { trackPromise } from 'react-promise-tracker'
import ModalNotification from 'src/views/common/ModalNotification';
import { POPUP_CAPACITY_EXCEEDED, POPUP_INFORMATION_SAVED } from 'src/constants/popup.constants';
import { MainPopupSerivce } from 'src/services/MainPopupService';
import { StorageService } from 'src/services/StorageService';

const FILE_SIZE = 200 * 1024 * 1000;

const SUPPORTED_FORMAT_IMAGE = [
    "image/png",
    "image/jpeg"
]

const PopupRegister = () => {
    const [notification, setNotification] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState("");

    const [data, setData] = useState({
        "image":"",
        "imageName": "",
        "imageUrl": "",
        "videoUrl": "",
        "savedImageUrl": ""
    })

    const [errors, setErrors] = useState({
        "popupImage": ""
    });

    const [refresh, setRefresh] = useState(1);

    useEffect(() => {

        MainPopupSerivce.getDetail().then(res => {

            if (res.status === 200) {
                const { imageName, imageUrl, videoUrl } = res.data;
                
                let resData = {
                    "imageName": imageName !== null ? imageName : "",
                    "imageUrl": imageUrl !== null ? imageUrl : "",
                    "videoUrl": videoUrl !== null ? videoUrl : ""
                }
                resData["savedImageUrl"] = resData.imageUrl;

                setData({ ...data, ...resData });
            }
        })
    }, [refresh])

    function showPopup(message) {
        setNotificationMessage(message);
        setNotification(true);
    }

    function handleTextChange(ev) {
        const targetName = ev.currentTarget.name;
        const targetValue = ev.currentTarget.value;

        setData({ ...data, [targetName]: targetValue });
    }

    function handleFileSelect(ev) {
        const file = ev.currentTarget.files[0];

        if (file) {
            const fileName = file.name;
            const targetName = ev.currentTarget.name;
            const targetKeyName = `${[targetName]}Name`;

            let valid = true;
    
            if (isSupportedFormat(file.type) === false) {
                valid = false;

            } else if (file.size > FILE_SIZE) {
                valid = false;

                showPopup(POPUP_CAPACITY_EXCEEDED);
            }

            if (valid === true) {
                setData({ ...data, [targetName]: file, [targetKeyName]: fileName});
                setErrors({ ...errors, "popupImage": false });
            } else {
                setData({ ...data, [targetName]: "", [targetKeyName]: fileName});
                setErrors({ ...errors, "popupImage": true });
            }
        }
    }

    function checkErrors() {
        let hasError = false;

        if (data.image === "" && data.savedImageUrl === "") {
            hasError = true;

            setErrors({...errors, "popupImage": true});
        }

        if (hasError === false) {
            const foundErrors = Object.values(errors).filter(s => s === true);

            hasError = foundErrors.length > 0;
        }

        return !hasError;
    }

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (checkErrors() === true) {

            trackPromise(
                MainPopupSerivce.registerPopup({'imageUrl': data.imageName, 'videoUrl': data.videoUrl})
            ).then((resp) => {
                    
                if (resp.status === 201) {
                    const { imageUrl } = resp.data;

                    if (imageUrl !== null && data.image !== "") {
                        
                        StorageService.upload(imageUrl, data.image).then((res) => {

                            if (res.status === 200) {
                                setRefresh(-refresh);
                                showPopup(POPUP_INFORMATION_SAVED);
                            }
                        })
                    } else {
                        showPopup(POPUP_INFORMATION_SAVED);
                    }
                }
            })
        }
    }

    function isSupportedFormat(fileType) {

        for (const type of SUPPORTED_FORMAT_IMAGE) {

            if (fileType === type) return true;
        }

        return false;
    }

    return (
        <>
            <h2 className="mb-4">메인 팝업 등록</h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={ handleSubmit } noValidate>
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
                                        팝업 이미지 <br />
                                        (PC/Mobile 공통)
                                    </td>
                                    <td>
                                        <div className="form-inline">
                                            <CInput
                                                id="imageUrl"
                                                name="imageUrl"
                                                className="col-6"
                                                placeholder="파일을 등록해주세요."
                                                value={ data.imageName }
                                                onChange={() => {}}
                                                required
                                            />
                                            <span className="btn-upload-file ml-2">
                                                <CInputFile
                                                    id="image"
                                                    name="image"
                                                    onChange={handleFileSelect}
                                                />
                                                <CLabel
                                                    htmlFor="image"
                                                    className="btnu-label"
                                                >
                                                    파일 선택
                                                </CLabel>
                                            </span>
                                            <div className="text-danger mt-1" hidden={!(errors.popupImage === true)}>
                                                <span>
                                                    - 최대 200MB의 jpg, png 이미지 파일만
                                                    등록 가능합니다.
                                                </span>
                                                <br />
                                                <span>
                                                    - 이미지 사이즈는 385 x 480를
                                                    추천합니다.
                                                </span>
                                            </div>
                                        </div>
                                        <CImg
                                            src={data.savedImageUrl}
                                            width="300px"
                                            className="my-2"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1"></span>{' '}
                                        URL
                                    </td>
                                    <td>
                                        <CInput
                                            name="videoUrl"
                                            type="search"
                                            className="col-6"
                                            placeholder="ex: https://www.youtube.com/embed/3aX2zkh4OdM"                                            onChange={handleTextChange}
                                            onChange={handleTextChange}
                                            value={ data.videoUrl }
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
                                    type="submit"
                                >
                                    저장
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
            <ModalNotification
                show={ notification }
                onShow={ setNotification }
                content={ notificationMessage }
            />
        </>
    )
}

export default PopupRegister
