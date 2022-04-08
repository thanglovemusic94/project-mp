import React, { useEffect, useState, useRef } from 'react'
import DateTime from 'src/common/DateTime'
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
    CPagination,
    CSelect
} from '@coreui/react'
import { trackPromise } from 'react-promise-tracker'
import { ClassService } from '../../../services/ClassService'

export default function LiveclassBook() {
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        term: '',
        optionSearch: ''
    })

    useEffect(() => {
        trackPromise(
            ClassService.getChangeTextBookWeek(params).then((resp) => {
                setData(resp.data)
            })
        )
    }, [params])

    const termInput = useRef();
    const onFormSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, term: termInput.current.value });
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setParams({ ...params, [name]: value, term: termInput.current.value })
    };

    function handlePageChange(page) {
        setParams({ ...params, page })
    }

    return (
        <>
            <h2 className="mb-4">LiveClass 책글 주차 수정 리스트 </h2>
            <CCard>
                <CCardBody>
                    <CForm className="form-horizontal" onSubmit={onFormSubmit}>
                        <CFormGroup row className="justify-content-end">

                            <CCol md="6">
                                <div className="form-inline">
                                    <CFormGroup className="col-3 justify-content-end">
                                        <CSelect custom name="optionSearch" onChange={handleInputChange} defaultValue="">
                                            <option value="">선택</option>
                                            <option value="classType">LiveClass 수업 종류</option>
                                            <option value="className">수업명</option>
                                            <option value="tutorName">지도교사 이름</option>
                                            <option value="reason">수정 사유</option>
                                        </CSelect>
                                    </CFormGroup>
                                    <CInputGroup className="col-9">
                                        <CInput
                                            type="text"
                                            placeholder="파일을 등록해주세요."
                                            name="term"
                                            innerRef={termInput}
                                        />
                                        <CInputGroupAppend>
                                            <CButton type="submit" color="dark">
                                                검색
                                            </CButton>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </div>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                    <table className="table text-center table-bordered">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>LiveClass 수업 종류</th>
                                <th>수업명</th>
                                <th>지도교사 이름</th>
                                <th>수정 사유</th>
                                <th>수정일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((clazz, index) => (
                                <ClassRow
                                    clazz={clazz}
                                    number={(data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)}
                                    key={index}
                                />
                            ))}
                        </tbody>
                    </table>
                    <CPagination
                        activePage={data.number + 1}
                        pages={data.totalPages}
                        onActivePageChange={(i) => handlePageChange(i - 1)}
                        // doubleArrows={false}
                        align="center"
                        className="mt-4"
                        limit={10}
                    />
                </CCardBody>
            </CCard>
        </>
    )
}

function ClassRow({ clazz, number }) {
    return (
        <tr>
            <td>{number}</td>
            <td>LiveClass 책글</td>
            <td>{clazz.className}</td>
            <td>{clazz.tutorName}</td>
            <td>{clazz.reason}</td>
            <td><DateTime date={clazz.createdOn} format="YYYY.MM.DD" /></td>
        </tr>
    )
}
