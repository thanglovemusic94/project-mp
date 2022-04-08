import { useHistory, useParams } from "react-router";
import { useState } from "react";
import { CButton, CForm, CFormInput, CTable, CTableBody, CTableDataCell, CTableRow } from "@coreui/react";
import { handleChange } from "../../../utils/StateUtils";
import PopupCommon from "../../../commons/PopupCommon";
import { PopupConstant } from "../../../constants/PopupConstant";
import { FAQ_ROUTER } from "../../../constants/RouterConstant";
import { FaqService } from "../../../services/FaqService";
import FormattedDateTime from "../../../commons/FormattedDateTime";
import { CommonMessage, FAQ } from "../../../constants/ErrorMessage";

const FaqForm = ({ data, setData, isEdit }) => {
    const history = useHistory();
    const { id } = useParams()

    const [showDelete, setShowDelete] = useState(false)
    // const [showPopup, setShowPopup] = useState(false)

    const [contentNotify, setContentNotify] = useState("")
    const [showNotify, setShowNotify] = useState(false)

    const onClickYes = () => {
        if (id) {
            FaqService.remove(id).then(() => history.push(FAQ_ROUTER.LIST))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        //validated form
        if (!data.title || data.title.trim().length === 0) {
            setContentNotify(FAQ.TitleRequired)
            setShowNotify(!showNotify)
            return
        }

        if (!data.content || data.content.trim().length === 0) {
            setContentNotify(FAQ.ContentRequired)
            setShowNotify(!showNotify)
            return
        }
        // const form = event.currentTarget
        // if (form.checkValidity() === false) {
        //     event.stopPropagation()
        //     setShowPopup(true)
        // } else {
        if (isEdit) {
            FaqService.save(data, id)
                .then(() => history.push(FAQ_ROUTER.LIST))
                .catch((e) => {
                    console.log(e)
                    setContentNotify(CommonMessage)
                    setShowNotify(!showNotify)
                })
        } else {
            FaqService.create(data)
                .then(() => history.push(FAQ_ROUTER.LIST))
                .catch((e) => {
                    console.log(e)
                    setContentNotify(CommonMessage)
                    setShowNotify(!showNotify)
                })
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
                            <CTableDataCell className={'bg-dark text-white text-center col-2'} scope="row">FAQ 제목
                                *</CTableDataCell>
                            <CTableDataCell colSpan="3">
                                <CFormInput
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
                        {isEdit &&
                            <CTableRow className={'align-middle'}>
                                <CTableDataCell className={'bg-dark text-white text-center col-2'}>등록일</CTableDataCell>
                                <CTableDataCell className={"col-4 ps-2"}>
                                    <span className={'ps-4'}>
                                        <FormattedDateTime source={data.createdOn} format={'YYYY.MM.DD'} />
                                    </span></CTableDataCell>
                                <CTableDataCell className={"bg-dark text-white text-center col-2"}>수정일</CTableDataCell>
                                <CTableDataCell className={"col-4"}>
                                    <span className={'ps-4'}>
                                        <FormattedDateTime source={data.updatedOn} format={'YYYY.MM.DD'} />
                                    </span></CTableDataCell>
                            </CTableRow>
                        }
                        <CTableRow className={'align-middle'}>
                            <CTableDataCell className={'bg-dark text-white text-center col-2'}>FAQ 내용 *</CTableDataCell>
                            <CTableDataCell colSpan="3">
                                <textarea type={'text'} className="form-control" rows="9"
                                    name={'content'}
                                    value={data.content}
                                    onChange={e => handleChange(e, data, setData)}
                                    placeholder={'글자수 공백포함 1000자 입력 가능'}
                                    maxLength={1000}
                                    required />
                            </CTableDataCell>

                        </CTableRow>
                    </CTableBody>
                </CTable>
                <div className="d-flex flex-wrap justify-content-between">
                    <CButton
                        className={"btn btn-dark "}
                        onClick={() => history.push(FAQ_ROUTER.LIST)}
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
            {/* <PopupCommon show={showPopup} setShow={setShowPopup}/> */}
        </>
    )
}

export default FaqForm
