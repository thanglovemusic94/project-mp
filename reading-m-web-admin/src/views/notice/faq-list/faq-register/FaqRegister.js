import React, {useEffect, useState} from 'react'
import {
    CCardBody,
    CButton,
    CCard,
    CCol,
    CInput,
    CRow,
    CModalBody,
    CModal,
    CTextarea,
} from '@coreui/react';
import {ValidationText} from "../../../../common/Validation";
import {FaqService} from "../../../../services/FaqService";

export default function FaqRegister(props) {
    const [small, setSmall] = useState(false)
    const [isValidForm, setFormValidation] = useState(undefined);
    const [isCreateAction, setCreateAction] = useState(true);
    const [data, setData] = useState({
        id: props.match.params.id,
        question:"",
        answer:"",
        createdOn:"",
    })

    function onChange(e) {
        const {id, value} = e.target
        setData({...data, [id]: value})
    }

    useEffect(() => {
        let {id} = props.match.params
        if (id) {
            setCreateAction(false)
            FaqInfo()
        }

    }, [props.match.params.id])

    function FaqInfo()
    {
        FaqService.getFaqDetail(props.match.params.id).then((response) => {
            setData(response.data)
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        const form = e.currentTarget
        if (!form.checkValidity()) {
            setFormValidation(false)
        } else {
            setFormValidation(true)
            if (isCreateAction) {
                FaqService.postFaq(data).then((res)=>{
                    if(res.status===201)
                    {
                        setSmall(!small)
                    }
                })
            } else {
                FaqService.patchFaq(data).then((res)=>{
                    if(res.status===204)
                    {
                        setSmall(!small)
                    }
                })
            }
        }

    }

    return (
        <>
            <h2 className="mb-4">자주 묻는 질문 등록</h2>
            <CCard>
                <CCardBody>
                    <div className="d-flex justify-content-end">
                        <p className="text-danger">
                            * 표시된 영역은 필수 입력 영역 입니다.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} noValidate
                          className={`${(isValidForm === false) ? ' was-validated' : ''}`}>
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    질문
                                </td>
                                <td>
                                    <CInput id="question"
                                        className="col-6" onChange={onChange}
                                        placeholder="질문 입력" required value={data.question}
                                    />
                                    <div className="text-left invalid-feedback"
                                         style={{color: "red"}}>{ValidationText.Question}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="td203">
                                    <span className="text-danger mr-1">*</span>
                                    답변
                                </td>
                                <td>
                                    <CTextarea id="answer"
                                        rows="9" onChange={onChange}
                                        placeholder="답변 입력" required value={data.answer}
                                    />
                                    <div className="text-left invalid-feedback"
                                         style={{color: "red"}}>{ValidationText.Answer}</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <CRow className="justify-content-center mt-5">
                            <CCol md="2">
                                <CButton block color="dark" variant="outline" to="/notice/faq-list/faqs">
                                    취소
                                </CButton>
                            </CCol>
                            <CCol md="2">
                                <CButton block color="dark" type="submit">
                                    저장
                                </CButton>
                            </CCol>
                        </CRow>
                    </form>
                </CCardBody>
            </CCard>
            <CModal show={small} onClose={() => setSmall(!small)} size="sm" centered>
                <CModalBody className="text-center">
                    <p>저장되었습니다.</p>
                    <CButton color="dark" to="/notice/faq-list/faqs">
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}
