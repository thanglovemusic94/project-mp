import React, {useEffect, useState} from 'react'
import {CButton, CCard, CCardBody, CCol, CModal, CModalBody, CRow,} from '@coreui/react'
import {InquiryService} from "../../../../services/InquiryService";
import {useParams} from "react-router-dom";
import {DateUtils} from "../../../../utils/DateUtils";
import {ValidationText} from "../../../../common/Validation";
import {convertRole} from "../../../../constants/role.constants";
import {convertInquiryType} from "../../../../constants/inquiry.type.containts";

const InquiryAnswer = () => {
    const [showConfirm, setShowConfirm] = useState(false)

    const [isValidForm, setFormValidation] = useState(undefined);
    let {id} = useParams()

    const [data, setData] = useState({
        id: id,
        type: "",
        title: "",
        question: "",
        answer: "",
        status: "",
        createdOn: "",
        writer: "",
        memberType: "",
        questioner: {},
    })

    function getData() {
        InquiryService.getInquiryId(id).then((res) => {
            if (res.status === 200) {
                setData(res.data)
            }
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        getData()
    }, [id, isValidForm])

    function onChange(e) {
        const {id, value} = e.target
        setData({...data, [id]: value})
    }

    function handleSave(e) {
        e.preventDefault()
        const form = e.currentTarget
        if (!form.checkValidity()) {
            setFormValidation(false)
        } else {
            setFormValidation(true)
            InquiryService.postAnswer(data).then((response) => {
                if (response.status === 200) {
                    getData()
                    setShowConfirm(!showConfirm)
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    return (
        <>
            <h2 className="mb-4">1:1 문의 답변하기</h2>
            <CCard>
                <CCardBody>
                    <div className="d-flex justify-content-end">
                        {
                            isValidForm === false &&
                            <p className="text-danger">
                                * 표시된 영역은 필수 입력 영역 입니다.
                            </p>
                        }

                    </div>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td className="tdfull" colSpan="4">
                                문의 내역
                            </td>
                        </tr>

                        <tr>
                            <td className="td203">문의 유형</td>
                            <td colSpan="3" id="type">{convertInquiryType(data.type)}</td>
                        </tr>
                        <tr>
                            <td className="td203">회원 유형</td>
                            <td colSpan="3" id="memberType">{convertRole(data.questioner.role)}</td>
                        </tr>
                        <tr>
                            <td className="td203">작성자</td>
                            <td colSpan="3" id="writer">{data.questioner.name}</td>
                        </tr>
                        <tr>
                            <td className="td203">작성일</td>
                            <td colSpan="3" id="createdOn">
                                {
                                    DateUtils.toLocalDate(data.createdOn)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="td203">1:1 문의 제목</td>
                            <td colSpan="3" id="title">{data.title}</td>
                        </tr>
                        <tr>
                            <td className="td203">1:1 문의 내용</td>
                            <td colSpan="3" id="question">{data.question}</td>
                        </tr>

                        <tr>
                            <td className="tdfull" colSpan="4">
                                관리자 답변
                            </td>
                        </tr>
                        <tr>

                            <td className="td203">
                                <span className="text-danger mr-1">*</span>
                                문의 답변
                            </td>
                            <td colSpan="3">
                                <form onSubmit={handleSave} noValidate id={"formIqAnswer"}
                                      className={`${(isValidForm === false) ? ' was-validated' : ''}`}>
                                    <textarea className="form-control" placeholder="문의 답변 입력" rows="9" id="answer"
                                              onChange={onChange}
                                              required/>
                                    <div className="text-left invalid-feedback"
                                         style={{color: "red"}}>{ValidationText.Answer}
                                    </div>
                                </form>
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
                                to="/notice/inquiry-list/inquiries/Inquiries"
                            >
                                취소
                            </CButton>
                        </CCol>
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                type={"submit"}
                                form={"formIqAnswer"}
                            >
                                저장
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <CModal
                show={showConfirm}
                onClose={() => setShowConfirm(!showConfirm)}
                size="sm"
                centered
            >
                <CModalBody className="text-center">
                    <p>저장되었습니다.</p>
                    <CButton
                        color="dark"
                        to="/notice/inquiry-list/inquiries/Inquiries"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}

export default InquiryAnswer
