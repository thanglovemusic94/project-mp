import React, { useEffect, useState } from 'react'
import {
    CCardBody,
    CButton,
    CCard,
    CCol,
    CInput,
    CRow,
    CImg,
    CModalBody,
    CModal,
    CInputFile,
    CLabel,
    CForm
} from '@coreui/react'
import { BannerService } from "../../../../services/BannerService";
import { useHistory, useParams } from "react-router-dom";
import ModalNotification from 'src/views/common/ModalNotification';
import { POPUP_INFORMATION_SAVED } from 'src/constants/popup.constants';

const FILE_SIZE = 200 * 1024 * 1000;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];


const BannerEdit = (props) => {
    const history = useHistory();
    let { id } = useParams();

    const [small, setSmall] = useState(false)

    const [savedPopup, setSavedPopup] = useState(false);
    const showSavedPopup = () => setSavedPopup(true);

    const [errors, setErrors] = useState({})

    const [selectedImages, setSelectedImages] = useState({
        "imageMb": "",
        "imagePc": ""
    })

    const [dataDetail, setDataDetail] = useState({
        name: null,
        imageMb: null,
        imagePc: null,
        orderBanner: null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (e.target.type == 'file') {
            setSelectedImages({ ...selectedImages, [name]: e.target.files[0] })
            setErrors({ ...errors, [name]: validate(name, e.target.files[0]) })
        } else {
            setDataDetail({ ...dataDetail, [name]: value })
            setErrors({ ...errors, [name]: validate(name, value) })
        }
    }

    const validate = (name, value) => {
        switch (name) {
            case "name":
                if (!value || value.trim() === "") {
                    return true;
                }
                return false;
            case "imageMb":
                if (value) {
                    if (value.size > FILE_SIZE || isImageType(value) === false) {
                        return true;
                    }
                }
                return false;

            case "imagePc":
                if (value) {
                    if (value.size > FILE_SIZE || isImageType(value) === false) {
                        return true;
                    }
                }
                return false;

            case "orderBanner":
                var regex = /^[0-9]*$/g

                if (!value 
                    || parseInt(value) < 1
                    || regex.test(value) === false) {

                    return true;
                }

                return false;

            default: {
                return true;
            }
        }
    };

    const isImageType = (file) => {
        let isValid = false;

        for (const type of SUPPORTED_FORMATS) {

            if (file.type === type) {

                isValid = true;

                break;
            }
        }

        return isValid;
    }

    const getImageNameFromURL = (url) => {

        if (url !== null && url.length > 0) {
            const start = url.lastIndexOf("/");
            const name = url.substring(start + 1);

            return name;
        }

        return "";
    }

    const handleOnCloseSavedPopup = () => {

        history.push("/main/banners");
    }

    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        let validationErrors = {};

        Object.keys(dataDetail).forEach(name => {
            let error = false;

            if (name !== "imagePc" && name !== "imageMb")
                error = validate(name, dataDetail[name]);
            else
                error = validate(name, selectedImages[name]);

            if (error) {
                validationErrors[name] = error;
            }
        });

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;
        } else {
            const formData = new FormData();

            formData.append("name", dataDetail.name)

            if (selectedImages.imageMb.size > 0)
                formData.append("imageMb", selectedImages.imageMb)

            if (selectedImages.imagePc.size > 0)
                formData.append("imagePc", selectedImages.imagePc)

            formData.append("orderBanner", dataDetail.orderBanner)

            BannerService.update(formData, id).then((resp) => {

                if (resp.status === 200) {

                    showSavedPopup()
                }
            })
        }
    }

    useEffect(() => {
        Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));

        BannerService.getById(id).then(response => {
            const { name, imagePc, imageMb, orderBanner } = response.data;

            setDataDetail({ name, imagePc, imageMb, orderBanner })
        })

    }, [id]);


    return (
        <>
            <h2 className="mb-4">메인 배너 수정</h2>
            <CCard>
                <CCardBody>
                    <div className="d-flex justify-content-end">
                        {(errors.name || errors.imagePc || errors.imageMb || errors.orderBanner) &&
                            <p className="text-danger">
                                * 표시된 영역은 필수 입력 영역 입니다.
                            </p>
                        }
                    </div>
                    <CForm noValidate onSubmit={onSubmit}>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">*</span>
                                        메인 배너명
                                    </td>
                                    <td>
                                        <CInput
                                            id="banner_name"
                                            className="col-6"
                                            placeholder="메인 배너명 입력"
                                            name="name"
                                            onChange={handleInputChange}
                                            value={dataDetail.name ? dataDetail.name : ''}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">*</span>
                                        메인 배너 이미지 (PC)
                                    </td>
                                    <td>
                                        <div className="form-inline">
                                            <CInput
                                                id="banner_pc"
                                                className="col-6"
                                                placeholder="이미지를 등록해주세요."
                                                value={selectedImages.imagePc !== "" ? selectedImages.imagePc.name : getImageNameFromURL(dataDetail.imagePc)}
                                                readOnly
                                            />
                                            <span className="btn-upload-file ml-2">
                                                <CInputFile
                                                    id="imagePc"
                                                    type="file"
                                                    name="imagePc"
                                                    placeholder="이미지를 등록해주세요."
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
                                            <div>
                                                <p className="text-danger my-1">
                                                    - 최대 200MB의 jpg, png 이미지 파일만
                                                    등록 가능합니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 이미지 사이즈는 1920 x 580를
                                                    추천합니다.
                                                </p>

                                            </div>

                                        }
                                        {dataDetail.imagePc &&
                                            <CImg
                                                src={dataDetail.imagePc}
                                                fluidGrow
                                                className="my-2"
                                            />
                                        }

                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">*</span>
                                        메인 배너 이미지(Mobile)
                                    </td>
                                    <td>
                                        <div className="form-inline">
                                            <CInput
                                                id="banner_mobile"
                                                className="col-6"
                                                placeholder="이미지를 등록해주세요."
                                                value={selectedImages.imageMb ? selectedImages.imageMb.name : getImageNameFromURL(dataDetail.imageMb)}
                                                readOnly
                                            />
                                            <span className="btn-upload-file ml-2">
                                                <CInputFile
                                                    id="imageMb"
                                                    type="file"
                                                    name="imageMb"
                                                    onChange={handleInputChange}
                                                />
                                                <CLabel
                                                    htmlFor="imageMb"
                                                    className="btnu-label"
                                                >
                                                    파일 선택
                                                </CLabel>
                                            </span>
                                        </div>

                                        {errors.imageMb &&
                                            <div>
                                                <p className="text-danger my-1">
                                                    - 최대 200MB의 jpg, png 이미지 파일만
                                                    등록 가능합니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 이미지 사이즈는 410 x 490를
                                                    추천합니다.
                                                </p>
                                            </div>

                                        }

                                        {dataDetail.imageMb &&
                                            <CImg
                                                src={dataDetail.imageMb}
                                                fluidGrow
                                                className="my-2"
                                            />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">
                                        <span className="text-danger mr-1">*</span>
                                        노출 순서
                                    </td>
                                    <td>
                                        <CInput
                                            type="text"
                                            className="col-6"
                                            placeholder="노출 순서를 입력해주세요."
                                            name="orderBanner"
                                            onChange={handleInputChange}
                                            value={dataDetail.orderBanner ? dataDetail.orderBanner : ''}
                                            required
                                            pattern="^[1-9]*$"
                                        />

                                        {errors.orderBanner &&
                                            <div>
                                                <p className="text-danger my-1">
                                                    - 숫자만 입력이 가능하며, 텍스트 입력시
                                                    순서가 반영되지 않으며 마지막에
                                                    노출됩니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 숫자는 음수와 0을 제외한 모든 양수로
                                                    입력이 가능합니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 숫자는 작을수록 메인 배너 영역 맨
                                                    처음에 노출됩니다.
                                                </p>
                                                <p className="text-danger my-1">
                                                    - 동일한 숫자 입력 시, 최근 등록한
                                                    배너가 더 먼저 노출됩니다.
                                                </p>
                                            </div>

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
                                    to="/main/banners"
                                >
                                    취소
                                </CButton>
                            </CCol>
                            <CCol md="2">
                                <CButton
                                    // onClick={() => setSmall(!small)}
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
                    <CButton color="dark" to="/main/banners/">
                        확인
                    </CButton>
                </CModalBody>
            </CModal>

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

export default BannerEdit
