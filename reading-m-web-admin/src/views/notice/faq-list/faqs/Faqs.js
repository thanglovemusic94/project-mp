import React, { useEffect, useRef, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInputCheckbox,
    CInputGroup,
    CInputGroupAppend, CLabel,
    CModal,
    CModalBody,
    CRow,
} from '@coreui/react'
import { trackPromise } from 'react-promise-tracker'
import { FaqService } from "../../../../services/FaqService";
import { useHistory } from 'react-router'
import Pagination from "../../../../common/Paging";
import { DateUtils } from "../../../../utils/DateUtils";

export default function Faqs() {
    const history = useHistory();
    const term = useRef();
    const [delComfirm, setDelConfirm] = useState(false)
    const [delDone, setDelDone] = useState(false)
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
        query: ''
    })

    const [isDisable, setIsDisable] = useState(true)
    const [check, setCheck] = useState(false);
    const initialSelect = new Array(params.size).fill(false)
    const [checkTable, setCheckTable] = useState(initialSelect);

    const _onChangeHeaderCheckbox = (e) => {
        if (e.target.checked == true) {
            setCheck(true);
            setCheckTable(data.content.map(() => true));
            setIsDisable(false)
        } else {
            setCheck(false);
            setCheckTable(data.content.map(() => false));
            setIsDisable(true)
        }
    };

    const _onChangeRowCheckbox = (event, index) => {
        let i = 0
        setCheckTable(checkTable.map((item, idx) => {
            if (item === true) i++
            return (idx === index) ? !item : item
        }));

        if (event.target.checked === true) {
            setIsDisable(false);
        } else {
            if (i <= 1) setIsDisable(true)
        }
    };

    function handlePageChange(page) {
        if (page > 0) {
            --page;
        }
        setParams({ ...params, page: page })
    }

    useEffect(() => {
        trackPromise(
            FaqService.getFaqs(params).then((resp) => {
                setData(resp.data)
            }).catch(e => console.log(e))
        )
    }, [params, delDone])

    function deleteFaqs() {
        const ids = [];
        checkTable.map((item, idx) => {
            if (item === true) {
                ids.push(data.content[idx].id)
            }
        });
        FaqService.deleteFaq(ids).then(res => {
            setDelDone(!delDone)
            setCheckTable(initialSelect)
            setIsDisable(true)
            console.log("del success")
        }).catch(e => console.log(e))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, query: term.current.value });
    };
    return (
        <>
            <h2 className="mb-4">자주 묻는 질문 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm action="" method="post" className="form-horizontal" onSubmit={handleSubmit}>
                        <CFormGroup row className="justify-content-end">
                            <CCol md="6">
                                <CInputGroup>
                                    <CInput
                                        type="text"
                                        id="input2-group2"
                                        innerRef={term}
                                        name="input2-group2"
                                        placeholder="검색어를 입력해주세요."
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
                                <th style={{ width: '5%' }}>
                                    {data.content.length > 0 &&
                                    <CFormGroup variant="custom-checkbox">
                                        <CInputCheckbox
                                            onChange={_onChangeHeaderCheckbox}
                                            id="autohide"
                                            custom
                                            checked={check}
                                        />
                                        <CLabel variant="custom-checkbox" htmlFor="autohide">
                                        </CLabel>
                                    </CFormGroup>
                                    }
                                </th>
                                <th style={{ width: '10%' }}>번호</th>
                                <th>질문</th>
                                <th style={{ width: '15%' }}>등록일</th>
                                <th style={{ width: '15%' }}>수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((value, index) => (
                                <tr>
                                    <td>
                                        <CFormGroup variant="custom-checkbox">
                                            <CInputCheckbox
                                                onChange={(event) => _onChangeRowCheckbox(event, index)}
                                                id={"check" + index}
                                                value={value.id}
                                                checked={checkTable[index]}
                                                custom
                                            />
                                            <CLabel variant="custom-checkbox" htmlFor={"check" + index}>
                                            </CLabel>
                                        </CFormGroup>
                                    </td>
                                    <td>{
                                        (data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)
                                    }</td>
                                    <td>{value.question}</td>
                                    <td>
                                        {
                                            DateUtils.toLocalDate(value.createdOn)
                                        }
                                    </td>
                                    <td>
                                        <CButton block color="dark" size="sm"
                                            onClick={() => {
                                                history.push("/notice/faq-list/faq-edit/" + value.id)
                                            }}>
                                            수정
                                        </CButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <CRow className="justify-content-between">
                        <CCol md="2">
                            <CButton
                                onClick={() => setDelConfirm(!delComfirm)}
                                className="mr-1"
                                block
                                color="dark"
                                disabled={isDisable}
                            >
                                삭제
                            </CButton>
                        </CCol>
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                onClick={() => history.push("/notice/faq-list/faq-register")}
                            >
                                등록
                            </CButton>
                        </CCol>
                    </CRow>

                    {data.content.length > 0 &&
                        <Pagination
                            page={data.number}
                            totalPages={data.totalPages}
                            handlePageChange={handlePageChange} />
                    }

                </CCardBody>
            </CCard>
            <CModal
                show={delComfirm}
                onClose={() => setDelConfirm(!delComfirm)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>삭제하시겠습니까?</p>
                    <CButton
                        variant="outline"
                        color="dark"
                        onClick={() => setDelConfirm(!delComfirm)}
                        className="mx-2"
                    >
                        취소
                    </CButton>
                    <CButton
                        color="dark"
                        onClick={() => {
                            setDelConfirm(!delComfirm)
                            deleteFaqs()
                        }}
                        className="mx-2" type="submit"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
            <CModal
                show={delDone}
                onClose={() => setDelDone(!delDone)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>삭제되었습니다.</p>

                    <CButton
                        color="dark"
                        onClick={() => setDelDone(!delDone)}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}

