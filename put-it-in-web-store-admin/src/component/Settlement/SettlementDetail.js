/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';
import { SwalCommon } from "../../constants/SwalCommon";
import { usages } from "../../constants/usage.constants";
import PaginationSection from '../common/PaginationSection';
import { settlements } from "./../../constants/settlement.constant";
import { SettlementService } from "./../../services/settlement.service";
import DateTime from "../common/DateTime";

const style = {
    formControlInLine: { display: "flex", alignItems: "center" },
    radioFilter: { minWidth: "80px" }
}

const FilterType = { FILTER: 'FILTER', SEARCH: 'SEARCH' };
const DefaultPageSize = 10;
const initialState = { term: " ", dateOrder: moment.now(), isTwoWeek: false, status: "", page: 0, size: DefaultPageSize, numberOfElements: 0, last: true, first: true, empty: false, filterType: FilterType.FILTER };
const initialSelect = new Array(DefaultPageSize).fill(false)

export default function SettlementDetail() {

    const [filter, setFilter] = useState(initialState);
    const [radioDisable, setRadioDisable] = useState(false);
    const [lstData, setlst] = useState([]);
    const [selected, setSelected] = useState(initialSelect);
    const [selectAllCheckBox, setSelectAllCheckBox] = useState(false);

    const [data, setData] = useState({
        content: [],
        pageable: {
            pageNumber: 0,
            pageSize: 10,
        },
        totalElements: 0,
        number: 0,
        size: 0,
    })

    function handlePaging(number) {
        setData({...data, pageable: {...data.pageable, pageNumber: --number}})
    }

    useEffect(() => {
        if (filter.status !== "") setRadioDisable(true)
        else setRadioDisable(false)
    }, [filter.status])

    useEffect(() => {
        fetchData()
        setSelected(initialSelect)
        setSelectAllCheckBox(false)
    }, [filter.isTwoWeek, filter.status, filter.dateOrder, filter.term, data.pageable.pageNumber, data.pageable.pageSize])

    // Handle

    function handleChangeOrderDate(date) {
        setFilter({ ...filter, dateOrder: date, status: initialState.status, isTwoWeek: initialState.isTwoWeek, filterType: FilterType.SEARCH })
    }

    function handelFilterSearchTerm() {
        var term = document.getElementById("searchTermInput").value;
        setFilter({ ...filter, term: term, status: initialState.status, isTwoWeek: initialState.isTwoWeek, filterType: FilterType.SEARCH })
    }

    function handleFilterSettleStatus(e) {
        var { value } = e.target
        let isTwoWeek = filter.isTwoWeek
        if (value !== "") {
            isTwoWeek = false
        }
        setFilter({ ...filter, status: value, isTwoWeek: isTwoWeek, dateOrder: initialState.dateOrder, term: initialState.term, filterType: FilterType.FILTER })
        document.getElementById("searchTermInput").value = '';
    }

    function handelFilterSettleTimes() {
        setFilter({ ...filter, isTwoWeek: !filter.isTwoWeek, dateOrder: initialState.dateOrder, term: initialState.term, filterType: FilterType.FILTER })
    }

    function handelChangeSettlementStatus(e) {
        let { value, name } = e.target;
        SettlementService.updateStatus(name, value).then((response) => {
            swal({
                text: "Save is complete",
                icon: "success",
                button: "OK",
            });
            fetchData();
        }).catch((err) => {
            console.log(err)
        })
    }

    function handleSelect(index) {
        setSelected(selected.map((item, idx) => { return (idx === index) ? !item : item }));
    }

    function handleSelectAll(e) {
        const checked = e.target.checked;
        setSelectAllCheckBox(checked)
        if (checked) {
            setSelected(lstData.map(() => true));
        }
        else {
            setSelected(lstData.map(() => false));
        }
    }

    function handleDeleteAll() {
        swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
            if (willDelete) {
                let deletedIds = [];
                selected.forEach((select, index) => {
                    if (select === true) deletedIds.push(lstData[index].id);
                });
                let request = {
                    data: deletedIds
                }
                SettlementService.deleteAll(request).then(
                    () => {
                        fetchData()
                        setSelected(initialSelect)
                    }
                ).catch((err) => {
                    console.log(err)
                });
            }
        });
    }

    // Common Function

    function fetchData() {
        (filter.filterType === FilterType.FILTER)
            ?
            SettlementService.listSettlement(filter, data.pageable).then((response) => {
                setlst(response.data.content);
                setData(response.data)
                let { empty, first, last, numberOfElements } = response.data;
                setFilter({ ...filter, empty, first, last, numberOfElements });
            }).catch((err) => {
                console.log(err)
            })
            :
            SettlementService.searchSettlement(filter, data.pageable).then((response) => {
                setlst(response.data.content);
                setData(response.data)
                let { empty, first, last, numberOfElements } = response.data;
                setFilter({ ...filter, empty, first, last, numberOfElements });
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">정산내역</h4>
                <Card bg={'light'}>
                    <Card.Body>
                        <Row>
                            <Col md={3} xs={4} style={style.formControlInLine}>
                                <Form.Control as="select" size="sm" onChange={handleFilterSettleStatus} value={filter.status}>
                                    <option value={''}>All</option>
                                    {Object.entries(settlements).map((item) => <option key={item[0]} value={item[0]}>{item[1]}</option>)}
                                </Form.Control>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Form.Check inline label="All" type="radio" name="filterSettle" id={`inline-radio-1`} disabled={radioDisable} onChange={handelFilterSettleTimes} checked={!filter.isTwoWeek} />
                                <Form.Check inline label="2 Weeks" type="radio" name="filterSettle" id={`inline-radio-2`} style={style.radioFilter} onChange={handelFilterSettleTimes} disabled={radioDisable} checked={filter.isTwoWeek} />
                            </Col>
                            <Col />
                            <Col md={4} xs={6} style={style.formControlInLine}>
                                <DatePicker selected={filter.dateOrder} dateFormat="yyyy.MM.dd'" onChange={date => handleChangeOrderDate(date)} />
                                &nbsp;
                                <InputGroup size="sm">
                                    <FormControl
                                        id="searchTermInput"
                                        placeholder="검색어를 입력하세요."
                                    />
                                    <InputGroup.Append >
                                        <Button variant="secondary" onClick={handelFilterSearchTerm}>검색</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <br />

                <div>
                    <Form>
                        <div className="table-responsive">
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th className="text-center"><Form.Check checked={selectAllCheckBox} onChange={handleSelectAll} /></th>
                                        <th>번호</th>
                                        <th>예약일</th>
                                        <th>예약코드</th>
                                        <th>입점사 코드</th>
                                        <th>지점명</th>
                                        <th>결제금액</th>
                                        <th>수수료</th>
                                        <th>정산금액</th>
                                        <th>정산대금
                                            입금계좌</th>
                                        <th>이용상태</th>
                                        <th>정산상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(lstData && lstData.length > 0) &&

                                        lstData.map((data, idx) => {
                                            return <tr key={idx}>
                                                <td className="text-center"><Form.Check checked={selected[idx]} onChange={() => handleSelect(idx)} /></td>
                                                <td>{idx + 1}</td>
                                                <td><DateTime type="date" date = {data.reservationDate}/></td>
                                                <td>{data.reservationCode}</td>
                                                <td>{data.storeCompanyCode}</td>
                                                <td>{data.branchName}</td>
                                                <td>{data.paymentAmount}</td>
                                                <td>{data.feeAmount}</td>
                                                <td>{data.settlementAmount}</td>
                                                <td>{data.creditAccount}</td>
                                                <td>{usages[data.usageStatus]}</td>
                                                <td className="text-center">
                                                    <Form.Control as="select" size="sm" name={data.id} onChange={handelChangeSettlementStatus} value={data.settlementStatus}>
                                                        {Object.entries(settlements).map((settlement, idx1) =>
                                                            <option value={settlement[0]} key={idx1} >
                                                                {settlement[1]}
                                                            </option>)}
                                                    </Form.Control>
                                                </td>
                                            </tr>
                                        })

                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button variant="secondary" size="sm"
                                    onClick={() => handleDeleteAll()}>삭제</Button>
                            <PaginationSection
                                size={data.size}
                                number={data.number}
                                totalElements={data.totalElements}
                                handlePaging={handlePaging}/>
                            <div/>
                        </div>
                    </Form>
                </div>

            </div>
        </main >
    )
}