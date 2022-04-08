/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import swal from 'sweetalert';
import { MemberService } from "../../services/member.service";
import DateTime from '../common/DateTime';
import PaginationSection from '../common/PaginationSection';
import {SwalCommon} from "../../constants/SwalCommon";
import {ReservationService} from "../../services/reservation.service";

const DefaultPageSize = 10;
const initialState = { term: ' ', page: 0, size: DefaultPageSize, numberOfElements: 0, last: true, first: true, empty: false };
const initialSelect = new Array(DefaultPageSize).fill(false)

export default function MemberManage() {

    const [filter, setfilter] = useState(initialState)
    // const [lstMember, setLstMember] = useState([]);
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
        fetchManagerLst();
        setSelected(initialSelect);
        setSelectAllCheckBox(false)
    }, [filter.term ,data.pageable.pageNumber, data.pageable.pageSize]);

    function handleChange(e) {
        const { id, value } = e.target
        setfilter(() => ({ ...filter, [id]: value }));
    }

    function handleSearch() {
        setSelectAllCheckBox(false)
        fetchManagerLst()
    }

    function getListUser()
    {
        MemberService.lstMember(data.pageable).then(
            (response) =>  {
                setData(response.data)
            }
        )
    }

    function fetchManagerLst() {
        MemberService.searchMember(filter, data.pageable).then(
            result => {
                //setLstMember(result.data.content);
                setData(result.data)
                var { empty, first, last, numberOfElements } = result.data;
                setfilter({ ...filter, empty, first, last, numberOfElements });
                setSelected(initialSelect);
            }
        ).catch((err) => {
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
            setSelected(data.content.map(() => true));
        }
        else {
            setSelected(data.content.map(() => false));
        }
    }

    function handleDeleteAll() {
        swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
            if (willDelete) {
                let deletedIds = [];
                selected.forEach((select, index) => {
                    if (select === true) deletedIds.push(data.content[index].id);
                })
                let requestBody = {
                    data:deletedIds,
                }
                MemberService.deleteAllMember(requestBody).then(
                    (response) => {
                        fetchManagerLst()
                        setSelected(initialSelect)
                    }
                ).catch((err) => {
                    console.log(err)
                });
            }
        });
    }

    return (
        <>
            <main>
                <div className="container-fluid">
                    <h4 className="mt-5 mb-3">회원 관리</h4>
                    <Card bg={'light'}>
                        <Card.Body>
                            <Row>
                                <Col />
                                <Col lg={4} xs={8}>
                                    <Form>
                                        <InputGroup size="sm">
                                            <FormControl
                                                placeholder="검색어를 입력하세요."
                                                id="term"
                                                onChange={handleChange}
                                            />
                                            <InputGroup.Append >
                                                <Button variant="secondary" onClick={handleSearch}>검색</Button>
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
                                            <th>가입일</th>
                                            <th>회원명</th>
                                            <th>주민등록번호</th>
                                            <th>이메일</th>
                                            <th>연락처</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(data.content && data.content.length > 0) &&
                                            data.content.map((item, index) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="text-center"><Form.Check onChange={() => handleSelect(index)} checked={selected[index]} /></td>
                                                        <td>{item.id}</td>
                                                        <td><DateTime type="date" date={item.createdOn} /></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.ssn}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phone}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                {(data.content && data.content.length === 0) &&
                                    <div className="middleText">
                                        <p variant="muted" className="textcenter">No data found</p>
                                    </div>
                                }
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
            </main>
        </>
    )
}