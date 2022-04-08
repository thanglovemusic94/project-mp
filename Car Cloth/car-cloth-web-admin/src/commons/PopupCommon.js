import {CButton, CModal, CModalBody} from "@coreui/react";
import {PopupConstant} from "../constants/PopupConstant";
import React from "react";
import {handleChange} from "../utils/StateUtils";

const PopupCommon = ({ type, show, setShow, headerContent,  content,  dataForm, setDataForm,  errorForm,   onClickYes}) => {
    switch (type) {
        case PopupConstant.INPUT_YES_NO:
            return (
                <>
                    <CModal
                        visible={show}
                        onDismiss={() => setShow(false)}
                        onClose={() => setShow(false)}
                        alignment="center"
                    >
                        <CModalBody>
                            <form noValidate
                                  onSubmit={onClickYes}>
                                <div className="m-5">
                                    <label className={'mb-2'}>{content}</label>
                                    <input type="text" className="text-center form-control" id="basic-url"
                                           name={"name"}
                                           pattern={".{1,20}"}
                                           onChange={(e) => handleChange(e, dataForm, setDataForm)}
                                           required/>
                                    <div className="invalid-feedback">
                                        {errorForm}
                                    </div>
                                </div>
                                <div className={'d-flex justify-content-center'}>
                                    <CButton className={"btn btn-dark  me-2"}
                                             onClick={() => setShow(!show)}>
                                        취소
                                    </CButton>
                                    <CButton className={"btn btn-dark "}
                                             type={'submit'}
                                    >
                                        확인
                                    </CButton>
                                </div>
                            </form>
                        </CModalBody>
                    </CModal>

                </>
            )
        case PopupConstant.YES_NO:
            return (
                <>
                    <CModal
                        visible={show}
                        onDismiss={() => setShow(false)}
                        onClose={() => setShow(false)}
                        alignment="center"
                    >
                        <CModalBody>
                            <div className="text-center fw-semibold">{headerContent}</div>
                            <p className="text-center p-4">{content ? content : '삭제하시겠습니까?\n' +
                                '\n' +
                                '삭제 시 복구할 수 없습니다.'}</p>
                            <div className="d-flex justify-content-center">
                                <CButton
                                    variant="outline"
                                    color="dark"

                                    className="me-3 w-25"
                                    onClick={() => setShow(!show)}>
                                    취소
                                </CButton>
                                <CButton className="w-25" color="dark" onClick={onClickYes}>
                                    확인
                                </CButton>
                            </div>
                        </CModalBody>
                    </CModal>
                </>
            )
        case PopupConstant.YES:
            return <CModal
                visible={show}
                onDismiss={() => setShow(false)}
                onClose={() => setShow(false)}
                alignment="center"
            >
                <CModalBody>
                    <p className="m-5 text-center">{content ? content : '저장되었습니다.'}</p>
                    <div className={'d-flex justify-content-center'}>
                        <CButton className={"btn btn-dark "} onClick={onClickYes}>
                            확인
                        </CButton>
                    </div>
                </CModalBody>
            </CModal>
        default:
            return <>
                <CModal
                    visible={show}
                    onDismiss={() => setShow(false)}
                    onClose={() => setShow(false)}
                    alignment="center"
                >
                    <CModalBody>
                        <p className="m-5 text-center">{content ? content : "모든 항목을 입력해주시기 바랍니다."}</p>
                    </CModalBody>
                </CModal>
            </>
    }
}

export default PopupCommon


