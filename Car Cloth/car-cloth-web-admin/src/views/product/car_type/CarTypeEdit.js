import {
    CButton,
    CContainer,
    CForm,
    CFormInput,
    CFormSelect, CHeader, CHeaderBrand,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableRow
} from "@coreui/react";
import { handleChange } from "../../../utils/StateUtils";
import { useHistory, useLocation } from "react-router";
import React, { useEffect, useState } from "react";
import PopupCommon from "../../../commons/PopupCommon";
import { PopupConstant } from "../../../constants/PopupConstant";
import CarTypeService from "../../../services/CarTypeService";
import { TYPE_CAR_TYPE } from "../../../constants/TypeContaint";
import { CART_TYPE_ROUTER } from "../../../constants/RouterConstant";
import AttachFileCommon from "../../../commons/AttachFileCommon";
import StorageService from "../../../services/StorageService";
import { CarType, CommonMessage, UploadMessage } from "../../../constants/ErrorMessage";


const CarTypeEdit = () => {
    const history = useHistory();
    const [showDelete, setShowDelete] = useState(false)
    const [showSave, setShowSave] = useState(false)
    const [contentNotify, setContentNotify] = useState("")
    const [showNotify, setShowNotify] = useState(false)

    const { state } = useLocation()
    const [attachFile, setAttachFile] = useState({
        name: state.attachFile?.fileName,
        objectKey: state.attachFile?.objectKey
    })
    const [listBrand, setListBrand] = useState([])
    const [listModel, setListModel] = useState([])

    const [dataUpdate, setDataUpdate] = useState({
        id: state.id,
        productType: state.productType,
        brandId: state.brand.id,
        modelId: state.model?.id || 0,
        name: state.name,
        attachFile: {
            fileName: state.attachFile?.fileName,
            objectKey: state.attachFile?.objectKey
        },
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        //validated input
        if (!dataUpdate.name || dataUpdate.name.trim().length === 0) {
            setContentNotify(CarType.NameRequired)
            setShowNotify(!showNotify)
            return
        }
        if (!attachFile) {
            setContentNotify(CarType.ImageRequired)
            setShowNotify(!showNotify)
            return
        }

        let objectKey = dataUpdate.attachFile.objectKey === attachFile.objectKey ? null : dataUpdate.attachFile.objectKey

        CarTypeService.update({ ...dataUpdate, attachFile: { fileName: attachFile.name, objectKey: objectKey } })
            .then((res) => {
                if(res.data) {
                    StorageService.upload(res.data.objectKey, attachFile)
                    .then(r => setShowSave(!showSave))
                    .catch((err) => {
                        console.log(err)
                        setContentNotify(UploadMessage)
                        setShowNotify(!showNotify)
                    })
                } else {
                    setShowSave(!showSave)
                }
            })
            .catch((err) => {
                console.log(err)
                setContentNotify(CommonMessage)
                setShowNotify(!showNotify)
            })
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setDataUpdate({ ...dataUpdate, [name]: value });
        if (name === 'brandId') {
            CarTypeService.getAllModelByBrandId(value).then(r => {
            })
        }
    }

    const handleDelete = () => {
        setShowDelete(!showDelete)
    };

    const onClickYes = () => {
        CarTypeService.remove(state.id).then(() => history.push(CART_TYPE_ROUTER.LIST))
    };

    useEffect(() => {
        CarTypeService.getAllBrand().then(rb => {
            setListBrand(rb.data)
        })
        CarTypeService.getAllModelByBrandId(dataUpdate.brandId).then(r => {
            let listModel = r.data
            if (dataUpdate.modelId === 0) {
                listModel.push({ id: 0, modelName: "" })
            }
            setListModel(listModel)
        })
    }, [dataUpdate])

    return (
        <CContainer fluid>

            <CHeader>
                <CHeaderBrand className={'fw-bold'}>차종 상세 및 수정</CHeaderBrand>
            </CHeader>
            <CForm className="form-horizontal my-5"
                noValidate
                onSubmit={handleSubmit}
            >
                <CTable bordered>
                    <CTableBody>
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}>분류*</CTableDataCell>
                            <CTableDataCell>
                                <div className="row">
                                    <div className={'col-2'}>
                                        <CFormSelect aria-label="Default select example"
                                            name={'productType'}
                                            onChange={e => handleChange(e, dataUpdate, setDataUpdate)}
                                            value={dataUpdate.productType}
                                            required
                                        >
                                            <option value={TYPE_CAR_TYPE.FOREIGN_ID}>{TYPE_CAR_TYPE.FOREIGN_NAME}</option>
                                            <option value={TYPE_CAR_TYPE.DOMESTIC_ID}>{TYPE_CAR_TYPE.DOMESTIC_NAME}</option>
                                        </CFormSelect>
                                    </div>
                                    <div className={'col-2'}>
                                        <CFormSelect aria-label="Default select example"
                                            name={'brandId'}
                                            onChange={handleChangeInput}
                                            value={dataUpdate.brandId}
                                            required
                                        >
                                            {
                                                listBrand.length > 0 && listBrand.map((value, index) => {
                                                    return <option key={index}
                                                        value={value.id}>{value.brandName}</option>
                                                })
                                            }


                                        </CFormSelect>
                                    </div>
                                    <div className={'col-2'}>
                                        <CFormSelect aria-label="Default select example"
                                            name={'modelId'}
                                            onChange={handleChangeInput}
                                            value={dataUpdate.modelId}
                                            required
                                        >
                                            {
                                                listModel.length > 0 && listModel.map((value, index) => {
                                                    return <option key={index}
                                                        value={value.id}>{value.modelName}</option>
                                                })
                                            }
                                        </CFormSelect>
                                    </div>
                                </div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}> 이름 *</CTableDataCell>
                            <CTableDataCell>
                                <CFormInput
                                    style={{ "overflow": "hidden", "textOverflow": "ellipsis" }}
                                    type="text"
                                    name="name"
                                    onChange={e => handleChange(e, dataUpdate, setDataUpdate)}
                                    defaultValue={dataUpdate.name}
                                    required
                                />
                            </CTableDataCell>

                        </CTableRow>

                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}>이미지
                                *</CTableDataCell>
                            <CTableDataCell className={''}>
                                <AttachFileCommon file={attachFile} setFile={setAttachFile}
                                    data={dataUpdate} accept=".jpg,.jpeg,.png" />
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
                    <div>
                        <CButton
                            className={"btn btn-dark me-2"}
                            onClick={handleDelete}
                        >
                            삭제
                        </CButton>
                        <CButton
                            className={"btn btn-dark "}
                            type={"submit"}
                        >
                            저장
                        </CButton>
                    </div>

                </div>
            </CForm>

            <PopupCommon
                type={PopupConstant.YES_NO}
                show={showDelete}
                setShow={setShowDelete}
                onClickYes={onClickYes}
            />
            <PopupCommon
                type={'YES'}
                show={showSave}
                setShow={setShowSave}
                onClickYes={() => history.push(CART_TYPE_ROUTER.LIST)}
            />

            <PopupCommon
                type={PopupConstant.YES}
                show={showNotify}
                setShow={setShowNotify}
                content={contentNotify}
                onClickYes={() => setShowNotify(!showNotify)}
            />
        </CContainer>
    )
}

export default CarTypeEdit
