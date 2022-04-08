import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { ImageItem, ListImage } from "../common/ListImageSection";
import React, { useEffect, useState } from "react";
import BranchService from "../../services/BranchService";
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

var imgStyle = {
    width: '100px',
    maxHeight: '100px'
}

export default function BranchDetails(props) {

    const [branch, setBranch] = useState({
        id: props.match.params.id,
        code: "",
        name: "",
        mainPhoto: "",
        subPhotos: [],
        addressSimple: "",
        addressDetail: "",
        phone: "",
        announcement: "",
        businessInformation: "",
        refundPolicy: "",
        keywords: [],
        company: {
            id: "",
            code: "",
            brandName: "",
            registrationName: "",
            registrationNumber: "",
        },
    })

    const history = useHistory();

    function handleDelete() {
        swal({
            // title: "Are you sure?",
            text: "해당 항목을 삭제하시겠습니까?\n" +
                "삭제 시 데이터 복구는 불가능합니다.",
            icon: "warning",
            buttons: ["취소", "삭제"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    BranchService.deleteBranch(branch.id).then(response => {
                        if (response.status === 204)
                            history.push("/branches")
                    })
                }
            });
    }

    function handleEdit() {
        history.push(`/branches/${branch.id}/edit`)
    }

    useEffect(() => {
        BranchService.getBranch(branch.id).then(response => {
            setBranch(response.data)
        })
    }, [])

    return (
        <Container fluid>
            <h4 className="mt-5 mb-3">지점 정보</h4>
            <Table className="table-form">
                <tbody>
                    <tr>
                        <td>브랜드명</td>
                        <td>{branch.company.brandName}</td>
                    </tr>
                    <tr>
                        <td>지점 코드</td>
                        <td>{branch.company.code}{branch.code}</td>
                    </tr>
                    <tr>
                        <td>지점명</td>
                        <td>{branch.name}</td>
                    </tr>
                    <tr>
                        <td>지점 대표 사진</td>
                        <td><ImageItem style={imgStyle} src={branch.subPhotos[0]} /></td>
                    </tr>
                    <tr>
                        <td>지점 추가 사진</td>
                        <td><ListImage data={branch.subPhotos.slice(1, branch.subPhotos.length)} style={imgStyle} /></td>
                    </tr>
                    <tr>
                        <td>간단 주소</td>
                        <td>{branch.addressSimple}</td>
                    </tr>
                    <tr>
                        <td>상세 주소</td>
                        <td>{branch.addressDetail}</td>
                    </tr>
                    <tr>
                        <td>지점 전화번호</td>
                        <td>{branch.phone}</td>
                    </tr>
                    <tr>
                        <td>지점 상세정보</td>
                        <td>
                            <Row>
                                <Col xl={1}>공지사항</Col>
                                <Col>{branch.announcement}</Col>
                            </Row>
                            <Row>
                                <Col xl={1}>영업정보</Col>
                                <Col style={{ whiteSpace: "pre-line" }}>{branch.businessInformation}</Col>
                            </Row>
                            <Row>
                                <Col xl={1}>사업자 정보</Col>
                                <Col style={{ whiteSpace: "pre-line" }}>
                                    사업자등록상호명: {branch.company.registrationName}<br />
                                사업자등록번호: {branch.company.registrationNumber}
                                </Col>
                            </Row>
                        </td>
                    </tr>
                    <tr>
                        <td>지점 환불정책</td>
                        <td>{branch.refundPolicy}</td>
                    </tr>
                    <tr>
                        <td>검색 키워드</td>
                        <td>{branch.keywords.map(kw => <span className="badge badge-light" style={{ marginRight: "0.5rem" }}>{`${kw}`}</span>)}</td>
                    </tr>
                </tbody>
            </Table>

            <div className="d-flex justify-content-between">
                <Link to="/branches"><Button variant="secondary">목록으로</Button></Link>
                <div className="justify-content-end">
                    <Button variant="danger" onClick={handleDelete}>삭제</Button>
                    &nbsp;
                    <Button variant="org" onClick={handleEdit}>수정</Button>
                </div>
            </div>
        </Container>
    )
}