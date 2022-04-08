import {
    CButton,
    CContainer,
    CForm,
    CFormSelect, CHeader, CHeaderBrand,
    CTable,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from "@coreui/react";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {CART_TYPE_ROUTER} from "../../../constants/RouterConstant";
import CarTypeService from "../../../services/CarTypeService";
import FormattedDateTime from "../../../commons/FormattedDateTime";
import {handleChange, handlePageChange} from "../../../utils/StateUtils";
import {convertTypeCartType, TYPE_CAR_TYPE, TYPE_SELECTION} from "../../../constants/TypeContaint";
import Pagination from "../../../commons/Pagination";

const CarTypeList = () => {
    const history = useHistory();
    const [data, setData] = useState()

    const [listBrand, setListBrand] = useState([])
    const [listModel, setListModel] = useState([])
    const [listTypeCar, setListTypeCar] = useState([])

    const [query, setQuery] = useState({
        page: 0,
        size: 10,
        sort: [],
    })

    const [search, setSearch] = useState({
        productType: null,
        brandId: null,
        modelId: null,
        carTypeId: null
    })

    const [checkClickSearch, setCheckClickSearch] = useState(false)

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        if (name === 'brandId') {
            if (value) {
                setSearch({...search, [name]: value});
                CarTypeService.getAllModelByBrandId(value).then(r => {
                    setListModel(r.data)
                })
            } else {
                setListModel([])
                setSearch({...search, brandId: null, modelId: null, carTypeId: null});
            }
        }
        if (name === 'modelId') {
            if (value) {
                setSearch({...search, [name]: value});
                CarTypeService.getAllCarTypeByModelId(value).then(r => {
                    setListTypeCar(r.data)
                })
            } else {
                setListTypeCar([])
                setSearch({...search, modelId: null, carTypeId: null});
            }
        }
    }

    const onClickSearch = () => {
        setCheckClickSearch(!checkClickSearch)
    }


    useEffect(() => {

        CarTypeService.findAll(query, search).then(res => {
            setData(res.data)
        })
        CarTypeService.getAllBrand().then(rb => {
            setListBrand(rb.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, checkClickSearch])

    return (
        <>
            <CContainer fluid>

                <CHeader>
                    <CHeaderBrand className={'fw-bold'}>차종 목록</CHeaderBrand>
                </CHeader>
                <CForm className="row form-horizontal my-5">
                    <div className={'col-11 '}>
                        <div className="row">
                            <div className="col-3">
                              <div className="row">
                                  <div className="col-4">
                                      <label htmlFor="inputPassword" className="col-form-label text-end ">1차분류 </label>
                                  </div>
                                  <div className="col-8">
                                      <CFormSelect aria-label="Default select example"
                                                   name={'productType'}
                                                   onChange={(e) => handleChange(e, search, setSearch)}
                                      >
                                          <option value={TYPE_SELECTION.ALL}>전체</option>
                                          <option value={TYPE_CAR_TYPE.DOMESTIC_ID}>{TYPE_CAR_TYPE.DOMESTIC_NAME}</option>
                                          <option value={TYPE_CAR_TYPE.FOREIGN_ID}>{TYPE_CAR_TYPE.FOREIGN_NAME}</option>
                                      </CFormSelect>
                                  </div>
                              </div>
                            </div>

                            <div className="col-3">
                                <div className="row">
                                    <div className="col-4 ">
                                        <label htmlFor="inputPassword" className="col-form-label text-end d-block">2차분류 </label>
                                    </div>
                                    <div className="col-8">
                                        <CFormSelect className=""
                                                     disabled={listBrand.length === 0}
                                                     name={'brandId'}
                                                     onChange={handleChangeInput}
                                                     value={search.brandId ? search.brandId : TYPE_SELECTION.ALL}
                                                     aria-label="Default select example"
                                        >
                                            <option value={TYPE_SELECTION.ALL}>전체</option>
                                            {
                                                listBrand.length > 0 && listBrand.sort().map((value, index) => {
                                                    return <option key={index}
                                                                   value={value.id}>{value.brandName}</option>
                                                })
                                            }
                                        </CFormSelect>
                                    </div>
                                </div>
                            </div>

                            <div className="col-3">
                                <div className="row">
                                    <div className="col-4 ">
                                        <label htmlFor="inputPassword" className="col-form-label text-end d-block ">3차분류 </label>
                                    </div>
                                    <div className="col-8">
                                        <CFormSelect className=""
                                                     onChange={handleChangeInput}
                                                     disabled={listModel.length === 0}
                                                     name={'modelId'}
                                                     value={search.modelId ? search.modelId : TYPE_SELECTION.ALL}
                                                     aria-label="Default select example"
                                        >
                                            <option value={TYPE_SELECTION.ALL}>전체</option>
                                            {
                                                listModel.length > 0 && listModel.sort().map((value, index) => {
                                                    return <option key={index}
                                                                   value={value.id}>{value.modelName}</option>
                                                })
                                            }
                                        </CFormSelect>
                                    </div>
                                </div>
                            </div>

                            <div className="col-3">
                                <div className="row">
                                    <div className="col-4 ">
                                        <label htmlFor="inputPassword" className="col-form-label text-end d-block ">4차분류</label>
                                    </div>
                                    <div className="col-8">
                                        <CFormSelect className=""
                                                     disabled={listTypeCar.length === 0 || search.brandId === null}
                                                     name={'carTypeId'}
                                                     value={search.carTypeId ? search.carTypeId : TYPE_SELECTION.ALL}
                                                     onChange={(e) => handleChange(e, search, setSearch)}
                                                     aria-label="Default select example"
                                        >
                                            <option value={TYPE_SELECTION.ALL}>전체</option>
                                            {
                                                listTypeCar.length > 0 && listTypeCar.sort().map((value, index) => {
                                                    return <option key={index}
                                                                   value={value.id}>{value.name}</option>
                                                })
                                            }
                                        </CFormSelect>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-1">
                        <button className={'btn btn-dark float-end'}
                                onClick={onClickSearch}
                                type="button"
                        >
                            검색
                        </button>
                    </div>

                </CForm>
                <CTable bordered className="table text-center">
                    <CTableHead color={'secondary'}>
                        <CTableRow className={'align-middle'}>
                            <CTableHeaderCell className={'col-1'}>번호</CTableHeaderCell>
                            <CTableHeaderCell className={'col-1'}>1차분류 (국산/외제)</CTableHeaderCell>
                            <CTableHeaderCell className={'col-1'}>2차분류 (브랜드명)</CTableHeaderCell>
                            <CTableHeaderCell className={'col-1'}>3차분류 (모델명)</CTableHeaderCell>
                            <CTableHeaderCell className={'col-4'}>4차분류 (세부모델명)</CTableHeaderCell>
                            <CTableHeaderCell className={'col-2'}>등록일</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <tbody>
                    {
                        data && data.content.map((value, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr style={{border: "1px solid rgba(218, 220, 224, 0.995)", cursor: "pointer"}}
                                        className={'d-table-row text-decoration-none'}
                                        onClick={() => history.push(`${CART_TYPE_ROUTER.EDIT}/${value.id}`, value)}
                                    >
                                        <CTableDataCell>{data.number > 0 ? (data.number * data.size + index + 1) : (index + 1)}</CTableDataCell>
                                        <CTableDataCell>{convertTypeCartType(value.productType)}</CTableDataCell>
                                        <CTableDataCell>{value.brand ? value.brand.brandName : "-"}</CTableDataCell>
                                        <CTableDataCell>{value.model ? value.model.modelName : "-"}</CTableDataCell>
                                        <CTableDataCell>{(value.name && value.name.length > 0)  ? value.name : "-"}</CTableDataCell>
                                        <CTableDataCell>
                                            <FormattedDateTime source={value.createdOn} format={"YYYY.MM.DD"}/>
                                        </CTableDataCell>
                                    </tr>
                                </React.Fragment>
                            )
                        })
                    }
                    </tbody>
                </CTable>

                <div className="float-end">
                    <CButton onClick={() => history.push(CART_TYPE_ROUTER.REGISTER)} className={'btn btn-dark '}
                             type="submit">
                        등록
                    </CButton>
                </div>
                {/*PAGING*/}
                {
                    data?.content.length > 0 &&
                    <Pagination
                        url={history.location.pathname}
                        name="page"
                        onPageChange={(e, v) => handlePageChange(e, v, query, setQuery)}
                        selectedPage={data.number}
                        totalPages={data.totalPages}
                    />
                }


            </CContainer>
        </>
    )
}

export default CarTypeList
