/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import { usages } from '../../constants/usage.constants';
import PaginationSection from '../common/PaginationSection';
import { ReservationService } from '../../services/reservation.service';
import DateTime from '../common/DateTime';
import StorageSize from "../common/StorageSize";
import Currency from "../common/Currency";
import moment from "moment";
import swal from 'sweetalert';
import {SwalCommon} from "../../constants/SwalCommon";

const FilterType = { FILTER: 'FILTER', SEARCH: 'SEARCH' };
const DefaultPageSize = 10;
const initialState = { term: " ", status: "", page: 0, size: DefaultPageSize, numberOfElements: 0, last: true, first: true, empty: false, filterType: FilterType.FILTER };
const initialSelect = new Array(DefaultPageSize).fill(false)

export default function ReservationManage() {

    const [filter, setFilter] = useState(initialState)
    const [lstData, setlstData] = useState([])
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
        fetchData()
        setSelected(initialSelect)
        setSelectAllCheckBox(false)
    }, [filter.status, filter.term, data.pageable.pageNumber, data.pageable.pageSize])

    // Handle
    function handelFilterSearchTerm() {
        var term = document.getElementById("searchTermInput").value;
        setFilter({ ...filter, term: term, status: initialState.status, filterType: FilterType.SEARCH })
    }

    function handleFilterSettleStatus(e) {
        var { value } = e.target
        setFilter({ ...filter, status: value, term: initialState.term, filterType: FilterType.FILTER })
        document.getElementById("searchTermInput").value = ""
    }

    // Function 

    function handelChangeSettlementStatus(e) {
        let { value, name } = e.target;
        ReservationService.updateStatus(name, value).then(() => {
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

    function fetchData() {
        (filter.filterType === FilterType.FILTER)
            ?
            ReservationService.list(filter, data.pageable).then((response) => {
                setlstData(response.data.content);
                setData(response.data)
                var { empty, first, last, numberOfElements } = response.data;
                setFilter({ ...filter, empty, first, last, numberOfElements });
            }).catch((err) => {
                console.log(err)
            })
            :
            ReservationService.search(filter, data.pageable).then((response) => {
                setlstData(response.data.content);
                setData(response.data)
                var { empty, first, last, numberOfElements } = response.data;
                setFilter({ ...filter, empty, first, last, numberOfElements });
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
                })
                let request = {
                    data:deletedIds
                }
                ReservationService.deleteAllMember(request).then(
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

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">예약 관리</h4>
                <Card bg={'light'}>
                    <Card.Body>
                        <Row>
                            <Col md={2} xs={4}>
                                <Form.Control as="select" size="sm" onChange={handleFilterSettleStatus} value={filter.status}>
                                    <option value="">전체</option>
                                    {
                                        Object.entries(usages).map((usage, idx1) =>
                                            <option value={usage[0]} key={idx1}>
                                                {usage[1]}
                                            </option>)
                                    }
                                </Form.Control>
                            </Col>
                            <Col />
                            <Col md={4} xs={6}>
                                <Form>
                                    <InputGroup size="sm">
                                        <FormControl
                                            placeholder="검색어를 입력하세요."
                                            id="searchTermInput"
                                        />
                                        <InputGroup.Append >
                                            <Button variant="secondary" onClick={handelFilterSearchTerm}>검색</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
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
                                        <th>예약번호</th>
                                        <th>주문정보</th>
                                        <th>상품정보</th>
                                        <th>이용기간</th>
                                        <th>수량</th>
                                        <th>결제금액</th>
                                        <th>이용상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (lstData && lstData.length > 0) && lstData.map((item, index) =>
                                            <tr key={index}>
                                                <td className="text-center"><Form.Check checked={selected[index]} onChange={() => handleSelect(index)} /></td>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>
                                                    <p><DateTime type="date" date={item.createdOn} /></p>
                                                    <p>{(item.userInfo) && item.userInfo.name}</p>
                                                    <p>{(item.userInfo) && item.userInfo.phone}</p>
                                                    <p>{(item.userInfo) && item.userInfo.email}</p>
                                                </td>
                                                <td>
                                                    <p>{(item.productInfo) && item.productInfo.branchName}</p>
                                                    <p>{(item.productInfo) && item.productInfo.name}</p>
                                                    <p>{(item.productInfo) && <StorageSize size={item.productInfo.size} />}</p>
                                                </td>
                                                <td>
                                                    <p><DateTime type="date" date={item.startDate} /></p>
                                                    <p><DateTime type="date" date={moment(item.startDate).add(item.usagePeriod, 'months')} /></p>
                                                    <p>{item.usagePeriod} months</p>
                                                </td>
                                                <td>{item.quantity}</td>
                                                <td><Currency amount={item.paidAmount} /></td>
                                                <td className="text-center">
                                                    <Form.Control as="select" size="sm" value={item.status} name={item.id} onChange={handelChangeSettlementStatus}>
                                                        {
                                                            Object.entries(usages).map((usage, idx1) =>
                                                                <option value={usage[0]} key={idx1}>
                                                                    {usage[1]}
                                                                </option>)
                                                        }
                                                    </Form.Control>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="float-left">
                                <Button variant="secondary" onClick={handleDeleteAll} size="sm">삭제</Button>
                            </div>
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