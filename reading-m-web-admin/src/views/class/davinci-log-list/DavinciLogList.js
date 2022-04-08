import React, { useEffect, useState, useRef } from 'react'
import moment from "moment";
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
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { trackPromise } from 'react-promise-tracker'
import { ClassService } from '../../../services/ClassService'
import DateTime from 'src/common/DateTime'

export default function DavinciLogList() {
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
    })

    useEffect(() => {
        trackPromise(
            ClassService.getDavincilog(params).then((resp) => {
                setData(resp.data)
            })
        )
    }, [params])

    function handlePageChange(page) {
        setParams({ ...params, page })
    }

    const onFormSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, term: term.current.value });
    }

    const onChangeTime = (name, date) => {
        if (date) {
            setParams({ ...params, [name]: moment(date).format("YYYY-MM-DD") });
        } else {
            setParams({ ...params, [name]: "" });
        }
    }

    function handleChangeFilterSearch(e) {
        const { name, value } = e.target
        setParams({ ...params, [name]: value, term: term.current.value })
    }


    return (
        <>
            <h2 className="mb-4">다빈치 로그 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm className="form-horizontal" onSubmit={onFormSubmit}>
                        <CFormGroup row>
                            <CCol md="6">
                                <div className="d-flex">
                                    <DatePicker
                                        name="startDate"
                                        selected={params.startDate ? new Date(params.startDate) : ""}
                                        onChange={date => onChangeTime("startDate", date)}
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="YYYY.MM.DD"
                                        className="mx-2"
                                    />
                                    ~
                                    <DatePicker
                                        name="endDate"
                                        selected={params.endDate ? new Date(params.endDate) : ""}
                                        onChange={date => onChangeTime("endDate", date)}
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="YYYY.MM.DD"
                                        className="mx-2"
                                    />
                                </div>
                            </CCol>

                            <CCol md="6">
                                <div className="form-inline">
                                    <CFormGroup className="col-3 justify-content-end">
                                        <CSelect custom name="optionSearch" onChange={handleChangeFilterSearch} defaultValue="">
                                            <option value="">선택</option>
                                            <option value="courseName">강의명</option>
                                            <option value="courseTitle">강의 제목</option>
                                            <option value="targetStudent">학생</option>
                                            <option value="id">ID</option>
                                        </CSelect>
                                    </CFormGroup>

                                    <CInputGroup className="col-9">
                                        <CInput
                                            type="text"
                                            name="term"
                                            innerRef={term}
                                            placeholder="파일을 등록해주세요."
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
                                <th>강의명</th>
                                <th>강의 제목</th>
                                <th>학생</th>
                                <th>ID</th>
                                <th>IP</th>
                                <th>시청일시</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((clazz, index) => (
                                <ClassRow
                                    clazz={{ clazz, index }}
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
                        align="center"
                        className="mt-4"
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
            <td>{clazz.clazz.lectureName}</td>
            <td>{clazz.clazz.lectureTitle}</td>
            <td>{clazz.clazz.studentName}</td>
            <td>{clazz.clazz.id}</td>
            <td>{clazz.clazz.ip}</td>
            <td><DateTime date={clazz.clazz.createdOn} format="YYYY-MM-DD hh:mm:ss" /></td>
        </tr>
    )
}
