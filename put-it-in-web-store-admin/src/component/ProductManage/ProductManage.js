/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { SwalCommon } from "../../constants/SwalCommon";
import Currency from "../common/Currency";
import { ImageItem } from "../common/ListImageSection";
import PaginationSection from '../common/PaginationSection';
import { ProductService } from "./../../services/product.service";

const styles = {
    imgCard: { width: "100px" }
}

const DefaultPageSize = 10;
const initialState = { term: " ", page: 0, size: DefaultPageSize, numberOfElements: 0, last: true, first: true, empty: false };
const initialSelect = new Array(DefaultPageSize).fill(false)

export default function ProductManage() {

    const history = useHistory();
    const [filter, setFilter] = useState(initialState);
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
        fetchData()
        setSelected(initialSelect)
        setSelectAllCheckBox(false)
    }, [filter.term, data.pageable.pageNumber, data.pageable.pageSize])

    // Handle

    function handelFilterSearchTerm() {
        var term = document.getElementById("searchTermInput").value;
        setFilter({ ...filter, term: term })
    }

    function handleCreate() {
        history.push("/product/create/")
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
                    data:deletedIds,
                }
                ProductService.deleteAll(request).then(
                    () => {
                        fetchData();
                        setSelected(initialSelect);
                    }
                ).catch((err) => {
                    console.log(err)
                });
            }
        });
    }

    function handleDownload() {
        ProductService.download(filter).then((response)=>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `File_${moment().format("YYYYMMDDHHMMSS")}.xlsx`); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
    }

    // Common Function

    function fetchData() {
        ProductService.search(filter, data.pageable).then((response) => {
            setlst(response.data.content);
            setData(response.data);
            var { empty, first, last, numberOfElements } = response.data;
            setFilter({ ...filter, empty, first, last, numberOfElements });
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">상품 관리</h4>
                <Card bg={'light'}>
                    <Card.Body>
                        <Row>
                            <Col lg={8} xs={4}>
                                <div className="float-left">
                                    <Button variant="btn btn-outline-org" onClick={handleDownload}>엑셀 다운로드</Button>
                                </div>
                            </Col>
                            <Col lg={4} xs={8}>
                                <Form>
                                    <InputGroup>
                                        <FormControl
                                            id="searchTermInput"
                                            placeholder="검색어를 입력하세요."
                                        />
                                        <InputGroup.Append >
                                            <Button variant="btn btn-org" onClick={handelFilterSearchTerm}>검색</Button>
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
                                        <th>브랜드명</th>
                                        <th>지점명</th>
                                        <th>상품 코드</th>
                                        <th>상품명</th>
                                        <th>상품 대표사진</th>
                                        <th>상품 가격</th>
                                        <th>재고 수량</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {(lstData && lstData.length > 0) &&

                                        lstData.map((data, idx) => {
                                            return <tr key={idx}>
                                                <td className="text-center"><Form.Check checked={selected[idx]} onChange={() => handleSelect(idx)} /></td>
                                                <td>{idx + 1}</td>
                                                <td>{data.brandName}</td>
                                                <td>{data.branchName}</td>
                                                <td>{data.code}</td>
                                                <td>{data.name}</td>
                                                <td ><ImageItem src={data.mainPhotoUrl} style={styles.imgCard}/></td>
                                                <td><Currency amount={data.price} /></td>
                                                <td>{data.quantity}</td>
                                                <td className="text-center"><Link to={`/product/detail/${data.id}`}><Button variant="secondary" size="sm">상세</Button></Link></td>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </Table>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="float-left">
                                <Button variant="danger" onClick={handleDeleteAll}>삭제</Button>
                            </div>
                            <div>
                                <PaginationSection
                                    size={data.size}
                                    number={data.number}
                                    totalElements={data.totalElements}
                                    handlePaging={handlePaging}/>
                            </div>
                            <div className="float-right">
                                <Button variant="org" onClick={handleCreate}>등록</Button>
                            </div>
                        </div>
                    </Form>
                </div>

            </div>
        </main >
    )
}