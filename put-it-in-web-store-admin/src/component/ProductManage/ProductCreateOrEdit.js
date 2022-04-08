import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Table, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { ProductService } from "./../../services/product.service";
import ImagePreview from '../common/ImagePreview';
import CompanyService from "../../services/CompanyService";
import ImageService from "../../services/ImageService";
import './productManage.css';
import { uploadByPresignedUrl } from "../../services/s3UploadService";

const style = {
    title: { verticalAlign: "middle" },
    formGroup: { marginBottom: "0px" },
    formGroupInline: { marginBottom: "0px", display: "flex", alignItems: "center" },
    formControl: { width: "400px" },
    formControlSmall: { width: "100px" },
    sizeInput: { width: "55px" },
}

const periodDiscountInit = [
    { monthAmount: 1, discountPercentage: "" },
    { monthAmount: 3, discountPercentage: "" },
    { monthAmount: 5, discountPercentage: "" },
    { monthAmount: 7, discountPercentage: "" },
    { monthAmount: 9, discountPercentage: "" },
    { monthAmount: 12, discountPercentage: "" }
]

const initData = {
    branchId: 0, brandName: "", branchName: "", code: "", name: "", pictogram: "", mainPhoto: ""
    , subPhotoUrls: [], size: { width: "", height: "", depth: "" }, price: ""
    , periodDiscount: periodDiscountInit, deposit: "", quantity: "", purchaseLimit: 0, availableDay: 0
    , minUsage: "", imageCount: 0
}


export default function ProductCreateOrEdit(props) {

    const history = useHistory();
    const [isUpdateAction, setUpdateAction] = useState(undefined);
    const [data, setData] = useState(initData);
    const [showDD, setShowDD] = useState(false);

    const [mainUrl, setMainUrl] = useState([])
    const [subUrl, setSubUrl] = useState([])
    const [term, setTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [pictograms, setPictograms] = useState([])
    const [selectedPictograms, setSelectedPictograms] = useState(undefined)

    const [company, setCompany] = useState({
        companyId: undefined,
        storeCompanyCode: "",
        storeCompanyName: "",
        nextBranchCode: "",
        companyRegName: "",
        companyRegNumber: "",
    })

    const [branches, setBranch] = useState([])

    useEffect(() => {
        ImageService.listData().then((response) => {
            if (response.data.length > 0) {
                console.log(response.data);
                setPictograms(response.data);
            }
        }).catch((err) => {
            alert(err);
        })
    }, [])

    useEffect(() => {
        const { id } = props.match.params;
        if (id) {
            setUpdateAction(id);
        }
    }, [props])

    function handleChange(e) {
        const { value, id } = e.target;
        setData({ ...data, [id]: value })
    }

    function handleChangeSize(e) {
        const { value, id } = e.target

        let { size } = data;
        switch (id) {
            case 'width':
                size.width = parseInt(value)
                break;
            case 'height':
                size.height = parseInt(value)
                break;
            case 'depth':
                size.depth = parseInt(value)
                break;
            default:
                break;
        }
        setData({ ...data, size: size })
    }

    function handleChangePeriod(period) {
        setData({ ...data, periodDiscountInit: period });
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

    useEffect(() => {
        var lstImage = []
            .concat(mainUrl.map(main => main.name))
            .concat(subUrl.map(sub => sub.name));
        setData({ ...data, imageCount: (mainUrl.length + subUrl.length), subPhotoUrls: lstImage })
    }, [mainUrl, subUrl])

    function handleCancelEdit() {
        history.goBack();
    }

    function handleSave() {

        let createUpdateParam = {
            "availDays": 0,
            "branchId": data.branchId,
            "deposit": parseFloat(data.deposit),
            "id": 0,
            "imageCount": data.imageCount,
            "mainPhotoUrl": data.mainPhoto,
            "minUsage": 0,
            "name": data.name,
            "periodDiscounts": data.periodDiscount,
            "price": parseInt(data.price),
            "purchaseLimit": 0,
            "quantity": 0,
            "size": data.size,
            "subPhotoUrls": data.subPhotoUrls,
            "pictogram": selectedPictograms
        }

        console.log("request: " + createUpdateParam)

        if (isUpdateAction) {
            ProductService.update(isUpdateAction, createUpdateParam).then((response) => {
                if (response.status === 201) {
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
                        history.push(`/product/detail/${response.data.id}`)
                    });
                }
            }).catch((err) => {
                alert(err);
            })
        } else {
            ProductService.create(createUpdateParam).then((response) => {
                if (response.status === 201) {
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
                        history.push(`/product/detail/${response.data.id}`)
                    });
                }
            }).catch((err) => {
                alert(err);
            })
        }
    }

    function handleMainPhotoInput() {
        document.getElementById("mainPhoto").click();
    }
    function handleSubPhotoInput() {
        document.getElementById("subPhoto").click();
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
        // setData({ ...data, companyId: company.companyId })
        setSearchResult([])
    }

    function handleChoosePictogram(id) {
        var selected = pictograms.find(item => item.id === id)
        if (selected) {
            setSelectedPictograms(selected)
        }
    }

    useEffect(() => {
        if (company.companyId) {
            CompanyService.fetchBranches(company.companyId).then(response => {
                if (response.status === 200 && response.data.branches.length > 0) {
                    setBranch(response.data.branches)
                }
            })
        }
    }, [company.companyId])

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">{(isUpdateAction) ? "상품 정보 수정" : "상품 등록"}</h4>

                <div>
                    <div className="table-responsive">
                        <Table bordered>
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td width="200px" style={style.title}>브랜드명</td>
                                    <td className="text-left">
                                        <Form onSubmit={handleSearchCompany}>
                                            <Form.Group controlId="term" className="dropdown">
                                                <Form.Control
                                                    plaintext={isUpdateAction}
                                                    onChange={(e) => {
                                                        setTerm(e.target.value)
                                                    }}
                                                    list="searchRes"
                                                    className="col-3 d-inline" value={term} />
                                                <div hidden={!showDD} id="myDropDown" className="dropdown-content col-3">
                                                    {searchResult.map(res => <a onClick={() => handleSelectCompany(res)}>{res.companyRegName}</a>)}
                                                </div>
                                                <span hidden={isUpdateAction}>
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
                                    <td>지점명</td>
                                    <td>

                                        <Form.Control id="branchId" style={style.formControl}
                                            as="select" onChange={handleChange} placeholder="Select">
                                            <option value="">Select</option>
                                            {
                                                (branches && branches.length > 0) && branches.map((item, index) => {
                                                    return <option key={index} value={item.id}>{item.name}</option>
                                                })
                                            }
                                        </Form.Control>

                                    </td>
                                </tr>
                                <tr>
                                    <td>상품 코드</td>
                                    <td>
                                        <Form.Group controlId="code" style={style.formGroup}>
                                            <Form.Control style={style.formControl} type="text" onChange={handleChange} value={data.code} />
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>상품명</td>
                                    <td>
                                        <Form.Group controlId="name" style={style.formGroup}>
                                            <Form.Control style={style.formControl} type="text" onChange={handleChange} value={data.name} />
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>상품 픽토그램</td>
                                    <td className="text-left">
                                        <div className="d-flex align-items-center">
                                            <Form.Group controlId="pictogram" style={{marginRight: '2.5em'}}>
                                                <DropdownButton
                                                    id={`pictogram`}
                                                    variant={`outline-secondary`}
                                                    title={`선택`}
                                                    style={{ maxHeight: "200px" }}
                                                >
                                                    {
                                                        (pictograms && pictograms.length > 0)
                                                        &&
                                                        pictograms.map((item, index) => {
                                                            return <Dropdown.Item key={item.id} onClick={() => handleChoosePictogram(item.id)}><img src={item.url} alt="" /></Dropdown.Item>
                                                        })
                                                    }
                                                </DropdownButton>
                                            </Form.Group>
                                            {selectedPictograms &&
                                                <ImagePreview url={selectedPictograms.url} hideRemoveButton={true} />
                                            }
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>상품 대표 사진</td>
                                    <td>
                                        <Form.File.Input hidden={true} id="mainPhoto" onChange={handleUpPhoto} accept=".png, .jpg, .jpeg" />
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
                                    <td>상품 추가 사진</td>
                                    <td>
                                        <Form.File.Input hidden={true} multiple id="subPhoto" onChange={handleUpPhoto} accept=".png, .jpg, .jpeg" />
                                        <div className="d-flex align-items-center">
                                            <div style={{ marginRight: '1em' }}>
                                                <Button className="btn btn-secondary" id='button' onClick={handleSubPhotoInput}>파일 선택</Button>
                                            </div>

                                            {subUrl.length > 0 &&
                                                subUrl.map((item, index) => { return <><ImagePreview index={index} src={item} handleRemoveImage={handleRemoveSubImage} /> &nbsp; &nbsp; </> })
                                            }
                                        </div >
                                    </td>
                                </tr>
                                <tr>
                                    <td>상품 사이즈</td>
                                    <td>
                                        <Form.Group style={style.formGroupInline}>
                                            <Form.Control style={style.sizeInput} type="text" id="width" value={data.size.width} onChange={handleChangeSize} />
                                                &nbsp; X &nbsp;
                                                <Form.Control style={style.sizeInput} type="text" id="height" value={data.size.height} onChange={handleChangeSize} />
                                                &nbsp; X &nbsp;
                                                <Form.Control style={style.sizeInput} type="text" id="depth" value={data.size.depth} onChange={handleChangeSize} />
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>상품 가격</td>
                                    <td>
                                        <Form.Group controlId="price" style={style.formGroupInline}>
                                            월: &nbsp;&nbsp; <Form.Control style={style.formControl} type="text" value={data.price} onChange={handleChange} /> &nbsp;&nbsp; 원
                                            </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>이용기간별 상품 할인</td>
                                    <td>
                                        <SectionPeriodDiscount periodDiscount={data.periodDiscount} handleChangePeriod={handleChangePeriod} />
                                        {/* <Form.Group controlId="formBasicEmail" style={style.formGroup}>
                                                <Form.Control style={style.formControl} type="text" value="1 month or more" />
                                            </Form.Group> */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>상품 보증금</td>
                                    <td>
                                        <Form.Group controlId="deposit" style={style.formGroupInline}>
                                            <Form.Control style={style.formControl} type="text" onChange={handleChange} /> &nbsp;&nbsp; 원
                                            </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>재고 수량</td>
                                    <td>
                                        <Form.Group controlId="storeQuantity" style={style.formGroupInline}>
                                            <Form.Control style={style.formControl} type="text" onChange={handleChange} /> &nbsp;&nbsp; 개
                                            </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>구매 수량 제한</td>
                                    <td>
                                        <Form.Group controlId="purchaseQuantity" style={style.formGroupInline}>
                                            <Form.Control style={style.formControl} type="text" onChange={handleChange} /> &nbsp;&nbsp; 개
                                            </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>예약 가능일</td>
                                    <td>
                                        <Form.Group controlId="availableDay" style={style.formGroupInline}>
                                            <Form.Control style={style.formControl} type="text" onChange={handleChange} /> &nbsp;&nbsp; 일
                                            </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">상품 상세정보</td>
                                    <td>
                                        <Form.Group controlId="productDetailInfo" style={style.formGroupInline}>
                                            <div className="row">
                                                <label className="ml-3 mr-2">보관가능 박스수량</label>
                                                <Form.Control style={style.formControlSmall} type="text" onChange={handleChange} />
                                                <label className="ml-2">박스  / 우체국 5호 박스 기준(48 x 34 x 38 cm)</label>
                                            </div>
                                        </Form.Group>
                                        <br />
                                        <Form.Group controlId="productDetailInfo" style={style.formGroupInline}>
                                            <div className="row" >
                                                <label className="ml-3 mr-2">최소 이용기간</label>
                                                <Form.Control style={style.formControlSmall} type="text" onChange={handleChange} />
                                                <label className="ml-2">개월 / 1개월은 30일 기준</label>
                                            </div>
                                        </Form.Group>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <Row>
                        <Col>
                            <div className="float-left">
                                <Link to="/product/management"><Button variant="secondary" size="sm">목록으로</Button></Link>
                            </div>
                        </Col>
                        <Col>
                            <div className="float-right">
                                <Button variant="secondary" onClick={handleCancelEdit}>취소</Button>
                                    &nbsp;
                                    <Button variant="org" onClick={handleSave}>저장</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </main>
    )
}

function SectionPeriodDiscount(props) {
    var { periodDiscount } = props;

    function handleChange(e) {
        let { value, name } = e.target;
        periodDiscount[name].discountPercentage = parseInt(value);
        props.handleChangePeriod(periodDiscount);
    }

    return (
        <div>
            {
                <table>
                    <tbody>
                        <tr>
                            <td>이용기간</td>
                            <td>할인율</td>
                        </tr>
                        {periodDiscount.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.monthAmount} 개월 이상</td>
                                <td>
                                    <Form.Group style={style.formGroup} >
                                        <Form.Control style={style.formControl} type="number"
                                            min="0"
                                            max="100"
                                            name={index} value={item.discountPercentage}
                                            placeholder="%"
                                            onChange={handleChange} />
                                    </Form.Group>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}