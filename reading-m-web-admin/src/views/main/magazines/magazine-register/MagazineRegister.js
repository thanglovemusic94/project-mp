import React, {useState} from 'react'
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
    CRow
} from '@coreui/react'
import {MagazineService} from "../../../../services/MagazineService";
import { POPUP_CAPACITY_EXCEEDED, POPUP_INFORMATION_SAVED } from 'src/constants/popup.constants';
import ModalNotification from 'src/views/common/ModalNotification';
import { useHistory } from 'react-router-dom';

const FILE_SIZE = 200 * 1024 * 1000;

// https://www.npmjs.com/package/react-doc-viewer#custom-renderer
const IMAGE_SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png"
];

const DOCUMENT_SUPPORTED_FORMATS = [
    "application/pdf",
    "application/msword",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
]

const MagazineRegister = () => {
    const history = useHistory();

    const [small, setSmall] = useState(false)
    const showNoticePopup = () => setSmall(true);

    const [savedPopup, setSavedPopup] = useState(false);
    const showSavedPopup = () => setSavedPopup(true);

    const [errors, setErrors] = useState({})
    const [data, setData] = useState({
        "title": null,
        "imageMb": null,
        "imagePc": null,
        "file": null
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (e.target.type == 'file') {

            setData({...data, [name]: e.target.files[0]})
            setErrors({...errors, [name]: validate(name, e.target.files[0])})
        } else {

            setData({...data, [name]: value})
            setErrors({...errors, [name]: validate(name, value)})
        }
    }

    const handleOnCloseSavedPopup = () => {

        history.push("/main/magazines");
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
                
                if (!value || IMAGE_SUPPORTED_FORMATS.filter(value1 => value1 === value.type).length <= 0) {

                    return true;
                } else if (value.size > FILE_SIZE) {

                    showNoticePopup();

                    return true;
                }
                
                return false;

            case "file":
                const supportedFormats = [...IMAGE_SUPPORTED_FORMATS, ...DOCUMENT_SUPPORTED_FORMATS];
                
                if (!value || supportedFormats.filter(value1 => value1 === value.type).length <= 0) {
                    
                    return true;
                }
                
                return false;
                
            default: {

                return false;
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let validationErrors = {};
        
        Object.keys(data).forEach(name => {
            const error = validate(name, data[name]);

            if (error) {
                
                validationErrors[name] = error;
            }
        });

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;

        } else {
            const formData = new FormData();

            formData.append("title", data.title)
            formData.append("imageMb", data.imageMb);
            formData.append("imagePc", data.imagePc);
            formData.append("file", data.file);

            MagazineService.post(formData).then((resp) => {

                if (resp.status === 200) {
                    
                    showSavedPopup();
                }
            }).catch(e => {

                console.log(e);
            });
        }
    }

    return (
        <>
            <h2 className="mb-4">매거진 등록</h2>
            <CCard>
                <CCardBody>
                    <div className="d-flex justify-content-end">
                        {Object.keys(errors).filter(value => errors[value] === true).length > 0 &&
                        <p className="text-danger">
                            * 표시된 영역은 필수 입력 영역 입니다.
                        </p>
                        }
                    </div>
                    <CForm onSubmit={handleSubmit}>
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    매거진 제목
                                </td>
                                <td>
                                    <CInput
                                        id="title"
                                        className="col-6"
                                        placeholder="매거진 제목 입력"
                                        name="title"
                                        onChange={handleInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    매거진 이미지(PC)
                                </td>
                                <td>
                                    <div className="form-inline">
                                        <CInput
                                            id="banner_pc"
                                            className="col-6"
                                            placeholder="이미지를 등록해주세요."
                                            value={data.imagePc ? data.imagePc.name : ''}
                                            onChange={() => {}}
                                        />
                                        <span className="btn-upload-file ml-2">
                                            <CInputFile
                                                id="imagePc"
                                                name="imagePc"
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
                                            - 이미지 사이즈는 225 x 315를
                                            추천합니다.
                                        </p>
                                    </div>
                                    }

                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    매거진 이미지(Mobile)
                                </td>
                                <td>
                                    <div className="form-inline">
                                        <CInput
                                            id="banner_mobile"
                                            className="col-6"
                                            placeholder="이미지를 등록해주세요."
                                            value={data.imageMb ? data.imageMb.name : ''}
                                            onChange={() => {}}
                                        />

                                        <span className="btn-upload-file ml-2">
                                            <CInputFile
                                                id="imageMb"
                                                type="file"
                                                name="imageMb"
                                                placeholder="이미지를 등록해주세요."
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
                                            - 이미지 사이즈는 175 x 255를
                                            추천합니다.
                                        </p>
                                    </div>
                                    }

                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    첨부 파일
                                </td>
                                <td>
                                    <div className="form-inline">
                                        <CInput
                                            id="order"
                                            className="col-6"
                                            placeholder="파일을 등록해주세요."
                                            value={data.file ? data.file.name : ''}
                                            onChange={() => {}}
                                        />
                                        <span className="btn-upload-file ml-2">
                                            <CInputFile
                                                type="file"
                                                id="file"
                                                name="file"
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

                                    {errors.file &&
                                    <div>
                                        <p className="text-danger my-1">
                                            - 한글, ppt, pdf, img(jpg, png) 파일만
                                            등록 가능합니다.
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
                                    to="/main/magazines"
                                >
                                    취소
                                </CButton>
                            </CCol>
                            <CCol md="2">
                                <CButton
                                    block
                                    color="dark"
                                    // onClick={() => setSmall(!small)}
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

export default MagazineRegister
