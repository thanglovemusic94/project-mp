import React, { useEffect, useState } from 'react'
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
    CInputFile,
    CLabel,
    CForm,
    CInvalidFeedback,
} from '@coreui/react'
import ModalNotification from 'src/views/common/ModalNotification';
import { POPUP_CAPACITY_EXCEEDED, POPUP_INFORMATION_SAVED } from 'src/constants/popup.constants';
import { EventBannerService } from 'src/services/EventBannerService';
import { StorageService } from 'src/services/StorageService';

const FILE_SIZE = 200 * 1024 * 1000;

const SUPPORTED_FORMAT_IMAGE = [
    "image/png",
    "image/jpeg"
]

const EventRegister = () => {
    const [notification, setNotification] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState("")

    const [errors, setErrors] = useState({
        "imagePc": false,
        "imageMb": false
    });

    const [data, setData] = useState({
        "imagePcOld": "",
        "imagePc": "",
        "imagePcName": "",
        "imageMbOld": "",
        "imageMb": "",
        "imageMbName": ""
    })

    const [refresh, setRefresh] = useState(1);

    useEffect(() => {

        EventBannerService.getBannerUrl().then((resp) => {

            if (resp.status === 200) {
                const { mobileImgUrl, pcImgUrl, mobileImgName, pcImgName } = resp.data;

                const formatter = (val) => {
                    return val !== null ? val : "";
                }
                
                let respData = { }
                
                respData.imageMbOld = formatter(mobileImgUrl);
                respData.imagePcOld = formatter(pcImgUrl);
                respData.imagePcName = pcImgName;
                respData.imageMbName = mobileImgName;

                setData({ ...data, ...respData });
            }
        })
    }, [refresh])

    function showPopup(message) {
        setNotificationMessage(message);
        setNotification(true);
    }


    function handleFileSelect(ev) {
        const file = ev.currentTarget.files[0];

        if (file) {
            const fileName = file.name;
            const targetName = ev.currentTarget.name;
            const targetKeyName = `${[targetName]}Name`;

            let valid = true;
    
            if (isSupportedFormat(file.type) === false) {
                valid = false

            } else if (file.size > FILE_SIZE) {
                valid = false;

                showPopup(POPUP_CAPACITY_EXCEEDED);
            }

            if (valid === true) {
                setErrors({ ...errors, [targetName]: false });
                setData({ ...data, [targetName]: file, [targetKeyName]: fileName });
            } else {
                setErrors({ ...errors, [targetName]: true })
                setData({ ...data, [targetName]: "", [targetKeyName]: fileName });
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();


        if (validateData() === true) {
            const uploadImgNamePC = data.imagePc !== "" ? data.imagePcName : null;
            const uploadImgNameMB = data.imageMb !== "" ? data.imageMbName : null;

            EventBannerService.saveBanner(uploadImgNamePC, uploadImgNameMB).then((resp) => {
                
                if (resp.status === 201) {
                    const { mobileImgUrl, pcImgUrl } = resp.data;

                    let tasks = [ ];

                    if (mobileImgUrl !== null) {
                        const uploadPcTask = StorageService.upload(mobileImgUrl, data.imageMb);
                        tasks.push(uploadPcTask);
                    }

                    if (pcImgUrl !== null) {
                        const uploadMbTask = StorageService.upload(pcImgUrl, data.imagePc);
                        tasks.push(uploadMbTask);
                    }

                    if (tasks.length > 0) {

                        Promise.all(tasks).then((results) => {
                            const fail = results.find(s => s.status !== 200);

                            if (fail === undefined) {
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

    function validateData() {
        let valid = {
            "imagePc": false,
            "imageMb": false
        }

        if (data.imagePc === "" && data.imagePcOld === "") valid.imagePc = true;
        if (data.imageMb === "" && data.imageMbOld === "") valid.imageMb = true;

        setErrors({ ...errors, ...valid });

        const foundErrors = Object.values(valid).filter(s => s === true);

        return foundErrors.length === 0;
    }

    return (
        <>
            <h2 className="mb-4">이벤트 배너 등록</h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={handleSubmit} noValidate>
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
                                        이벤트 배너 이미지(PC)
                                    </td>
                                    <td>
                                        <div className="form-inline">
                                            <CInput
                                                className="col-6"
                                                placeholder="파일을 등록해주세요."
                                                value={ data.imagePcName }
                                                onChange={() => { }}
                                                required
                                            />
                                            <span className="btn-upload-file ml-2">
                                                <CInputFile
                                                    id="photoDesktop"
                                                    name="imagePc"
                                                    onChange={ handleFileSelect }
                                                />
                                                <CLabel
                                                    htmlFor="photoDesktop"
                                                    className="btnu-label"
                                                >
                                                    파일 선택
                                                </CLabel>
                                            </span>
                                            <div className="text-danger mt-1" hidden={!(errors.imagePc === true)}>
                                                <span>
                                                    - 최대 200MB의 jpg, png 이미지 파일만
                                                    등록 가능합니다.
                                                </span>
                                                <br/>
                                                <span>
                                                    - 이미지 사이즈는 1920 x 195를
                                                    추천합니다.
                                                </span>
                                            </div>
                                        </div>
                                        <CImg
                                            src={ data.imagePcOld }
                                            fluidGrow
                                            className="my-2"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">*</span>
                                        이벤트 배너 이미지(Mobile)
                                    </td>
                                    <td>
                                        <div className="form-inline">
                                            <CInput
                                                className="col-6"
                                                placeholder="파일을 등록해주세요."
                                                value={ data.imageMbName }
                                                onChange={() => { }}
                                                required
                                            />
                                            <span className="btn-upload-file ml-2">
                                                <CInputFile
                                                    id="photoMobile"
                                                    name="imageMb"
                                                    onChange={ handleFileSelect }
                                                />
                                                <CLabel
                                                    htmlFor="photoMobile"
                                                    className="btnu-label"
                                                >
                                                    파일 선택
                                                </CLabel>
                                            </span>
                                            <div className="text-danger mt-1" hidden={!(errors.imageMb === true)}>
                                                <span>
                                                    - 최대 200MB의 jpg, png 이미지 파일만
                                                    등록 가능합니다.
                                                </span>
                                                <br />
                                                <span>
                                                    - 이미지 사이즈는 410 x 195를
                                                    추천합니다.
                                                </span>
                                            </div>
                                        </div>                                        
                                        <CImg
                                            src={ data.imageMbOld }
                                            width="300px"
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

export default EventRegister
