import React, { useRef, useEffect, useState } from 'react'
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
    CSelect
} from '@coreui/react'
import { trackPromise } from 'react-promise-tracker'
import { PointPaymentService } from 'src/services/PointPaymentService'
import { DateUtils } from "../../../../utils/DateUtils";
import { PointType, convertPointType } from 'src/constants/point.type.constants';
import NumberFormat from 'react-number-format';

export default function Points() {
    const term = useRef();
    const [selectedItems, setSelectedItems] = useState([])
    const [data, setData] = useState({
        content: [],
        totalPages: 0,
        number: 0,
        size: 0,
    })

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: "id,DESC",
        type: '',
        optionSearch: '',
        term: '', // name, amount, startValidDate, endValidDate
    })

    const [isDisable, setIsDisable] = useState(true)
    const [deleteComfirm, setDelConfirm] = useState(false)
    const [deleteDone, setDelDone] = useState(false)
    const [checkAll, setCheckAll] = useState(false)
    const [checkTable, setCheckTable] = useState(new Array(params.size).fill(false))

    const onSelectAll = e => {
        if (e.target.checked === true) {
            setCheckAll(true);
            setCheckTable(data.content.map(() => true));
            selectedItems.splice(0, selectedItems.length)
            selectedItems.push(data.content.map(m => m.id))
            setIsDisable(false)
        } else {
            setCheckAll(false);
            setCheckTable(data.content.map(() => false));
            selectedItems.splice(0, selectedItems.length)
            setIsDisable(true)
        }
    }

    const clearCheck = () => {
        setCheckTable(new Array(params.size).fill(false));
        selectedItems.splice(0, selectedItems.length)
        setCheckAll(false)
        setIsDisable(true)
        selectedItems.splice(0, selectedItems.length)
    }

    const handleItemSelected = (event, index) => {

        if (event.target.checked === true) {
            selectedItems.push(event.target.value)
            setIsDisable(false)
        } else {
            const idx = selectedItems.indexOf(event.target.value)
            selectedItems.splice(idx, 1)
            if (selectedItems.length === 0) {
                setIsDisable(true)
            }
        }

        setCheckTable(
            checkTable.map((item, idx) => (idx === index) ? !item : item
            ));

        setSelectedItems([...selectedItems])
    }

    function handlePageChange(page) {
        if (page > -1) {
            setParams({ ...params, page })
        }
    }

    useEffect(() => {
        trackPromise(
            PointPaymentService.getPointPayments(params).then((resp) => {
                if (resp.status === 200) {
                    setData(resp.data)
                    clearCheck()
                }
            })
        )
    }, [params, deleteDone])

    const handleFilter = e => {
        const { name, value } = e.target;
        setParams({ ...params, [name]: value, term: term.current.value });
    }

    function handleDeletePointPayment() {
        setCheckAll(false)
        let ids = [...selectedItems]
        if (!ids || ids.length === 0) {
            return
        }
        PointPaymentService.deletePointPayment(ids).then((resp) => {
            if (resp.status === 204) {
                setDelConfirm(!deleteComfirm)
                setDelDone(!deleteDone)
                setCheckTable(new Array(params.size).fill(false))
                // remove(ids)
            }
        })
    }

    // function remove(ids) {
    //     let dataCopy = data.content;
    //     for (let i = 0; i < ids[0].length; i++) {
    //         let index = dataCopy.map(x => { return x.Id; })
    //             .indexOf(ids[i]);

    //         dataCopy.splice(index, 1);
    //     }
    // }

    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setParams({ ...params, term: term.current.value });
    };

    return (
        <>
            <h2 className="mb-4">포인트 리스트</h2>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={onSubmit}>
                        <CFormGroup row>
                            <CCol className="form-inline" md="6">
                                <CFormGroup className="mr-2">
                                    <CSelect custom name="type" onChange={handleFilter} defaultValue={PointType.ALL.value}>
                                        <option value={PointType.ALL.value}>{PointType.ALL.label}</option>
                                        <option value={PointType.CASH_POINT.value}>{PointType.CASH_POINT.label}</option>
                                        <option value={PointType.EVENT_POINT.value} >{PointType.EVENT_POINT.label}</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol md="6" className="form-inline">
                                <CFormGroup className="col-3 justify-content-end">
                                    <CSelect custom name="optionSearch" onChange={handleFilter} defaultValue="">
                                        <option value="">선택</option>
                                        <option value="pointName">포인트명</option>
                                        <option value="point">지급 포인트</option>
                                    </CSelect>
                                </CFormGroup>
                                <CInputGroup className="col-9">
                                    <CInput
                                        type="text"
                                        name="term"
                                        placeholder="검색어를 입력해주세요."
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
                                <th style={{ width: '5%' }}>
                                    <CFormGroup
                                        variant="custom-checkbox">
                                        <CInputCheckbox
                                            onChange={onSelectAll}
                                            id="checkAll"
                                            checked={checkAll}
                                            className="position-static"
                                        />
                                    </CFormGroup>
                                </th>
                                <th style={{ width: '10%' }}>번호</th>
                                <th style={{ width: '10%' }}>구분</th>
                                <th>포인트명</th>
                                <th style={{ width: '15%' }}>지급 포인트</th>
                                <th style={{ width: '15%' }}>유효기간</th>
                                <th style={{ width: '15%' }}>수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((item, index) => {
                                return (
                                    <DataRow
                                        index={index}
                                        number={(data.totalElements - (data.number * data.size)) - (data.number >= 0 ? index : 0)}
                                        source={item}
                                        key={index}
                                        itemSelected={handleItemSelected}
                                        checkTable={checkTable}
                                    />
                                )
                            })}
                        </tbody>
                    </table>

                    <CRow className="justify-content-between">
                        <CCol md="2">
                            <CButton
                                onClick={() => setDelConfirm(!deleteComfirm)}
                                className="mr-1"
                                block
                                color="dark"
                                disabled={isDisable}>
                                삭제
                            </CButton>
                        </CCol>
                        <CCol md="2">
                            <CButton
                                block
                                color="dark"
                                to="/member/point-list/point-register/PointRegister"
                            >
                                등록
                            </CButton>
                        </CCol>
                    </CRow>

                    <CPagination
                        align="center"
                        className="mt-4"
                        activePage={data.number + 1}
                        pages={data.totalPages}
                        onActivePageChange={(i) => handlePageChange(i - 1)}
                        limit={10}
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
                        onClick={handleDeletePointPayment}
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

function DataRow({ index, number, source, itemSelected, checkTable }) {
    return (
        <tr>
            <td>
                <CFormGroup
                    variant="checkbox"
                    className="checkbox"
                >
                    <CInputCheckbox
                        checked={checkTable[index]}
                        value={source.id}
                        className="position-static"
                        onChange={(e) => itemSelected(e, index)}
                    />
                </CFormGroup>
            </td>
            <td>{number}</td>
            <td>{convertPointType(source.type)}</td>
            <td>{source.name}</td>
            <td><NumberFormat value={source.amount} thousandSeparator={true} displayType={'text'} /> 포인트</td>
            <td>{DateUtils.toLocalDate(source.startValidDate)} ~ {DateUtils.toLocalDate(source.endValidDate)}</td>
            <td>
                <CButton
                    block
                    color="dark"
                    size="sm"
                    to={{ pathname: "/member/point-list/point-edit/PointEdit", data: source }}
                >
                    수정
                </CButton>
            </td>
        </tr>
    )
}
