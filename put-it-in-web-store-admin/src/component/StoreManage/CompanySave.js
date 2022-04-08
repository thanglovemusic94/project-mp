import {Container, Button, Form, Table} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import swal from 'sweetalert'
import CompanyService from "../../services/CompanyService";
import produce from "immer";

export default function CompanySave(props) {

    const [company, setCompany] = useState({
        id: null,
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
    const [isCreateAction, setScreenAction] = useState(true);

    useEffect(() => {
        const {id} = props.match.params
        if (id) {
            setScreenAction(false)
            CompanyService.getCompany(id).then(response => {
                setCompany(response.data)
            })
        }

    }, [props.match.params.id])

    function handleCancelEdit() {
        history.goBack();
    }

    function handleSave() {
        CompanyService.saveCompany(company).then(response => {
            if (response.status === 201 || response.status === 204) {
                swal({
                    text: "저장이 완료되었습니다.",
                    icon: "success",
                    button: "확인",
                }).then(() => {
                    history.push(`/companies/${response.data != null ? response.data.id : company.id}`)
                });
            }
        })
    }

    function onChange(event) {
        const {id, value} = event.target
        const nestedIds = id.split(".")

        setCompany(produce(draft => {
            setValueByPath(draft, nestedIds, value)
        }))
    }

    const setValueByPath = (obj, path, value) => {
        if (path.length === 1) {
            obj[path] = value
            return
        }

        return setValueByPath(obj[path[0]], path.slice(1), value)
    }

    return (
        <Container fluid>
            <h4 className="mt-5 mb-3">{(isCreateAction) ? "입점사 등록" : "입점사 정보 수정"}</h4>
            <Form noValidate>
                <Table className="table-form">
                    <tbody>
                    <Form.Group as="tr" controlId="code">
                        <Form.Label as="td">입점사 코드</Form.Label>
                        <td>
                            <Form.Control readOnly type="text" value={company.code}/>
                        </td>
                    </Form.Group>
                    <Form.Group as="tr" controlId="brandName">
                        <Form.Label as="td">브랜드명</Form.Label>
                        <td>
                            <Form.Control onChange={onChange} readOnly={!isCreateAction} value={company.brandName}/>
                        </td>
                    </Form.Group>
                    <Form.Group as="tr" controlId="registrationName">
                        <Form.Label as="td">사업자등록상호명</Form.Label>
                        <td>
                            <Form.Control onChange={onChange} value={company.registrationName}/>
                        </td>
                    </Form.Group>
                    <Form.Group as="tr" controlId="registrationNumber">
                        <Form.Label as="td">사업자등록번호</Form.Label>
                        <td>
                            <Form.Group controlId="address">
                                <Form.Control onChange={onChange} value={company.address}/>
                            </Form.Group>
                        </td>
                    </Form.Group>
                    <Form.Group as="tr" controlId="representative.name">
                        <Form.Label as="td">사업장 주소지</Form.Label>
                        <td>
                            <Form.Control onChange={onChange} value={company.representative.name}/>
                        </td>
                    </Form.Group>
                    <Form.Group as="tr" controlId="representative.phone">
                        <Form.Label as="td">대표자 연락처</Form.Label>
                        <td>
                            <Form.Control onChange={onChange} value={company.representative.phone}/>
                        </td>
                    </Form.Group>
                    <Form.Group as="tr" controlId="representative.email">
                        <Form.Label as="td">대표자 이메일</Form.Label>
                        <td>
                            <Form.Control onChange={onChange} value={company.representative.email}/>
                        </td>
                    </Form.Group>
                    <Form.Group as="tr" controlId="settlementCreditAccount">
                        <Form.Label as="td">정산대금 입금계좌</Form.Label>
                        <td>
                            <Form.Control onChange={onChange} value={company.settlementCreditAccount}/>
                        </td>
                    </Form.Group>
                    </tbody>
                </Table>

                <div className="d-flex justify-content-end">
                    <Button variant="outline-secondary" onClick={handleCancelEdit}>취소</Button>
                    <Button className="ml-1" variant="org" onClick={handleSave}>저장</Button>
                </div>
            </Form>
        </Container>
    )
}