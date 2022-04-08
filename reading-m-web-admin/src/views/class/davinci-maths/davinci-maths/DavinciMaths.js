import React, { useEffect, useState, useRef } from 'react'
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
    CInputCheckbox,
    CPagination,
    CRow,
    CModal,
    CModalBody,
    CLabel,
} from '@coreui/react'

import { trackPromise } from 'react-promise-tracker'
import { ClassService } from 'src/services/ClassService'
import NumberFormat from "react-number-format";

export default function DavinciMaths() {
    const [deleteComfirm, setDelConfirm] = useState(false)
    const [deleteDone, setDelDone] = useState(false)
    const term = useRef(null)
    const feeDiscount = 0.9;
    const [query, setQuery] = useState({
        term: '',
    })

    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [pageable, setPageable] = useState({
        page: 0,
        size: 10,
        sort: 'id,desc',
    })

    const [isDisable, setIsDisable] = useState(true)
    const [check, setCheck] = useState(false);
    const initialSelect = new Array(pageable.size).fill(false)
    const [checkTable, setCheckTable] = useState(initialSelect);

    function handleChangeTerm() {
        setQuery({ ...query, term: term.current.value })
    }

    const _onChangeHeaderCheckbox = (e) => {
        if (e.target.checked === true) {
            setCheck(true);
            setCheckTable(data.content.map((c) => {
                if (!c.haveStudent) return true
            }));
            setIsDisable(false);
        } else {
            setCheck(false);
            setCheckTable(data.content.map(() => false));
            setIsDisable(true);
        }
    };

    const _onChangeRowCheckbox = (event, index) => {
        let sizeTrue = 0
        setCheckTable(checkTable.map((item, idx) => {
            if (item === true && !data.content[idx].haveStudent) sizeTrue++
            return (idx === index) ? !item : item
        }));

        if (event.target.checked === false && sizeTrue <= 1) {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    };

    useEffect(() => {
        trackPromise(
            ClassService.getVodClassBy(query, pageable).then((resp) => {
                setData(resp.data)
            })
        )
    }, [query, pageable])

    function deleteDavinciClass() {
        setDelConfirm(!deleteComfirm)

        const ids = [];
        checkTable.map((item, idx) => {
            if (item === true) {
                ids.push(data.content[idx].id)
            }
        });
        ClassService.deleteDavinciClass(ids).then(() => {
            setDelDone(!deleteDone)
            setPageable({ ...pageable })
            setCheckTable(initialSelect)
            setIsDisable(true)
            setCheck(false)
            console.log("del success")
        }).catch(e => console.log(e))
    }

    function handlePageChange(page) {
        if (page > 0) {
            setPageable({ ...pageable, page: page - 1 })
        }
    }

    return (
        <>
            <h2 className="mb-4">과학수학 다빈치 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm action="" method="post" className="form-horizontal">
                        <CFormGroup row className="justify-content-end">
                            <CCol md="6">
                                <CInputGroup>
                                    <CInput
                                        type="email"
                                        id="input2-group2"
                                        name="input2-group2"
                                        placeholder="검색어를 입력해주세요."
                                        innerRef={term}
                                    />
                                    <CInputGroupAppend>
                                        <CButton
                                            type="button"
                                            color="dark"
                                            onClick={handleChangeTerm}
                                        >
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

                                    {
                                        data.content.filter(value => value.haveStudent === false).length > 0 &&
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
                                <th>강의명</th>
                                <th style={{ width: '15%' }}>대상학생</th>
                                <th style={{ width: '15%' }}>전체 강의비</th>
                                <th style={{ width: '15%' }}>수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((clazz, index) => (
                                <tr key={index}>
                                    <td>
                                        <CFormGroup variant="custom-checkbox">
                                            <CInputCheckbox
                                                onChange={(event) => _onChangeRowCheckbox(event, index)}
                                                id={"check" + index}
                                                value={clazz.id}
                                                checked={checkTable[index]}
                                                disabled={clazz.haveStudent}
                                                custom
                                            />
                                            <CLabel variant="custom-checkbox" htmlFor={"check" + index}>
                                            </CLabel>
                                        </CFormGroup>
                                    </td>
                                    <td> {
                                        (data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)
                                    }</td>
                                    <td>{clazz.name}</td>
                                    <td>{clazz.grade}</td>
                                    <td>
                                        <NumberFormat value={Math.floor(clazz.tuitionFee*feeDiscount)} thousandSeparator={true} displayType={'text'}/> 원
                                    </td>
                                    <td>
                                        <CButton
                                            block
                                            color="dark"
                                            size="sm"
                                            to={{
                                                pathname: `/class/davinci-maths/davinci-math-edit/${clazz.id}`,
                                                data: clazz.clazz,
                                            }}
                                        >
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
                                onClick={() => setDelConfirm(!deleteComfirm)}
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
                                to="/class/davinci-maths/davinci-math-register/DavinciMathRegister"
                            >
                                등록
                            </CButton>
                        </CCol>
                    </CRow>

                    <CPagination
                        activePage={data.number + 1}
                        pages={data.totalPages}
                        onActivePageChange={handlePageChange}
                        align="center"
                        className="mt-4"
                    />
                </CCardBody>
            </CCard>
            <CModal
                show={deleteComfirm}
                onClose={() => setDelConfirm(!deleteComfirm)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>삭제하시겠습니까?</p>
                    <CButton
                        variant="outline"
                        color="dark"
                        onClick={() => setDelConfirm(!deleteComfirm)}
                        className="mx-2"
                    >
                        취소
                    </CButton>
                    <CButton
                        color="dark"
                        onClick={deleteDavinciClass}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
            <CModal
                show={deleteDone}
                onClose={() => setDelDone(!deleteDone)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>삭제되었습니다.</p>

                    <CButton
                        color="dark"
                        onClick={() => setDelDone(!deleteDone)}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
        </>
    )
}
