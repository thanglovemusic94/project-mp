import React, { useState, useReducer, useEffect } from 'react'
import {
    CCardBody,
    CForm,
    CButton,
    CCard,
    CCol,
    CInput,
    CRow,
    CModal,
    CModalBody,
    CLabel,
    CInputFile,
    CImg,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import { ClassService } from 'src/services/ClassService'
import { StorageService } from 'src/services/StorageService'
import { setValueByNestedPath, handleChange } from 'src/utils/Utils'
import { POPUP_CAPACITY_EXCEEDED, POPUP_HAS_BEEN_DELETED, POPUP_INFORMATION_SAVED } from 'src/constants/popup.constants'
import ModalNotification from 'src/views/common/ModalNotification'
import ModalConfirmation from 'src/views/common/ModalConfirmation'
import NumberFormat from "react-number-format";

const emptyVid = {
    name: '',
    time: '',
    fee: '',
    video: '',
    videoName: '',
}

const initClazz = {
    intro: '',
    image: '',
    imageName: '',
    grade: '',
    videos: [{ ...emptyVid }],
    guide: '',
    stdNo: '',
    materials: '',
    name: '',
    tuitionFee: '',
}

const clazzReducer = (state, action) => {
    switch (action.type) {
        case 'HANDLE_INIT_EDIT':
            return { ...initClazz, ...action.clazz }
        case 'HANDLE_CHANGE':
            let newState = { ...state }
            setValueByNestedPath(newState, action.name, action.value)

            // if input is a file, set its filename too
            if (action.value instanceof File) {
                setValueByNestedPath(
                    newState,
                    `${action.name}Name`,
                    action.value.name
                )
            }
            // if previous input is a file, and new value is null,
            // empty its filename too
            else if (state[action.name] instanceof File) {
                setValueByNestedPath(
                    newState,
                    `${action.name}Name`,
                    ""
                )
            }
            return { ...state, ...newState }
        case 'HANDLE_CHANGE_IMAGE':
            let nState = { ...state }
            setValueByNestedPath(nState, action.name, action.value)
            return { ...state, ...nState }
        case 'HANDLE_ADD_VID':
            return {
                ...state,
                videos: state.videos.concat(_.cloneDeep(emptyVid)),
            }
        case 'HANDLE_DELETE_VID':
            const videos = [...state.videos]
            videos.splice(action.index, 1)
            return { ...state, videos }
        default:
            throw new Error()
    }
}

const videosContext = React.createContext()

const FILE_SIZE = 200 * 1024 * 1000;
const SUPPORTED_FORMAT_IMAGE = [
    "image/png",
    "image/jpeg"
]
const SUPPORTED_FORMAT_VIDEO = [
    "video/mp4",
    "video/x-msvideo"
]

export default function DavinciMathRegister(props) {
    const history = useHistory();

    const [clazz, dispatchClazz] = useReducer(clazzReducer, initClazz)

    const [small, setSmall] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const [savedPopup, setSavedPopup] = useState(false);
    const [modalMessage, setModalMessage] = useState(POPUP_CAPACITY_EXCEEDED);
    const [isNew, setIsNew] = useState(true)
    const [validated, setValidated] = useState(false)
    const [errorMessages, setErrorMessages] = useState({
        "lectureImage": false,
        "lessionVideo": []
    })

    const [toDeleteIndex, setToDeleteIndex] = useState(-1);

    const [imageInputKey, setImageInputKey] = useState(new Date());
    const getClassById = (id) => ClassService.getClassById(id).then((resp) => {
        setIsNew(false)
        dispatchClazz({ type: 'HANDLE_INIT_EDIT', clazz: resp.data })
    })
    useEffect(() => {
        const id = props.match.params.id
        if (id) {
            getClassById(id)
        }
    }, [props.match.params.id])


    function isFileSizeExceeded(file) {
        return file.size > FILE_SIZE;
    }

    function isSupportedFormat(listFormat: any, file) {
        let checkSupport = listFormat.filter(value => value === file.type);
        if (checkSupport.length === 0) return false
    }

    function dataValidation() {
        let checkValidate = true;

        if (isNew === true) {
            let lectureImage = false;
            if (isSupportedFormat(SUPPORTED_FORMAT_IMAGE, clazz.image) === false) {
                lectureImage = true;
                checkValidate = false;
            }

            let lessionVideo = []
            for (const item of clazz.videos) {
                if (isSupportedFormat(SUPPORTED_FORMAT_VIDEO, item.video) === false) {
                    lessionVideo.push(true);
                    checkValidate = false;
                } else {
                    lessionVideo.push(false);
                }
            }

            setErrorMessages({
                ...errorMessages,
                "lectureImage": lectureImage,
                "lessionVideo": [...lessionVideo]
            })
        }

        return checkValidate;
    }

    function showPopup(content) {
        setModalMessage(content);
        setSmall(true);
    }

    function confirmDelete(index) {
        setToDeleteIndex(index);
        setDeletePopup(true);
    }

    function uploadFileAfterSubmit(storageUrls) {
        const preSgnUrls = storageUrls

        if (preSgnUrls.image !== null) {
            StorageService.upload(preSgnUrls.image, clazz.image)
        }

        let videoUploadIndexes = [];
        for (let i = 0; i < clazz.videos.length; i++) {

            if (clazz.videos[i].videoName !== undefined) {
                videoUploadIndexes.push(i);
            }
        }

        for (let i = 0; i < preSgnUrls.videos.length; i++) {
            StorageService.upload(
                preSgnUrls.videos[i],
                clazz.videos[videoUploadIndexes[i]].videoName
            )
        }
    }


    function handleDeleteVid(index) {
        dispatchClazz({ type: 'HANDLE_DELETE_VID', "index": toDeleteIndex });
        setToDeleteIndex(-1);
        setDeletePopup(false);
        showPopup(POPUP_HAS_BEEN_DELETED);
    }

    function handleAddVid() {
        dispatchClazz({ type: 'HANDLE_ADD_VID' })
    }

    function handleClearSelectedImage() {

        setImageInputKey(new Date());
        handleChange(dispatchClazz, {currentTarget: {name: "image", value: ""}});
    }

    function handleImageSelected(ev) {
        const file = ev.target.files[0];

        if (file !== undefined) {
            if (isFileSizeExceeded(file) === true) {
                setErrorMessages({...errorMessages, lectureImage: true})
                showPopup(POPUP_CAPACITY_EXCEEDED);
            } else {
                handleChange(
                    dispatchClazz,
                    ev
                )
            }
        }
    }

    function handleOnCloseSavedPopup() {

        history.push("/class/davinci-maths/davinci-maths/");
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        const form = ev.currentTarget


        let checkValidateFile = dataValidation()
        if (form.checkValidity() && checkValidateFile === true) {
            if (isNew) {
                ClassService.postClass({ davinci: clazz }).then((resp) => {
                    if (resp.status === 201) {
                        uploadFileAfterSubmit(resp.data);
                        setSavedPopup(true);
                    }
                })
            } else {
                let body = {
                    ...clazz
                }

                if (clazz.image !== "") {
                    body.imageUrl = null;
                    body.imageFileName = clazz.imageName;
                }

                for (let i = 0; i < clazz.videos.length; i++) {

                    if (clazz.videos[i].video !== undefined) {
                        body.videos[i].videoUrl = null;
                    }
                }

                ClassService.putDavinciClassEdit(props.match.params.id, body).then((resp) => {
                    if (resp.status === 200) {
                        uploadFileAfterSubmit(resp.data);
                        setSavedPopup(true);
                    }
                })
            }
        } else {
            setValidated(true)

        }
    }

    return (
        <videosContext.Provider
            value={{ dispatchClazz, validated, errorMessages, confirmDelete, isNew }}
        >
            <h2 className="mb-4">과학수학 다빈치 등록</h2>
            <CCard>
                <CCardBody>
                    <CForm
                        className={validated ? 'was-validated' : ''}
                        noValidate
                        method="post"
                        onSubmit={handleSubmit}
                    >
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
                                        강의명
                                    </td>
                                    <td>
                                        <CInput
                                            required
                                            name="name"
                                            className="col-6"
                                            placeholder="강의명 입력"
                                            value={clazz.name}
                                            onChange={(ev) =>
                                                handleChange(dispatchClazz, ev)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        강의 소개
                                    </td>
                                    <td>
                                        <CInput
                                            required
                                            name="intro"
                                            className="col-6"
                                            placeholder="강의 소개 입력"
                                            value={clazz.intro}
                                            onChange={(ev) =>
                                                handleChange(dispatchClazz, ev)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        대상학생
                                    </td>
                                    <td>
                                        <CInput
                                            required
                                            name="grade"
                                            className="col-6"
                                            placeholder="대상학생 입력"
                                            value={clazz.grade}
                                            onChange={(ev) =>
                                                handleChange(dispatchClazz, ev)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        수업 준비
                                    </td>
                                    <td>
                                        <CInput
                                            required
                                            name="materials"
                                            className="col-6"
                                            placeholder="수업 준비 입력"
                                            value={clazz.materials}
                                            onChange={(ev) =>
                                                handleChange(dispatchClazz, ev)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        전체 강의비
                                    </td>
                                    <td>
                                        <div className="form-inline">

                                            <NumberFormat
                                                className={'form-control col-6'}
                                                thousandsGroupStyle="thousand"
                                                value={clazz.tuitionFee}
                                                prefix=""
                                                decimalSeparator="."
                                                displayType="input"
                                                type="text"
                                                required
                                                placeholder="전체 강의비 입력"
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                isNumericString={false}
                                                name="tuitionFee"
                                                onChange={(ev) =>
                                                    {
                                                        handleChange(
                                                            dispatchClazz,
                                                            ev
                                                        )
                                                    }
                                                }
                                            />

                                            <span className="ml-2">원</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        강의 이미지
                                    </td>
                                    <td>
                                        <div className="form-inline">
                                            <CInput
                                                required
                                                id="banner_pc"
                                                className="col-6"
                                                placeholder={clazz.imageFileName ? clazz.imageFileName : "이미지를 등록해주세요."}
                                                readOnly
                                                value={clazz.imageName}
                                            />
                                            <span className="btn-upload-file ml-2">
                                                <CInputFile
                                                    key={imageInputKey}
                                                    required={isNew === true}
                                                    id="photoMobile"
                                                    name="image"
                                                    onChange={(ev) => handleImageSelected(ev)}
                                                />
                                                <CLabel
                                                    htmlFor="photoMobile"
                                                    className="btnu-label"
                                                >
                                                    파일 선택
                                                </CLabel>
                                            </span>
                                            <CButton className="mx-2" onClick={handleClearSelectedImage}>X</CButton>
                                            {
                                                clazz.imageUrl !== undefined &&
                                                <CImg
                                                    src={clazz.imageUrl}
                                                    fluidGrow
                                                    className="my-2"
                                                />
                                            }
                                        </div>
                                        {
                                            errorMessages.lectureImage === true &&
                                            <p className="text-danger my-1">
                                                - 최대 200MB의 jpg, png 이미지
                                                파일만 등록 가능합니다.
                                            </p>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">
                                            *
                                        </span>
                                        강의 등록
                                    </td>
                                    <td>
                                        {clazz.videos.map((video, index) => (
                                            <LectureItem
                                                video={video}
                                                index={index}
                                                key={`lecture-video-${index}`}
                                            />
                                        ))}

                                        <CButton
                                            color="dark"
                                            shape="pill"
                                            className="mt-2"
                                            onClick={handleAddVid}
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
                                <CButton type="submit" block color="dark">
                                    저장
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
            <ModalNotification
                show={small}
                onShow={setSmall}
                content={modalMessage}
            />
            <ModalNotification
                show={savedPopup}
                onClose={handleOnCloseSavedPopup}
                onShow={setSavedPopup}
                content={POPUP_INFORMATION_SAVED}
                clickOnBackToClose={false}
            />
            <ModalConfirmation
                show={deletePopup}
                onShow={setDeletePopup}
                onConfirm={handleDeleteVid}
            />
        </videosContext.Provider>
    )
}

function LectureItem({ video, index }) {
    const { dispatchClazz, validated, errorMessages, confirmDelete, isNew } = React.useContext(videosContext)

    return (
        <fieldset className="fieldset-custom mb-3">
            <CRow>
                <CCol sm="8">
                    <div className="d-flex justify-content-between">
                        <h4>{index + 1}강</h4>
                        {
                            index !== 0 &&
                            <CCol md="2">
                                <CButton
                                    color="dark"
                                    size="md"
                                    block
                                    onClick={() => confirmDelete(index)}
                                >
                                    삭제
                                </CButton>
                            </CCol>
                        }
                    </div>
                    <div className="form-inline mb-2">
                        <CLabel className="mr-3">강의 제목</CLabel>
                        <CInput
                            required
                            placeholder="강의 제목 입력"
                            className="mr-2"
                            name={`videos[${index}].name`}
                            value={video.name}
                            onChange={(ev) => handleChange(dispatchClazz, ev)}
                        />
                    </div>
                    <div className="form-inline mb-2">
                        <CLabel className="mr-3">강의 시간</CLabel>
                        <CInput
                            required
                            placeholder="강의 시간 입력"
                            className="mr-2"
                            name={`videos[${index}].time`}
                            //pattern="^[0-9]*$"
                            type={'number'}
                            min={0}
                            value={video.time}
                            onChange={(ev) => handleChange(dispatchClazz, ev)}
                        />
                        <span>분</span>
                    </div>
                    <div className="form-inline mb-2">
                        <CLabel className="mr-3">개별 강의비</CLabel>
                        <NumberFormat
                            className={'form-control col-6'}
                            thousandsGroupStyle="thousand"
                            value={video.fee}
                            prefix=""
                            decimalSeparator="."
                            displayType="input"
                            type="text"
                            required
                            placeholder="개별 강의비 입력"
                            thousandSeparator={true}
                            allowNegative={false}
                            isNumericString={false}
                            name={`videos[${index}].fee`}
                            onChange={(ev) => {
                                handleChange(dispatchClazz, ev)
                                }
                            }
                        />

                        <span>원</span>
                    </div>
                    <div className="form-inline">
                        <CInput
                            required
                            className="col-6"
                            placeholder="이미지를 등록해주세요."
                            readOnly
                            value={video.videoName ? video.videoName : ""}
                        />
                        <span className="btn-upload-file ml-2">
                            <CInputFile
                                required={isNew === true}
                                id={`videos[${index}].video`}
                                name={`videos[${index}].video`}
                                onChange={(ev) =>
                                    handleChange(dispatchClazz, ev)
                                }
                            />
                            <CLabel
                                htmlFor={`videos[${index}].video`}
                                className="btnu-label"
                            >
                                파일 선택
                            </CLabel>
                        </span>
                    </div>
                    {
                        validated === true && errorMessages.lessionVideo[index] === true &&
                        <p className="text-danger my-1">
                            - mp4, avi 동영상 파일만 등록 가능합니다.
                        </p>
                    }
                </CCol>
            </CRow>
        </fieldset>
    )
}
