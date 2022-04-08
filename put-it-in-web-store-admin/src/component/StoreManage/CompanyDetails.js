import {Container, Button, Table} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import React, {useEffect, useState} from "react";
import CompanyService from "../../services/CompanyService";

export default function CompanyDetails(props) {

    const [company, setCompany] = useState({
        id: props.match.params.id,
        code: "",
        brandName: "",
        registrationName: "",
        registrationNumber: "",
        address: "",
        representative: {
            name: "",
            phone: "",
            email: "",
        },
        settlementCreditAccount: "",
    })

    const history = useHistory();

    function handleDelete() {
        swal({
            // title: "Are you sure?",
            text: "해당 항목을 삭제하시겠습니까?\n삭제 시 데이터 복구는 불가능합니다.",
            icon: "warning",
            buttons: ["취소", "삭제"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    CompanyService.deleteCompany(company.id).then(response => {
                        if (response.status === 204)
                            history.push("/companies")
                    })
                }
            });
    }

    function handleEdit() {
        history.push(`/companies/${company.id}/edit`)
    }

    useEffect(() => {
        CompanyService.getCompany(company.id).then(response => {
            setCompany(response.data)
        })
    }, [])

    return (
        <Container fluid>
            <h1 className="mt-5 mb-3">입점사 정보</h1>
            <Table className="table-form">
                <colgroup>
                    <col width="20%"/>
                </colgroup>
                <tbody>
                <tr>
                    <td>입점사 코드</td>
                    <td>{company.code}</td>
                </tr>
                <tr>
                    <td>브랜드명</td>
                    <td>{company.brandName}</td>
                </tr>
                <tr>
                    <td>사업자등록상호명</td>
                    <td>{company.registrationName}</td>
                </tr>
                <tr>
                    <td>사업자등록번호</td>
                    <td>{company.registrationNumber}</td>
                </tr>
                <tr>
                    <td>사업장 주소지</td>
                    <td>{company.address}</td>
                </tr>
                <tr>
                    <td>대표자 이름</td>
                    <td>{company.representative.name}</td>
                </tr>
                <tr>
                    <td>대표자 연락처</td>
                    <td>{company.representative.phone}</td>
                </tr>
                <tr>
                    <td>대표자 이메일</td>
                    <td>{company.representative.email}</td>
                </tr>
                <tr>
                    <td>정산대금 입금계좌</td>
                    <td>{company.settlementCreditAccount}</td>
                </tr>
                </tbody>
            </Table>

            <div className="d-flex justify-content-between">
                <Link to="/companies"><Button variant="secondary">목록으로</Button></Link>
                <div className="justify-content-end">
                    <Button variant="danger" onClick={handleDelete}>삭제</Button>
                    <Button style={{marginLeft: "0.5rem"}} variant="org" onClick={handleEdit}>수정</Button>
                </div>
            </div>
        </Container>
    )
}