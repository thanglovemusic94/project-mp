import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CImg,
    CInput,
    CInputFile,
    CLabel,
    CModal,
    CModalBody,
    CRow
} from '@coreui/react'
import { useHistory, useParams } from "react-router-dom";
import { MagazineService } from "../../../../services/MagazineService";
import { POPUP_CAPACITY_EXCEEDED, POPUP_INFORMATION_SAVED } from 'src/constants/popup.constants';
import ModalNotification from 'src/views/common/ModalNotification';

const FILE_SIZE = 200 * 1024 * 1000;
// https://www.npmjs.com/package/react-doc-viewer#custom-renderer
const SUPPORTED_FORMATS = [
    "application/pdf",
    // "application/msword",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "image/jpg",
    "image/jpeg",
    "image/png"
];

const MagazineEdit = () => {
    let { id } = useParams();
    const history = useHistory();

    const [small, setSmall] = useState(false)
    const showNoticePopup = () => setSmall(true);

    const [savedPopup, setSavedPopup] = useState(false);
    const showSavedPopup = () => setSavedPopup(true);

    const [errors, setErrors] = useState({})

    const [selectedFiles, setSelectedFiles] = useState({
        "imageMb": null,
        "imagePc": null,
        "attachment": null
    })
    const [dataDetail, setDataDetail] = useState({
        "title": null,
        "imageMb": "",
        "imagePc": "",
        "file": null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (e.target.type == 'file') {
            if (name !== "attachment") {
                if (isFileSizeExceeded(e.target.files[0]) === true) {

                    showNoticePopup();
                }
            }

            setSelectedFiles({ ...selectedFiles, [name]: e.target.files[0] })
            setErrors({ ...errors, [name]: validate(name, e.target.files[0]) })
        } else {
            setDataDetail({ ...dataDetail, [name]: value })
            setErrors({ ...errors, [name]: validate(name, value) })
        }
    }

    // const checkValidateFile = (value) =>{
    //     if (typeof value === 'string') {
    //         return false;
    //     } else {
    //         if (value.size > FILE_SIZE) {
    //             return true;
    //         } else {
    //             if (SUPPORTED_FORMATS.filter(value1 => value1 === value.type).length <= 0) return true
    //         }
    //     }
    // }

    const getFileNameFromURL = (url) => {

        if (url !== null && url.length > 0) {
            const start = url.lastIndexOf("/");
            const name = url.substring(start + 1);

            return name;
        }

        return "";
    }

    const validate = (name, value) => {
        switch (name) {
            case "title":
                if (!value || value.trim() === "") {

                    return true;
                }

                return false;

            case "imageMb":
            case "imagePc":
                if (isImageType(value) === false || isFileSizeExceeded(value) === true) {

                    return true;
                }

                return false;

            case "attachment":
                if (!value || SUPPORTED_FORMATS.filter(value1 => value1 === value.type).length <= 0) {

                    return true;
                }
                return false;

            default: {
                return true;
            }
        }
    };

    const isFileSizeExceeded = (file) => {

        return (file.size > FILE_SIZE);
    }

    const isImageType = (file) => {
        let types = [
            "image/jpg",
            "image/jpeg",
            "image/png"
        ]

        let isValid = false;

        for (const type of types) {

            if (file.type === type) {

                isValid = true;

                break;
            }
        }

        return isValid;
    }

    const handleOnCloseSavedPopup = () => {

        history.push("/main/magazines");
    }

    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        let validationErrors = {};

        if (validate("title", dataDetail["title"]) === true)
            validationErrors["title"] = true;

        Object.keys(selectedFiles).forEach(name => {
            let error = false;

            if (selectedFiles[name] !== null)
                error = validate(name, selectedFiles[name]);

            if (error) {
                validationErrors[name] = error;
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            
            setErrors(validationErrors);

            return;
        } else {
            const formData = new FormData();

            formData.append("title", dataDetail.title)

            if (selectedFiles.imageMb !== null && selectedFiles.imageMb.size > 0)
                formData.append("imageMb", selectedFiles.imageMb)

            if (selectedFiles.imagePc !== null && selectedFiles.imagePc.size > 0)
                formData.append("imagePc", selectedFiles.imagePc)

            if (selectedFiles.attachment !== null && selectedFiles.attachment.size > 0)
                formData.append("file", selectedFiles.attachment)

            MagazineService.patch(formData, id).then((resp) => {

                if (resp.status === 200) {

                    showSavedPopup();
                }
            })
        }
    }

    useEffect(() => {
        // Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));

        MagazineService.getById(id).then(response => {

            if (response.status === 200) {
                const { title, imagePc, imageMb, file } = response.data
                
                setDataDetail({ title, imagePc, imageMb, file })
            }
        })
    }, [id]);


    return (
        <>
            <h2 className="mb-4">메인 배너 수정</h2>
            <CCard>
                <CCardBody>
                    <div className="d-flex justify-content-end">
                        {Object.keys(errors).filter(value => errors[value] === true).length > 0 &&
                            <p className="text-danger">
                                * 표시된 영역은 필수 입력 영역 입니다.
                            </p>
                        }

                    </div>
                    <CForm onSubmit={onSubmit}>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className="td203">메인 배너명</td>
                                    <td>
                                        <CInput
                                            id="banner_name"
                                            name="title"
                                            className="col-6"
                                            placeholder="메인 배너명 입력"
                                            onChange={handleInputChange}
                                            value={dataDetail.title ? dataDetail.title : ''}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">메인 배너 이미지 (PC)</td>
                                    <td>
                                        <div className="form-inline">
                                            <CInput
                                                id="banner_pc"
                                                className="col-6"
                                                placeholder="이미지를 등록해주세요."
                                                value={selectedFiles.imagePc !== null ? selectedFiles.imagePc.name : getFileNameFromURL(dataDetail.imagePc)}
                                                readOnly
                                            />
                                            <span className="btn-upload-file ml-2">
                                                <CInputFile
                                                    id="imagePc"
                                                    name="imagePc"
                                                    type="file"
                                                    onChange={handleInputChange}
                                                />
                                                <CLabel
                                                    htmlFor="imagePc"
                                                    className="btnu-label"
                                                >
                                                    파일 선택
                                                </CLabel>
                                            </span>
                                        </div>
                                        {errors.imagePc &&
                                            <>
                                                <p className="text-danger my-1">
                                                    - 최대 200MB의 jpg, png 이미지 파일만
                                                    등록 가능합니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 이미지 사이즈는 225 x 315를
                                                    추천합니다.
                                                </p>
                                            </>
                                        }
                                        <CImg
                                            src={dataDetail.imagePc}
                                            className="my-2"
                                            width="200px"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        메인 배너 이미지(Mobile)
                                    </td>
                                    <td>
                                        <div className="form-inline">
                                            <CInput
                                                id="banner_mobile"
                                                className="col-6"
                                                placeholder="이미지를 등록해주세요."
                                                value={selectedFiles.imageMb !== null ? selectedFiles.imageMb.name : getFileNameFromURL(dataDetail.imageMb)}
                                                readOnly
                                            />
                                            <span className="btn-upload-file ml-2">
                                                <CInputFile
                                                    id="photoMobile"
                                                    name="imageMb"
                                                    type="file"
                                                    onChange={handleInputChange}

                                                />
                                                <CLabel
                                                    htmlFor="photoMobile"
                                                    className="btnu-label"
                                                >
                                                    파일 선택
                                                </CLabel>
                                            </span>
                                        </div>
                                        {errors.imageMb &&
                                            <>
                                                <p className="text-danger my-1">
                                                    - 최대 200MB의 jpg, png 이미지 파일만
                                                    등록 가능합니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 이미지 사이즈는 175 x 255를
                                                    추천합니다.
                                                </p>
                                            </>
                                        }
                                        <CImg
                                            src={dataDetail.imageMb}
                                            className="my-2"
                                            width="200px"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">첨부 파일</td>
                                    <td>
                                        <div className="form-inline">
                                            <CInput
                                                className="col-6"
                                                placeholder="이미지를 등록해주세요."
                                                value={selectedFiles.attachment !== null ? selectedFiles.attachment.name : getFileNameFromURL(dataDetail.file)}
                                                readOnly
                                            />
                                            <span className="btn-upload-file ml-2">
                                                <CInputFile
                                                    id="file"
                                                    type="file"
                                                    className="col-6"
                                                    placeholder="노출 순서를 입력해주세요."
                                                    name="attachment"
                                                    onChange={handleInputChange}
                                                />
                                                <CLabel
                                                    htmlFor="file"
                                                    className="btnu-label"
                                                >
                                                    파일 선택
                                                </CLabel>
                                            </span>
                                        </div>

                                        {errors.attachment &&
                                            <>
                                                <p className="text-danger my-1">
                                                    - 한글, ppt, pdf, img(jpg, png) 파일만
                                                    등록 가능합니다.
                                                </p>
                                            </>
                                        }
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
                                    to="/main/magazines"
                                >
                                    취소
                                </CButton>
                            </CCol>
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
            <CModal
                show={small}
                onClose={() => setSmall(!small)}
                size="sm"
                centered
            >
                <CModalBody className="text-center">
                    <p>저장되었습니다.</p>
                    <CButton color="dark" to="/main/magazines/magazines">
                        확인
                    </CButton>
                </CModalBody>
            </CModal>

            <ModalNotification
                show={small}
                onShow={setSmall}
                content={POPUP_CAPACITY_EXCEEDED}
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

export default MagazineEdit
