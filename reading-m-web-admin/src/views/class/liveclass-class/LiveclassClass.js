import React, { useEffect, useState, useRef } from 'react'
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
    CPagination,
    CSelect
} from '@coreui/react'
import ModalAttenDetail from './ModalAttenDetail'
import { trackPromise } from 'react-promise-tracker'
import { ClassService } from '../../../services/ClassService'
import { ClassType } from 'src/constants/class.constants'
import checkClassType from 'src/constants/class.constants'
import { DateUtils } from 'src/utils/DateUtils'
import NumberFormat from 'react-number-format'
import { convertMemberType } from 'src/constants/member.type.constants'

export default function LiveclassClass() {
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
        classType: '',
        optionSearch: '',
        term: ''
    })

    const [showOn, setModalAttenDetail] = useState(false)

    const [classId, setClassId] = useState(0)

    function handleChangeQuery(e) {
        const { name, value } = e.target
        setParams({ ...params, [name]: value, term: term.current.value })
    }

    const showModalAttenDetail = (classId) => {
        setModalAttenDetail(!showOn)
        setClassId(classId)
    }

    useEffect(() => {
        trackPromise(
            ClassService.getLiveClassBy(params).then((resp) => {
                setData(resp.data)
            })
        )
    }, [params])

    function handlePageChange(page) {
        if (page > 0) {
            --page;
        }
        setParams({ ...params, page: page })
    }

    function toggleClassShowHide(clazz) {
        clazz.status = clazz.status === 'SHOW' ? 'HIDE' : 'SHOW'
        setData({ ...data })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, term: term.current.value });
    };

    return (
        <>
            <h2 className="mb-4">LiveClass 수업 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm action="" method="post" className="form-horizontal" onSubmit={handleSubmit}>
                        <CFormGroup row>
                            <CCol md="6">
                                <div className="radio-group-custom mb-2">
                                    <CFormGroup variant="checkbox">
                                        <CInputRadio
                                            id="radio1"
                                            name="classType"
                                            value=""
                                            onChange={handleChangeQuery}
                                            defaultChecked
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
                                            name="classType"
                                            value={
                                                ClassType.TextBookClass.value
                                            }
                                            onChange={handleChangeQuery}
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            htmlFor="radio2"
                                        >
                                            LiveClass 책글
                                        </CLabel>
                                    </CFormGroup>

                                    <CFormGroup variant="checkbox">
                                        <CInputRadio
                                            id="radio3"
                                            name="classType"
                                            value={ClassType.GoalClass.value}
                                            onChange={handleChangeQuery}
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            htmlFor="radio3"
                                        >
                                            LiveClass 목적
                                        </CLabel>
                                    </CFormGroup>
                                </div>
                            </CCol>
                            <CCol md="6">
                                <div className="form-inline">
                                    <CFormGroup className="col-3 justify-content-end">
                                        <CSelect custom name="optionSearch" onChange={handleChangeQuery} defaultValue="">
                                            <option value="">선택</option>
                                            <option value="className">수업명</option>
                                            <option value="tutorName">지도교사 이름</option>
                                            <option value="tuitionFee">교육비</option>
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
                                </div>
                            </CCol>
                        </CFormGroup>
                    </CForm>

                    <table className="table text-center table-bordered">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>구분</th>
                                <th>LiveClass 수업 종류</th>
                                <th>수업명</th>
                                <th>지도교사 이름</th>
                                <th>교육비</th>
                                <th>개설일</th>
                                <th>출석 상세</th>
                                <th>수업 상세</th>
                                <th>숨김 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((clazz, index) => (
                                <ClassRow
                                    clazz={clazz}
                                    key={index}
                                    number={(data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)}
                                    onShowModalAttenDetail={
                                        () => showModalAttenDetail(clazz.id)
                                    }
                                    onToggleClassShowHide={toggleClassShowHide}
                                />
                            ))}
                        </tbody>
                    </table>
                    <CPagination
                        activePage={data.number + 1}
                        pages={data.totalPages}
                        onActivePageChange={handlePageChange}
                        // doubleArrows={false}
                        align="center"
                        className="mt-4"
                        limit={10}
                    />
                </CCardBody>
            </CCard>
            <ModalAttenDetail
                show={showOn}
                setModalAttenDetail={setModalAttenDetail}
                classId={classId}
            />
        </>
    )
}

function ClassRow({ clazz, number, onShowModalAttenDetail, onToggleClassShowHide }) {
    return (
        <tr>
            {/* <td>Q&A</td> */}
            {/* need Q&A about this column data */}
            <td>{number}</td>
            <td>{convertMemberType(clazz.source)}</td>
            <td>{checkClassType(clazz.type)}</td>
            <td>{clazz.name}</td>
            <td>{clazz.tutor.name}</td>
            <td><NumberFormat value={clazz.tuitionFee} thousandSeparator={true} displayType={'text'} /> 원</td>
            <td>{DateUtils.toLocalDate(clazz.openDate)}</td>
            <td>
                <CButton
                    block
                    color="dark"
                    size="sm"
                    onClick={onShowModalAttenDetail}
                >
                    출석 상세
                </CButton>
            </td>
            <td>
                <CButton
                    block
                    color="dark"
                    size="sm"
                    to="/main/notices/notice-edit"
                >
                    수업 상세
                </CButton>
            </td>
            <td>
                <CButton
                    block
                    color="dark"
                    size="sm"
                    // to="/main/notices/notice-edit"
                    onClick={() => onToggleClassShowHide(clazz)}
                >
                    {clazz.clazz === 'SHOW' ? '숨김' : '숨김 취소'}
                </CButton>
            </td>
        </tr>
    )
}
