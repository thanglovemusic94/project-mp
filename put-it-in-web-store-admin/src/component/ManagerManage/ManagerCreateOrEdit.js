import React, {useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Row, Table} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import {SwalCommon} from "../../constants/SwalCommon";
import ManagerService from "../../services/ManagerService";
import CompanyService from "../../services/CompanyService";

const style = {
    title: {verticalAlign: "middle"},
    formGroup: {marginBottom: "0px"},
    formGroupInline: {marginBottom: "0px", display: "flex", alignItems: "center"},
    formControl: {width: "500px"},
    sizeInput: {width: "55px"},
    minWidth: {width: "100px"},
}

export default function ManagerCreateOrEdit(props) {

    const history = useHistory();
    const [isCreateAction, setScreenAction] = useState(true);

    useEffect(() => {
        const {id} = props.match.params
        if (id) {
            setScreenAction(false)
            fillData()
        }
    }, [props.match.params])

    function handleCancelEdit() {
        history.goBack();
    }

    function handleSave() {
        swal({
            text: "Save is complete",
            icon: "success",
            button: "OK",
        }).then(() => {
            history.push("/manager/management")
        });
    }

    // const[search, setSearch]=useState("")
    // function handleSearchCompany() {
    //     setSearch(brandName.value)
    // }

    // let brandName = document.getElementById("brandName")
    function fillData() {
        let managerName = document.getElementById("managerName")
        let position = document.getElementById("position")
        let email = document.getElementById("email")
        let contact = document.getElementById("contact")
        let manager = props.location.state.manager
        managerName.value = manager.managerName
        position.value = manager.position
        email.value = manager.email
        contact.value = manager.phone
    }

    const [showDD, setShowDD] = useState(false)
    const [term, setTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [data, setData] = useState({
        managerId: props.match.params.id,
        companyId: "",
        brandName: "",
        managerName: "",
        position: "",
        email: "",
        phone: "",
    })
    const [company, setCompany] = useState({
        companyId: "1",
        storeCompanyCode: "",
        storeCompanyName: "",
        nextBranchCode: "",
        companyRegName: "",
        companyRegNumber: "",
    })

    function handleSearchCompany(event) {
        event.preventDefault()

        CompanyService.searchBrand(term).then(response => {
            if (response.status === 200 && response.data.content.length > 0) {
                setShowDD(true)
                setSearchResult(response.data.content)
            }
        })
    }

    function handleSelectCompany(company) {
        setCompany(company)
        setData({...data, companyId: company.companyId})
        setSearchResult([])
    }

    function saveManager() {
        data.managerName = document.getElementById("managerName").value
        data.position = document.getElementById("position").value
        data.email = document.getElementById("email").value
        data.phone = document.getElementById("contact").value
        data.companyId = company.companyId
        if (isCreateAction) {
            swal(SwalCommon.ALERT_SAVE_COMPLETE).then((willSave) => {
                if (willSave) {
                    ManagerService.saveManager(data).then((response) => {
                        if (response.status === 201) {
                            history.push("/managers")
                        } else {
                            alert("Create Fail!")
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            });
        } else {
            data.managerId = props.match.params.id
            swal(SwalCommon.ALERT_SAVE_COMPLETE).then((willSave) => {
                if (willSave) {
                    ManagerService.saveManager(data).then((response) => {
                        if (response.status === 204) {
                            history.push("/managers")
                        } else {
                            alert("Edit Fail!")
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            });
        }
    }

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">{(isCreateAction) ? "입점사 등록" : "입점사 정보 수정"}</h4>
                <div>
                    {/*<Form noValidate>*/}
                        <div className="table-responsive">
                            <Table bordered>
                                <thead>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>브랜드명</td>
                                    <td className={"text-left"}>
                                        <Form onSubmit={handleSearchCompany}>
                                            <Form.Group controlId="term" className="dropdown">
                                                <Form.Control
                                                    plaintext={!isCreateAction}
                                                    onChange={(e) => {setTerm(e.target.value)}} list="searchRes" className="col-3 d-inline" value={term} />
                                                <div hidden={!showDD} id="myDropDown" className="dropdown-content col-3">
                                                    {searchResult.map(res => <a onClick={() => handleSelectCompany(res)}>{res.companyRegName}</a>)}
                                                </div>
                                                <Button style={{ marginLeft: "0.5rem" }} variant="org" type="submit">
                                                    검색
                                                </Button>
                                                <span hidden={!isCreateAction}>
                                                    <span hidden={!(company.storeCompanyCode && company.companyRegName)}
                                                          style={{ marginLeft: "0.5rem" }}>
                                                        {`[${company.storeCompanyCode}] ${company.companyRegName}`}
                                                    </span>
                                                </span>
                                            </Form.Group>
                                        </Form>
                                    </td>
                                </tr>
                                <tr>
                                    <td>담당자명</td>
                                    <td>
                                        <Form.Group controlId="managerName" style={style.formGroup}>
                                            <Form.Control type="text" style={style.formControl}/>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>직위</td>
                                    <td>
                                        <Form.Group controlId="position" style={style.formGroup}>
                                            <Form.Control style={style.formControl}/>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>이메일</td>
                                    <td>
                                        <Form.Group controlId="email" style={style.formGroup}>
                                            <Form.Control style={style.formControl}/>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>연락처</td>
                                    <td>
                                        <Form.Group controlId="contact" style={style.formGroup}>
                                            <Form.Control style={style.formControl}/>
                                        </Form.Group>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="mr-2"
                                    onClick={() => history.push("/managers")}>취소</Button>
                            <Button variant="org" onClick={() => saveManager()}>저장</Button>
                        </div>
                    {/*</Form>*/}
                </div>
            </div>
        </main>
    )
}