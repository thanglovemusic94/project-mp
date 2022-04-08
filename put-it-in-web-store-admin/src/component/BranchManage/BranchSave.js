/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import BranchService from "../../services/BranchService";
import CompanyService from "../../services/CompanyService";
import { uploadByPresignedUrl } from "../../services/s3UploadService";
import produce from "immer";
import ImagePreview from '../common/ImagePreview';

export default function BranchSave(props) {

    const [showDD, setShowDD] = useState(false)
    const [term, setTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])

    const [company, setCompany] = useState({
        companyId: "1",
        storeCompanyCode: "",
        storeCompanyName: "",
        nextBranchCode: "",
        companyRegName: "",
        companyRegNumber: "",
    })

    const [branch, setBranch] = useState({
        id: props.match.params.id,
        branchName: "",
        addressSimple: "",
        addressDetailed: "",
        phone: "",
        announcement: "",
        businessInfo: "",
        refundPolicy: "",
        keywords: [],
        companyId: "1",
        imageCount: 0,
        lstImg: [],
    })

    const [mainUrl, setMainUrl] = useState([])
    const [subUrl, setSubUrl] = useState([])

    const [strKeywords, setStrKeywords] = useState("")

    const history = useHistory();
    const [isCreateAction, setScreenAction] = useState(true);

    useEffect(() => {
        const { id } = props.match.params
        if (id) {
            setScreenAction(false)
            BranchService.getBranch(id).then(response => {
                setBranch(response.data)
            })
        }
    }, [props.match.params.id])

    useEffect(() => {
        var lstImage = []
            .concat(mainUrl.map(main => main.name))
            .concat(subUrl.map(sub => sub.name))
        setBranch({ ...branch, imageCount: (mainUrl.length + subUrl.length), lstImg: lstImage })
    }, [mainUrl, subUrl])



    function handleCancelEdit() {
        history.goBack();
    }

    function handleSave() {
        //const keywords = branch.keywords.split(",").map(keyword => keyword.trim())

        BranchService.saveBranch(branch).then(response => {
            if (response.status === 200 || response.status === 204) {
                var lstS3Url = response.data.urls
                // upload image
                var files = [].concat(mainUrl).concat(subUrl);

                files.forEach((item, index) => {
                    uploadByPresignedUrl(lstS3Url[index], item)
                });

                swal({
                    text: "저장이 완료되었습니다.",
                    icon: "success",
                    button: "확인",
                }).then(() => {
                    history.push(`/branches/${response.data.id}`)
                });
            }
        })
    }

    function handleUpPhoto(e) {
        var { files, id } = e.target;
        if (files && files.length > 0) {
            if (id === "mainPhoto") {
                setMainUrl([].concat(files[0]))
            }
            else {
                let fileDatas = Object.entries(files).map((file) => {
                    return file[1]
                })
                if (subUrl.length + fileDatas.length <= 5) {
                    setSubUrl(subUrl.concat(fileDatas))
                }
            }
        }
    }

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
        setBranch({ ...branch, companyId: company.companyId })
        setSearchResult([])
    }

    function handleChangeKeywords(event) {
        setStrKeywords(event.target.value)
        const keywords = event.target.value.split(",").map(keyword => keyword.trim())
        setBranch(produce(draft => {
            draft.keywords = keywords
        }))
    }

    function handleChange(event) {
        const { id, value } = event.target
        const nestedIds = id.split(".")

        setBranch(produce(draft => {
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

    function handleRemoveMainImage(index) {
        setMainUrl([])
        document.getElementById("mainPhoto").value = ""
    }

    function handleRemoveSubImage(index) {
        let newLst = [].concat(subUrl);
        newLst.splice(index, 1);
        setSubUrl(newLst);
    }

    function handleMainPhotoInput() {
        document.getElementById("mainPhoto").click();
    }
    function handleSubPhotoInput() {
        document.getElementById("subPhoto").click();
    }

    return (
        <Container fluid>
            <h4 className="mt-5 mb-3">{(isCreateAction) ? "지점 등록" : "지점 정보 수정"}</h4>
            <Table className="table-form">
                <tbody>
                    <tr>
                        <td>브랜드명</td>
                        <td className="text-left">
                            <Form onSubmit={handleSearchCompany}>
                                <Form.Group controlId="term" className="dropdown">
                                    <Form.Control
                                        plaintext={!isCreateAction}
                                        onChange={(e) => {
                                            setTerm(e.target.value)
                                        }}
                                        list="searchRes"
                                        className="col-3 d-inline" value={term} />
                                    <div hidden={!showDD} id="myDropDown" className="dropdown-content col-3">
                                        {searchResult.map(res => <a onClick={() => handleSelectCompany(res)}>{res.companyRegName}</a>)}
                                    </div>
                                    <span hidden={!isCreateAction}>
                                        <Button style={{ marginLeft: "0.5rem" }} variant="org" type="submit">
                                            검색
                                        </Button>
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
                        <td>지점 코드</td>
                        <td>
                            <Form.Control className="col-3" plaintext={!isCreateAction} value={company.nextBranchCode} />
                        </td>
                    </tr>
                    <Form.Group as="tr" controlId="branchName">
                        <Form.Label as="td">지점명</Form.Label>
                        <td>
                            <Form.Control
                                onChange={handleChange}
                                plaintext={!isCreateAction}
                                className="col-3"
                                value={branch.branchName} />
                        </td>
                    </Form.Group>
                    <tr>
                        <td>지점 대표 사진</td>
                        <td>
                            <Form.File.Input hidden={true} id="mainPhoto" onChange={handleUpPhoto} required accept=".png, .jpg, .jpeg" />
                            <div className="d-flex align-items-center">
                                <div style={{ marginRight: '1em' }}>
                                    <Button className="btn btn-secondary" id='button' onClick={handleMainPhotoInput}>파일 선택</Button>
                                </div>

                                {mainUrl.length > 0 &&
                                    <ImagePreview src={mainUrl[0]} handleRemoveImage={handleRemoveMainImage} />
                                }
                            </div >
                        </td>
                    </tr>
                    <tr>
                        <td>지점 추가 사진</td>
                        <td>
                            <Form.File.Input hidden={true} id="subPhoto" multiple onChange={handleUpPhoto} required accept=".png, .jpg, .jpeg" />
                            <div className="d-flex align-items-center">
                                <div style={{ marginRight: '1em' }}>
                                    <Button className="btn btn-secondary" id='button' onClick={handleSubPhotoInput}>파일 선택</Button>
                                </div>
                                {subUrl.length > 0 &&
                                    subUrl.map((item, index) => { return <><ImagePreview index={index} src={item} handleRemoveImage={handleRemoveSubImage} /> &nbsp; &nbsp; </> })
                                }
                            </div>
                        </td>
                    </tr>
                    <Form.Group as="tr" controlId="addressSimple">
                        <Form.Label as="td">간단 주소</Form.Label>
                        <td>
                            <Form.Control onChange={handleChange} className="col-3" value={branch.addressSimple} />
                        </td>
                    </Form.Group>
                    <Form.Group as="tr" controlId="addressDetailed">
                        <Form.Label as="td">상세 주소</Form.Label>
                        <td>
                            <Form.Control onChange={handleChange} value={branch.addressDetailed} />
                        </td>
                    </Form.Group>
                    <Form.Group as="tr" controlId="phone">
                        <Form.Label as="td">지점 전화번호</Form.Label>
                        <td>
                            <Form.Control onChange={handleChange} className=" col-3" value={branch.phone} />
                        </td>
                    </Form.Group>
                    <tr>
                        <td>지점 상세정보</td>
                        <td>
                            <Form.Group as={Row} controlId="announcement">
                                <Form.Label className="col-1" as={Col}>공지사항</Form.Label>
                                <Col>
                                    <Form.Control onChange={handleChange} value={branch.announcement} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="businessInfo">
                                <Form.Label className=" col-1" as={Col}>영업정보</Form.Label>
                                <Col>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        style={{ whiteSpace: "pre-line" }}
                                        onChange={handleChange}
                                        value={branch.businessInfo} />
                                </Col>
                            </Form.Group>
                            <Row>
                                <Col className=" col-1">사업자 정보</Col>
                                <Col>
                                    <Form.Control as="textarea" readOnly style={{ whiteSpace: "pre-line" }}
                                        value={`사업자등록상호명: ${company.companyRegName}
                                        사업자등록번호: ${company.companyRegNumber}`} />
                                </Col>
                            </Row>
                        </td>
                    </tr>
                    <Form.Group as="tr" controlId="refundPolicy">
                        <Form.Label as="td">지점 환불정책</Form.Label>
                        <td>
                            <Form.Control onChange={handleChange} value={branch.refundPolicy} />
                        </td>
                    </Form.Group>
                    <Form.Group as="tr" controlId="keywords">
                        <Form.Label as="td">검색키워드</Form.Label>
                        <td>
                            <Form.Control onChange={handleChangeKeywords} value={strKeywords} />
                        </td>
                    </Form.Group>
                </tbody>
            </Table>

            <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={handleCancelEdit}>취소</Button>
                <Button style={{ marginLeft: "0.5rem" }} variant="org" onClick={handleSave}>저장</Button>
            </div>
        </Container>
    )
}