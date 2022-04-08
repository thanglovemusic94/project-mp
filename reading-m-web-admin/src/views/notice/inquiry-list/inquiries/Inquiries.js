import React, { useEffect, useRef, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInputGroup,
    CInputGroupAppend,
    CInputRadio,
    CLabel,
    CSelect
} from '@coreui/react'
import { trackPromise } from 'react-promise-tracker'
import { InquiryService } from "../../../../services/InquiryService";
import { useHistory } from 'react-router'
import Pagination from "../../../../common/Paging";
import { DateUtils } from "../../../../utils/DateUtils";
import { InquiryType, convertInquiryType } from "../../../../constants/inquiry.type.containts";
import { InquiryStatus, convertInquiryStatus } from "../../../../constants/inquiry.status.containts";
import { UserRole, convertRole } from "../../../../constants/role.constants";

export default function Inquiries() {
    const history = useHistory();
    const term = useRef();
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: ['id,DESC'],
        term: '',
        type: '',
        role: '',
        status: '',
        optionSearch: '',
    })

    const handleInputChange = event => {
        const { name, value } = event.target;
        setParams({ ...params, [name]: value, term: term.current.value })
    };

    useEffect(() => {
        trackPromise(
            InquiryService.getInquiry(params).then((resp) => {
                setData(resp.data)
            }).catch(e => console.log(e))
        )
    }, [params])

    function handlePageChange(page) {
        if (page > 0) --page;
        setParams({ ...params, page: page })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, term: term.current.value });
    };

    return (
        <>
            <h2 className="mb-4">1:1 문의 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm action="" method="post" className="form-horizontal" onSubmit={handleSubmit}>
                        <CFormGroup row>
                            <CCol md="8">
                                <div className="radio-group-custom rgc100">
                                    <CFormGroup variant="checkbox">
                                        <CInputRadio
                                            id="radio1"
                                            name="type"
                                            value=""
                                            defaultChecked
                                            onChange={handleInputChange}
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            htmlFor="radio1"
                                        >
                                            전체
                                        </CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="checkbox">
                                        <CInputRadio
                                            id="radio2"
                                            name="type"
                                            value={InquiryType.CLASS.value}
                                            onChange={handleInputChange}
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            htmlFor="radio2"
                                        >
                                            수업
                                        </CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="checkbox">
                                        <CInputRadio
                                            id="radio3"
                                            name="type"
                                            value={InquiryType.PAYMENT_REFUND.value}
                                            onChange={handleInputChange}
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            htmlFor="radio3"
                                        >
                                            결제/환불
                                        </CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="checkbox">
                                        <CInputRadio
                                            id="radio4"
                                            name="type"
                                            value={InquiryType.SETTLEMENT.value}
                                            onChange={handleInputChange}
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            htmlFor="radio4"
                                        >
                                            정산
                                        </CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="checkbox">
                                        <CInputRadio
                                            id="radio5"
                                            name="type"
                                            value={InquiryType.OTHERS.value}
                                            onChange={handleInputChange}
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            htmlFor="radio5"
                                        >
                                            기타
                                        </CLabel>
                                    </CFormGroup>
                                </div>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol className="form-inline" md="6">
                                <CFormGroup className="mr-2">
                                    <CSelect custom name="role" onChange={handleInputChange} defaultValue={UserRole.ALL.value}>
                                        <option value={UserRole.ALL.value}>{UserRole.ALL.label}</option>
                                        <option value={UserRole.STUDENT.value}>{UserRole.STUDENT.label}</option>
                                        <option value={UserRole.PARENT.value}>{UserRole.PARENT.label}</option>
                                        <option value={UserRole.TUTOR.value}>{UserRole.TUTOR.label}</option>
                                    </CSelect>
                                </CFormGroup>
                                <CFormGroup className="mr-2">
                                    <CSelect custom name="status" onChange={handleInputChange} defaultValue={InquiryStatus.ALL.value}>
                                        <option value={InquiryStatus.ALL.value}>{InquiryStatus.ALL.label}</option>
                                        <option value={InquiryStatus.UNANSWERED.value}>{InquiryStatus.UNANSWERED.label}</option>
                                        <option value={InquiryStatus.ANSWERED.value}>{InquiryStatus.ANSWERED.label}</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol md="6" className="form-inline">
                                <CFormGroup className="col-3 justify-content-end">
                                    <CSelect custom name="optionSearch" onChange={handleInputChange} defaultValue="">
                                        <option value="">선택</option>
                                        <option value="inquiry">1: 1 문의 제목</option>
                                        <option value="writer">작성자</option>
                                    </CSelect>
                                </CFormGroup>
                                <CInputGroup className="col-9">
                                    <CInput
                                        name="input2-group2"
                                        placeholder="파일을 등록해주세요."
                                        innerRef={term}
                                    />
                                    <CInputGroupAppend>
                                        <CButton type="submit" color="dark">
                                            검색
                                        </CButton>
                                    </CInputGroupAppend>
                                </CInputGroup>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                    <table className="table text-center table-bordered">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>문의 유형</th>
                                <th>1:1 문의 제목</th>
                                <th>회원 유형</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>답변여부</th>
                                <th>1:1 문의 상세상세</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((value, index) => (
                                <tr key={index}>
                                    <td>{(data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)}</td>
                                    <td>{convertInquiryType(value.type)}</td>
                                    <td>{value.title}</td>
                                    <td>{convertRole(value.questioner.role)}</td>
                                    <td>{value.questioner.name}</td>
                                    <td>{DateUtils.toLocalDate(value.createdOn)}</td>
                                    <td>{convertInquiryStatus(value.status)}</td>
                                    <td>
                                        {value.status === InquiryStatus.ANSWERED.value ?
                                            <CButton
                                                block
                                                color="dark"
                                                size="sm"
                                                onClick={() =>
                                                    history.push("/notice/inquiry-list/inquiry-complete/" + value.id)}
                                            >
                                                상세
                                            </CButton> :
                                            <CButton
                                                block
                                                color="dark"
                                                size="sm"
                                                onClick={() =>
                                                    history.push("/notice/inquiry-list/inquiry-answer/" + value.id)}
                                            >
                                                답변하기
                                            </CButton>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        data.content.length > 0 &&
                        <Pagination
                            page={data.number} totalPages={data.totalPages}
                            handlePageChange={handlePageChange}></Pagination>
                    }

                </CCardBody>
            </CCard>
        </>
    )
}


