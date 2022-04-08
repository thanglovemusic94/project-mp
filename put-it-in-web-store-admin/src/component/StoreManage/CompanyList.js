import { Button, Card, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import PaginationSection from '../common/PaginationSection';
import React, { useEffect, useState } from "react";
import CompanyService from "../../services/CompanyService";
import swal from "sweetalert";
import {SwalCommon} from "../../constants/SwalCommon";

const initialSelect = new Array(10).fill(false)
export default function CompanyList() {

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

    const [term, setTerm] = useState(null)

    const history = useHistory()

    function handlePaging(number) {
        setData({ ...data, pageable: { ...data.pageable, pageNumber: --number } })
    }

    function handleSearch(event) {
        event.preventDefault()

        handlePaging(0)
    }

    useEffect(() => {
      getData()
    }, [data.pageable.pageNumber, data.pageable.pageSize])

    function getData()
    {
        CompanyService.listCompany(term, data.pageable).then(response => {
            setData(response.data)
        })
    }

    function deleteList() {
        swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
            if (willDelete) {

                let deletedIds = [];

                selected.forEach((select, index) => {
                    if (select === true) deletedIds.push(data.content[index].id);
                })
                let requestBody = {
                    data:deletedIds,
                }
                CompanyService.deleteListCompany(requestBody).then(
                    (response) => {
                        getData()
                        setSelected(initialSelect)
                    }
                ).catch((err) => {
                    console.log(err)
                });
            }
        });
    }

    const [selected, setSelected] = useState(initialSelect);
    const [selectAllCheckBox, setSelectAllCheckBox] = useState(false);

    function handleSelected(index) {
        setSelected(selected.map((item, idx) => {
            return (idx === index) ? !item : item
        }));
    }

    function handleSelectAll(e) {
        const checked = e.target.checked;
        setSelectAllCheckBox(checked)
        if (checked) {
            setSelected(data.content.map(() => true));
        } else {
            setSelected(data.content.map(() => false));
        }
    }

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">입점사 관리</h4>
                <Card bg="light" style={{ marginBottom: "0.5rem" }}>

                    <Card.Body>
                        <Row>
                            <Col lg={8} xs={4}>
                                {/*<div className="float-left">*/}
                                {/*    <Button variant="outline-org">엑셀 다운로드</Button>*/}
                                {/*</div>*/}
                            </Col>
                            <Col lg={4} xs={8}>
                                <Form onSubmit={handleSearch}>
                                    <InputGroup>
                                        <FormControl id="term" value={term} onChange={(event) => setTerm(event.target.value)} placeholder="검색어를 입력하세요." />
                                        <InputGroup.Append>
                                            <Button type="submit" variant="org">검색</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <div>
                    <Form>
                        <div className="table-responsive">
                            <Table bordered size="sm">
                                <thead>
                                <tr>
                                    <th className="text-center">
                                        <Form.Check checked={selectAllCheckBox} onChange={handleSelectAll}/>
                                    </th>
                                    <th>번호</th>
                                    <th>입점사 코드</th>
                                    <th>브랜드명</th>
                                    <th>사업자등록상호명</th>
                                    <th>사업자등록번호</th>
                                    <th>대표자 이름</th>
                                    <th>관리</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.content &&
                                data.content.map((company, idx) => {
                                    return (
                                        <tr>
                                            <td className="text-center">
                                                <Form.Check onChange={() => handleSelected(idx)}
                                                            checked={selected[idx]}/></td>
                                            <td>{idx + 1}</td>
                                            <td>{company.code}</td>
                                            <td>{company.brandName}</td>
                                            <td>{company.registrationName}</td>
                                            <td>{company.registrationNumber}</td>
                                            <td>{company.representativeName}</td>
                                            <td className="text-center"><Link to={`/companies/${company.id}`}><Button
                                                variant="secondary">상세</Button></Link></td>
                                        </tr>
                                    )
                                })
                                }
                                </tbody>
                            </Table>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button variant="danger" onClick={deleteList}>삭제</Button>
                            <PaginationSection
                                size={data.size}
                                number={data.number}
                                totalElements={data.totalElements}
                                handlePaging={handlePaging} />
                            <Button variant="org" onClick={() => history.push("/companies/create")}>등록</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </main>
    )
}
