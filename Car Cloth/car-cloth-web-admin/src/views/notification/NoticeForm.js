import { CButton, CForm, CFormSelect, CTable, CTableBody, CTableDataCell, CTableRow } from "@coreui/react";
import { useHistory, useParams } from "react-router";
import { useState } from "react";
import PopupCommon from "../../commons/PopupCommon";
import { handleChange } from "../../utils/StateUtils";
import { PopupConstant } from "../../constants/PopupConstant";
import { NoticeService } from "../../services/NoticeService";
import { NOTIFICATION_ROUTER } from "../../constants/RouterConstant";
import { TYPE_NOTICE } from "../../constants/TypeContaint";
import { CommonMessage, Notice } from "../../constants/ErrorMessage";


const NoticeForm = ({ data, setData, isEdit }) => {
    const history = useHistory();
    const { id } = useParams()

    const [showDelete, setShowDelete] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const [contentNotify, setContentNotify] = useState("")
    const [showNotify, setShowNotify] = useState(false)

    const onClickYes = () => {
        if (id) {
            NoticeService.remove(id)
            history.push(NOTIFICATION_ROUTER.LIST)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        //validated form
        if (!data.title || data.title.trim().length === 0) {
            setContentNotify(Notice.TitleRequired)
            setShowNotify(!showNotify)
            return
        }
        if (!data.content || data.content.trim().length === 0) {
            setContentNotify(Notice.ContentRequired)
            setShowNotify(!showNotify)
            return
        }
        // const form = event.currentTarget
        // if (form.checkValidity() === false) {
        //     event.stopPropagation()
        //     setShowPopup(true)
        // } else {
        if (isEdit) {
            NoticeService.save(data, id)
                .then(res => history.push(NOTIFICATION_ROUTER.LIST))
                .catch((err) => {
                    console.log(err)
                    setContentNotify(CommonMessage)
                    setShowNotify(!showNotify)
                })

        } else {
            NoticeService.create(data)
                .then(res => history.push(NOTIFICATION_ROUTER.LIST))
                .catch((err) => {
                    console.log(err)
                    setContentNotify(CommonMessage)
                    setShowNotify(!showNotify)
                })
            // history.push(NOTIFICATION_ROUTER.LIST)
        }
        // }
    }


    return (
        <>
            <CForm className="form-horizontal my-5"
                noValidate
                onSubmit={handleSubmit}
            >
                <CTable bordered>
                    <CTableBody>
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'} scope="row">유형
                                *</CTableDataCell>
                            <CTableDataCell>
                                <div className={'col-2'}>
                                    <CFormSelect aria-label="Default select example"
                                        name={'type'}
                                        onChange={e => handleChange(e, data, setData)}
                                        value={data.type ? data.type : TYPE_NOTICE.GENERAL_ID}
                                        required
                                    >
                                        {/* <option value={''}>전체</option> */}
                                        <option value={TYPE_NOTICE.GENERAL_ID}>{TYPE_NOTICE.GENERAL_NAME}</option>
                                        <option value={TYPE_NOTICE.COMPANY_ID}>{TYPE_NOTICE.COMPANY_NAME}</option>

                                    </CFormSelect>

                                </div>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}>제목
                                *</CTableDataCell>
                            <CTableDataCell>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="title"
                                    onChange={e => handleChange(e, data, setData)}
                                    value={data.title}
                                    placeholder={'글자수 공백포함 100자 입력 가능'}
                                    maxLength={100}
                                    required
                                />

                            </CTableDataCell>

                        </CTableRow>
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}>내용
                                *</CTableDataCell>
                            <CTableDataCell colSpan="2">
                                <textarea type={'text'} className="form-control" rows="9"
                                    name={'content'}
                                    value={data.content}
                                    maxLength={2000}
                                    placeholder={'글자수 공백포함 2000자 입력 가능'}
                                    onChange={e => handleChange(e, data, setData)}
                                    required />

                            </CTableDataCell>

                        </CTableRow>
                    </CTableBody>
                </CTable>
                <div className="d-flex flex-wrap justify-content-between">
                    <CButton
                        className={"btn btn-dark "}
                        onClick={() => history.push(NOTIFICATION_ROUTER.LIST)}
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
                                    onClickYes={onClickYes}
                                />
                            </>

                        }

                        <CButton
                            className="btn btn-dark "
                            type={'submit'}
                        >
                            {isEdit ? "저장" : '등록'}
                        </CButton>

                    </div>

                </div>
            </CForm>
            <PopupCommon show={showPopup} setShow={setShowPopup} />

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

export default NoticeForm
