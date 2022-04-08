import React, { useEffect, useRef, useState } from 'react'
import {
    CCardBody,
    CButton,
    CCard,
    CCol,
    CInputGroup,
    CInputGroupAppend,
    CInput,
    CFormGroup,
    CForm,
    CSelect
} from '@coreui/react'
import { trackPromise } from 'react-promise-tracker'
import { TutorApplicationService } from '../../../services/TutorApplicationService'
import Pagination from "../../../common/Paging";
import { DateUtils } from "../../../utils/DateUtils";
import { TutorStatus, convertTutorStatus } from "../../../constants/tutor.status.constants"

export default function TutorRegisterList() {
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
        status: '',
        optionSearch: '',
        query: ''
    })

    function handlePageChange(page) {
        if (page > 0) {
            --page;
        }
        setParams({ ...params, page: page })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, query: term.current.value });
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setParams({ ...params, [name]: value, query: term.current.value })
    };

    useEffect(() => {
        trackPromise(
            TutorApplicationService.getTutorApplications(params).then((resp) => {
                setData(resp.data)
            })
        )
    }, [params])


    return (
        <>
            <h2 className="mb-4">지도교사 지원 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm action="" method="post" className="form-horizontal" onSubmit={handleSubmit}>
                        <CFormGroup row>
                            <CCol className="form-inline" md="6">
                                <CFormGroup className="mr-2">
                                    <CSelect custom name="status" onChange={handleInputChange} defaultValue={TutorStatus.ALL.value}>
                                        <option value={TutorStatus.ALL.value}>{TutorStatus.ALL.label}</option>
                                        <option value={TutorStatus.WAITING.value}>{TutorStatus.WAITING.label}</option>
                                        <option value={TutorStatus.APPROVED.value}>{TutorStatus.APPROVED.label}</option>
                                        <option value={TutorStatus.REFUSED.value}>{TutorStatus.REFUSED.label}</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol md="6" className="form-inline">
                                <CFormGroup className="col-3 justify-content-end">
                                    <CSelect custom name="optionSearch" onChange={handleInputChange} defaultValue="">
                                        <option value="">선택</option>
                                        <option value="tutorName">이름</option>
                                        <option value="phone">휴대폰 번호</option>
                                        <option value="email">이메일</option>
                                    </CSelect>
                                </CFormGroup>
                                <CInputGroup className="col-9">
                                    <CInput
                                        name="term"
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
                                <th>이름</th>
                                <th>휴대폰 번호</th>
                                <th>이메일</th>
                                <th>지원일</th>
                                <th>지원상태</th>
                                <th>지원 상세</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((item, index) => (
                                <tr key={index}>
                                    <td>{(data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)}</td>
                                    <td>{item.tutor.name}</td>
                                    <td>{item.tutor.phone}</td>
                                    <td>{item.tutor.email}</td>
                                    <td>{DateUtils.toLocalDate(item.createdOn)}</td>
                                    <td>{convertTutorStatus(item.status)}</td>
                                    <td>
                                        <CButton
                                            block
                                            color="dark"
                                            size="sm"
                                            // to={{pathname:"/tutor/tutor-register-details", state: item}}
                                            to={`/tutor/tutor-register-details/${item.id}`}
                                        >
                                            상세
                                        </CButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {data.content.length > 0 &&
                        <Pagination page={data.number} totalPages={data.totalPages} handlePageChange={handlePageChange} />
                    }
                </CCardBody>
            </CCard>
        </>
    )
}


