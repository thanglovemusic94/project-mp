import React, {useEffect, useState} from 'react'
import {CButton, CCard, CCardBody, CCol, CRow} from '@coreui/react'
import {InquiryService} from "../../../../services/InquiryService";
import {DateUtils} from "../../../../utils/DateUtils";
import {convertRole} from "../../../../constants/role.constants";
import {convertInquiryType} from "../../../../constants/inquiry.type.containts";

export default function InquiryComplete(props) {
    let {id} = props.match.params
    const [data, setData] = useState();
    useEffect(() => {
        getData()
    }, [id])

    function getData() {
        InquiryService.getInquiryId(id).then((res) => {
            if (res.status === 200) {
                setData(res.data)
            }
        }).catch(e => console.log(e))
    }


    return (
        <>
            <h2 className="mb-4">1:1 문의 답변완료</h2>
            <CCard>
                <CCardBody>
                    {data &&
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
                            <td className="td203">문의 답변</td>

                            <td colSpan="3" id="answer">{data.answer}</td>
                        </tr>
                        </tbody>
                    </table>
                    }
                    <CRow className="justify-content-center mt-5">
                        <CCol md="3">
                            <CButton block color="dark" to={"/notice/inquiry-list"}>
                                목록으로
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    )
}
