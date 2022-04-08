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
import { ReviewService } from "../../../services/ReviewService";
import checkClassType from "../../../constants/class.constants";
import { DateUtils } from "../../../utils/DateUtils";
import Pagination from "../../../common/Paging";
import { ReviewType } from "../../../constants/review.containts";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import { ClassType } from "../../../constants/class.constants";


export default function Reviews() {
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
        query: ''
    })

    function handlePageChange(page) {
        if (page > 0) {
            --page;
        }
        setParams({ ...params, page: page })
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setParams({ ...params, [name]: value, term: term.current.value })
    };

    const handleToggle = (classId, userId, state) => {
        let checkState = '';
        if (state === 'SHOW') {
            checkState = 'HIDE'
        } else {
            checkState = 'SHOW'
        }
        ReviewService.toggleShow(classId, userId, checkState).then((res) => {
            getReviews()
        }).catch(e => console.log(e))
    }

    const getReviews = () => ReviewService.getReviews(params).then((resp) => {
        setData(resp.data)
    }).catch(e => console.log(e))

    useEffect(() => {
        trackPromise(
            getReviews()
        )
    }, [params])

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, term: term.current.value });
    };


    return (
        <>
            <h2 className="mb-4">후기 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm action="" method="post" className="form-horizontal" onSubmit={handleSubmit}>
                        <CFormGroup row>
                            <CCol md="6" className="radio-group-custom rgc100">
                                <CFormGroup variant="checkbox">
                                    <CInputRadio
                                        id="radio1"
                                        name="showStatus"
                                        value={''}
                                        onChange={handleInputChange}
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
                                        name="showStatus"
                                        value={ReviewType.SHOW.value}
                                        onChange={handleInputChange}
                                    />
                                    <CLabel
                                        variant="checkbox"
                                        htmlFor="radio2"
                                    >
                                        노출
                                    </CLabel>
                                </CFormGroup>
                                <CFormGroup variant="checkbox">
                                    <CInputRadio
                                        id="radio3"
                                        name="showStatus"
                                        value={ReviewType.HIDE.value}
                                        onChange={handleInputChange}
                                    />
                                    <CLabel
                                        variant="checkbox"
                                        htmlFor="radio3"
                                    >
                                        숨김
                                    </CLabel>
                                </CFormGroup>
                                <CFormGroup className="mr-2">
                                    <CSelect custom name="classType" onChange={handleInputChange} defaultValue="">
                                        <option value="">{ClassType.ALL.label}</option>
                                        <option value={ClassType.TextBookClass.value}>{ClassType.TextBookClass.label}</option>
                                        <option value={ClassType.GoalClass.value}>{ClassType.GoalClass.label}</option>
                                        <option value={ClassType.DavinciClass.value}>{ClassType.DavinciClass.label}</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol md="6">
                                <div className="form-inline">
                                    <CFormGroup className="col-3 justify-content-end">
                                        <CSelect custom name="optionSearch" onChange={handleInputChange} defaultValue="">
                                            <option value="">선택</option>
                                            <option value="content">후기 내용</option>
                                            <option value="reviewer">작성자</option>
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
                                <th>수업 정보</th>
                                <th>별점</th>
                                <th>후기 내용</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>숨김여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((value, index) => (
                                <tr key={index}>
                                    <td>{(data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)}</td>
                                    <td>[{checkClassType(value.classInfo.type)}] {value.classInfo.name}</td>
                                    <td>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            edit={false}
                                            value={value.rating}
                                            color={'#efefef'}
                                            activeColor="#ffb400"
                                        />
                                        {/*<div className="icon-star-custom">*/}
                                        {/*        <CIcon name="cil-star" />*/}
                                        {/*</div>*/}
                                    </td>
                                    <td>{value.content}</td>
                                    <td>{value.writer.name}</td>
                                    <td>{DateUtils.toLocalDate(value.createdOn)}</td>
                                    <td>
                                        <CButton block color="dark" size="sm"
                                            onClick={() => handleToggle(value.id.classId, value.id.userId, value.status)}>
                                            {value.status === 'HIDE' ? '숨김' : '숨김취소'}
                                        </CButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        data.content.length > 0 &&
                        <Pagination page={data.number} totalPages={data.totalPages}
                            handlePageChange={handlePageChange}></Pagination>
                    }
                </CCardBody>
            </CCard>
        </>
    )
}


