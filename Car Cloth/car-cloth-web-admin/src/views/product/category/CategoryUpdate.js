import { CButton, CForm, CFormInput, CModal, CModalBody, CModalHeader, CTable, CTableBody, CTableDataCell, CTableRow } from "@coreui/react";
import React, { useRef, useState } from "react";
import IconRemoveCommon from "../../../commons/IconRemoveCommon";
import PopupCommon from "../../../commons/PopupCommon";
import { CommonMessage, UploadMessage } from "../../../constants/ErrorMessage";
import { PopupConstant } from "../../../constants/PopupConstant";
import CategoryService from "../../../services/CategoryService";
import StorageService from "../../../services/StorageService";

const CategoryUpdate = ({ source, handler, show, setShow, callback }) => {

    const [contentNotify, setContentNotify] = useState("")
    const [showNotify, setShowNotify] = useState(false)

    const inputRef = useRef();
    const handleUpload = () => {
        inputRef.current?.click();
    };

    const submit = () => {
        if (!source.title || !source.icon) {
            setContentNotify("모든 항목을 입력해주시기 바랍니다.")
            setShowNotify(!showNotify)
        } else {
            const files = inputRef.current?.files
            CategoryService.update(source)
                .then((res) => {
                    if(res.data) {
                        StorageService.upload(res.data.objectKey, files[0])
                    .then((r) => {
                        setContentNotify("저장되었습니다.​")
                        setShowNotify(!showNotify)
                        setShow(!show)
                        callback()
                    })
                    .catch((err) => {
                        console.log(err)
                        setContentNotify(UploadMessage)
                        setShowNotify(!showNotify)
                    })
                    } 
                })
                .catch((err) => {
                    console.log(err)
                    setContentNotify(CommonMessage)
                    setShowNotify(!showNotify)
                })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (!value) {
            setContentNotify("모든 항목을 입력해주시기 바랍니다.")
            setShowNotify(!showNotify)
        }

        handler({ ...source, [name]: value })
    }

    const handleCloseImage = () => {
        handler({ ...source, icon: null })
    };

    const handleDisplayFileDetails = () => {
        const files = inputRef.current?.files
        handler({ ...source, icon: { fileName: files[0].name } })
    };

    return (
        <>
            <CModal
                visible={show}
                onDismiss={() => setShow(false)}
                onClose={() => setShow(false)}
                alignment="center"
            >
                <CModalHeader className="bg-dark">
                    <h5 className="text-white">카테고리 수정​</h5>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" className="form-horizontal"
                        noValidate
                    >
                        <CTable bordered>
                            <CTableBody>
                                <CTableRow className={'align-middle'}>
                                    <CTableDataCell className={'bg-dark text-white col-3'}>
                                        카테고리명*
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            style={{ "overflow": "hidden", "textOverflow": "ellipsis" }}
                                            type="text"
                                            name="title"
                                            onChange={handleChange}
                                            value={source.title}
                                        />
                                    </CTableDataCell>
                                </CTableRow>

                                <CTableRow className={'align-middle'}>
                                    <CTableDataCell className={'bg-dark text-white col-3'}>
                                        아이콘*
                                    </CTableDataCell>
                                    <CTableDataCell className={'d-flex flex-wrap align-items-center'}>
                                        <CButton
                                            className={'btn btn-dark me-4'}
                                            onClick={handleUpload}
                                        >
                                            파일 첨부
                                        </CButton>
                                        <div className={'d-flex flex-wrap align-items-center'}>
                                            <span style={{ "textOverflow": "ellipsis" }} className={' me-2 overflow-hidden'}>
                                                {source.icon instanceof Object &&
                                                    source.icon.fileName
                                                }
                                            </span>
                                            {source.icon &&
                                                <div>
                                                    <IconRemoveCommon handler={handleCloseImage} />
                                                </div>
                                            }
                                            <label htmlFor="file-upload">
                                                <input id="file-upload" type="file"
                                                    className="d-none"
                                                    name="icon"
                                                    ref={inputRef}
                                                    onChange={handleDisplayFileDetails}
                                                    accept=".jpg,.png,.svg,.pdf"
                                                />
                                            </label>
                                        </div>
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                        <div className="d-flex flex-wrap justify-content-between">
                            <CButton className={"btn btn-dark  me-2"}
                                onClick={() => setShow(!show)}>
                                취소
                            </CButton>
                            <CButton className={"btn btn-dark "}
                                onClick={submit}
                            >
                                수정​
                            </CButton>
                        </div>
                    </CForm>
                </CModalBody>
            </CModal>
            
            <PopupCommon
                type={PopupConstant.YES}
                show={showNotify}
                setShow={setShowNotify}
                content={contentNotify}
                onClickYes={() => setShowNotify(!showNotify)}
            />
        </>
    )
}

export default CategoryUpdate


