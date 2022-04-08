import { CButton, CForm, CFormInput, CFormSelect, CTable, CTableBody, CTableDataCell, CTableRow } from "@coreui/react";
import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";


import PopupCommon from "../../../commons/PopupCommon";
import { handleChange } from "../../../utils/StateUtils";
import { PopupConstant } from "../../../constants/PopupConstant";
import CategoryService from "../../../services/CategoryService";
import BrandService from "../../../services/BrandService";
import { BRAND_ROUTER } from "../../../constants/RouterConstant";
import AttachFileCommon from "../../../commons/AttachFileCommon";
import StorageService from "../../../services/StorageService";
import { Brand, CommonMessage, UploadMessage } from "../../../constants/ErrorMessage";


const BrandForm = ({ source, handler, isEdit }) => {

    const history = useHistory();

    const [listCategory, setListCategory] = useState([])

    const [showDelete, setShowDelete] = useState(false)

    const [contentNotify, setContentNotify] = useState("")
    const [showNotify, setShowNotify] = useState(false)
    const initAttachFile = isEdit ? { name: source.attachFile.fileName, objectKey: source.attachFile.objectKey } : null
    const [attachFile, setAttachFile] = useState(initAttachFile)

    const onClickYes = () => {
        BrandService.remove(source.id).then(() => history.push(BRAND_ROUTER.LIST))
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        //validated form
        if (!source.categoryId) {
            setContentNotify(Brand.CategoryRequired)
            setShowNotify(!showNotify)
            return
        }
        if (!source.brandName || source.brandName.trim().length === 0) {
            setContentNotify(Brand.NameRequired)
            setShowNotify(!showNotify)
            return
        }
        if (!source.connectionURL || source.connectionURL.trim().length === 0) {
            setContentNotify(Brand.ConnnectionUrlRequired)
            setShowNotify(!showNotify)
            return
        }
        if (!attachFile) {
            setContentNotify(Brand.ImageRequired)
            setShowNotify(!showNotify)
            return
        }
        if (!source.introduction || source.introduction.trim().length === 0) {
            setContentNotify(Brand.IntroductionRequired)
            setShowNotify(!showNotify)
            return
        }

        if (isEdit !== true) {
            BrandService.register({ ...source, attachFile: { fileName: attachFile.name } })
                .then((res) => {
                    StorageService.upload(res.data.objectKey, attachFile)
                        .then((r) => {
                            history.push(BRAND_ROUTER.LIST)
                        })
                        .catch((err) => {
                            console.log(err)
                            setContentNotify(UploadMessage)
                            setShowNotify(!showNotify)
                        })
                })
                .catch((err) => {
                    console.log(err)
                    setContentNotify(CommonMessage)
                    setShowNotify(!showNotify)
                })
        } else {
            let objectKey = attachFile.objectKey === source.attachFile.objectKey ? null : source.attachFile.objectKey
            BrandService.update({ ...source, attachFile: { fileName: attachFile.name, objectKey: objectKey } })
                .then((res) => {
                    if(res.data) {
                        StorageService.upload(res.data.objectKey, attachFile)
                        .then((r) => {
                            history.push(BRAND_ROUTER.LIST)
                        })
                        .catch((err) => {
                            console.log(err)
                            setContentNotify(UploadMessage)
                            setShowNotify(!showNotify)
                        })
                    } else {
                        history.push(BRAND_ROUTER.LIST)
                    }
                    
                })
                .catch((err) => {
                    console.log(err)
                    setContentNotify(CommonMessage)
                    setShowNotify(!showNotify)
                })
        }
    }

    useEffect(() => {
        CategoryService.getAll().then(res => setListCategory(res.data))
    }, [])

    return (
        <>
            <CForm action="" method="post" className="form-horizontal my-5"
                noValidate
                onSubmit={handleSubmit}
            >
                <CTable bordered>
                    <CTableBody>
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}>카테고리
                                *</CTableDataCell>
                            <CTableDataCell>
                                <div className={'col-3'}>
                                    <CFormSelect aria-label="Default select example"
                                        name={'categoryId'}
                                        onChange={e => handleChange(e, source, handler)}
                                        value={source.categoryId}
                                        required
                                    >
                                        <option value="">선택</option>
                                        {
                                            listCategory.length > 0 && listCategory.sort().map((value, index) => {
                                                return <option key={index}
                                                    value={value.id}>{value.title}</option>
                                            })
                                        }
                                    </CFormSelect>

                                </div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}>브랜드명
                                *</CTableDataCell>
                            <CTableDataCell>
                                <CFormInput
                                    style={{ "overflow": "hidden", "textOverflow": "ellipsis" }}
                                    type="text"
                                    name="brandName"
                                    onChange={e => handleChange(e, source, handler)}
                                    value={source.brandName}
                                    required
                                />

                            </CTableDataCell>

                        </CTableRow>
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}>연결 URL
                                *</CTableDataCell>
                            <CTableDataCell>
                                <CFormInput
                                    style={{ "overflow": "hidden", "textOverflow": "ellipsis" }}
                                    type="text"
                                    name="connectionURL"
                                    onChange={e => handleChange(e, source, handler)}
                                    value={source.connectionURL}
                                    required
                                />

                            </CTableDataCell>

                        </CTableRow>
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}>대표 이미지
                                *</CTableDataCell>
                            <CTableDataCell className={''}>
                                <AttachFileCommon file={attachFile} setFile={setAttachFile} data={source}
                                    accept=".jpg,.jpeg,.png" />
                            </CTableDataCell>
                        </CTableRow>

                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}>소개 글
                                *</CTableDataCell>
                            <CTableDataCell colSpan="2">
                                <textarea type={'text'}
                                    className="form-control"
                                    rows="9"
                                    name={'introduction'}
                                    value={source.introduction}
                                    onChange={e => handleChange(e, source, handler)}
                                    required />

                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
                <div className="d-flex flex-wrap justify-content-between">
                    <CButton
                        className={"btn btn-dark "}
                        onClick={() => history.push("/product/brand")}
                    >
                        목록
                    </CButton>


                    <div className={'d-flex flex-wrap'}>
                        {
                            isEdit &&
                            <>
                                <CButton
                                    className={'btn btn-dark  me-2'}
                                    onClick={() => setShowDelete(!showDelete)}
                                >
                                    삭제
                                </CButton>
                                <PopupCommon type={PopupConstant.YES_NO}
                                    show={showDelete}
                                    setShow={setShowDelete}
                                    content={'삭제하시겠습니까?\n' +
                                        '\n' +
                                        '삭제 시 복구할 수 없습니다.'}
                                    onClickYes={onClickYes}
                                />
                            </>

                        }

                        <CButton
                            className="btn btn-dark "
                            type={'submit'}
                        >
                            {isEdit ? "저장" : "등록"}
                        </CButton>

                    </div>

                </div>
            </CForm>

            <PopupCommon
                type={PopupConstant.YES}
                show={showNotify}
                setShow={setShowNotify}
                content={contentNotify}
                onClickYes={() => setShowNotify(!showNotify)}
            />

            {/* <PopupCommon show={showRequired} setShow={setShowRequired}/> */}
        </>
    )
}

export default BrandForm
