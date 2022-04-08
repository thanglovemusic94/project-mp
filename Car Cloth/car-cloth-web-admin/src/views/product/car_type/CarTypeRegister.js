import {
    CButton,
    CContainer,
    CForm,
    CHeader,
    CHeaderBrand,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableRow
} from "@coreui/react";
import IconRemoveCommon from "../../../commons/IconRemoveCommon";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { CART_TYPE_ROUTER } from "../../../constants/RouterConstant";
import PopupCommon from "../../../commons/PopupCommon";
import sample from "../../../assets/차종_등록.xlsx"
import CarTypeService from "../../../services/CarTypeService";
import { CarType, CommonMessage } from "../../../constants/ErrorMessage";
import { PopupConstant } from "../../../constants/PopupConstant";


const CarTypeRegister = () => {
    const history = useHistory();
    // const [validated, setValidated] = useState(false)
    const [contentNotify, setContentNotify] = useState("")
    const [showNotify, setShowNotify] = useState(false)
    // const [showRegister, setShowRegister] = useState(false)
    const [source, handler] = useState({
        type: "1",
        name: "",
        image: null,
        introduction: ""
    })
    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        // const form = event.currentTarget
        // if (form.checkValidity() === false) {
        //     event.stopPropagation()
        // } else {
        //     setValidated(true)
        //validate input
        if (!inputRef.current?.files[0]) {
            setContentNotify(CarType.FileRequired)
            setShowNotify(!showNotify)
            return
        }

        CarTypeService.register(inputRef.current?.files[0])
            .then(() => {
                history.push(CART_TYPE_ROUTER.LIST)
            })
            .catch(() => {
                setContentNotify(CommonMessage)
                setShowNotify(!showNotify)
            })
        // }
    }

    const inputRef = useRef();
    const handleUpload = () => {
        inputRef.current?.click();
    };

    const handleCloseImage = () => {
        handler({ ...source, image: null })
    };

    const handleDisplayFileDetails = () => {
        const files = inputRef.current?.files
        console.log(files)
        handler({ ...source, image: files[0] })
    };

    return (
        <CContainer fluid>

            <CHeader>
                <CHeaderBrand className={'fw-bold'}>차종 등록</CHeaderBrand>
            </CHeader>
            <CForm className="form-horizontal my-5"
                noValidate
                // validated={validated}
                onSubmit={handleSubmit}
            >
                <CTable bordered>
                    <CTableBody>
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}>차종 파일 *</CTableDataCell>
                            <CTableDataCell className={''}>
                                <div className={'d-flex flex-wrap align-items-center'}>
                                    <div className={'col-3'}>
                                        <a href={sample} download>
                                            <CButton
                                                className={'btn btn-dark  my-1 me-4'}
                                            >
                                                샘플 다운로드
                                            </CButton>
                                        </a>
                                        <CButton
                                            className={'btn btn-dark  my-1 me-4'}
                                            onClick={handleUpload}
                                        >
                                            파일 첨부
                                        </CButton>
                                    </div>

                                    <div className={'d-flex flex-wrap align-items-center'}>
                                        <span style={{ "textOverflow": "ellipsis" }} className={' me-2 overflow-hidden'}>
                                            {source.image instanceof Object &&
                                                source.image.name
                                            }
                                        </span>
                                        {source.image &&
                                            <div>
                                                <IconRemoveCommon handler={handleCloseImage} />
                                            </div>
                                        }
                                        <label htmlFor="file-upload">
                                            <input id="file-upload" type="file"
                                                className="d-none"
                                                ref={inputRef}
                                                onChange={handleDisplayFileDetails}
                                                accept=".xlsx,.xls"
                                            />
                                        </label>
                                    </div>

                                </div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell colSpan="2" className={'p-4'}>
                                <p>※ 제공되는 샘플 양식을 참고하여 엑셀 일괄등록을 진행해주세요.</p>
                                <p>※ xlsx, xls확장자만 등록 가능합니다.</p>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
                <div className="d-flex flex-wrap justify-content-between">
                    <CButton
                        className={"btn btn-dark "}
                        onClick={() => history.push(CART_TYPE_ROUTER.LIST)}
                    >
                        목록
                    </CButton>


                    <CButton
                        className={"btn btn-dark "}
                        type={"submit"}
                    >
                        등록
                    </CButton>


                </div>
            </CForm>

            <PopupCommon
                type={PopupConstant.YES}
                show={showNotify}
                setShow={setShowNotify}
                content={contentNotify}
                onClickYes={() => setShowNotify(!showNotify)}
            />

            {/* <PopupCommon
                content={'등록 실패하였습니다.\n' +
                    '\n' +
                    '파일을 다시 확인해 주세요.'}
                type={'YES'}
                onClickYes={() => setShowRegister(!showRegister)}
                show={showRegister}
                setShow={setShowRegister} /> */}
        </CContainer>
    )
}

export default CarTypeRegister
