import {
    CButton,
    CContainer,
    CForm,
    CFormSelect, CHeader, CHeaderBrand,
    CTable,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import {useHistory} from 'react-router'
import React, {useEffect, useState} from 'react';
import {handleChange, handlePageChange} from "../../../utils/StateUtils";
import BrandService from "../../../services/BrandService";
import {Link} from "react-router-dom";
import {BRAND_ROUTER} from "../../../constants/RouterConstant";
import FormattedDateTime from "../../../commons/FormattedDateTime";
import CategoryService from "../../../services/CategoryService";
import {TYPE_SELECTION} from "../../../constants/TypeContaint";
import Pagination from '../../../commons/Pagination';

const BrandList = () => {
    const history = useHistory();
    const [data, setData] = useState()
    const [listCategory, setListCategory] = useState([])
    const [query, setQuery] = useState({
        page: 0,
        size: 10,
        sort: ["id,DESC"],
    })

    const [checkClickSearch, setCheckClickSearch] = useState(false)
    const [search, setSearch] = useState({
        categoryId: null,
        term: null
    })

    const onClickSearch = () => {
        setCheckClickSearch(!checkClickSearch)
    }

    useEffect(() => {
        BrandService.findAll(query, search).then(res => setData(res.data))
        CategoryService.getAll().then(res => setListCategory(res.data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, checkClickSearch])


    return (
        <CContainer fluid>

            <CHeader>
                <CHeaderBrand className={'fw-bold'}>브랜드 관리</CHeaderBrand>
            </CHeader>
            <CForm className="d-flex flex-wrap justify-content-end form-horizontal my-5">
                <div className="col-3 d-flex flex-wrap me-5">
                    <label htmlFor="inputPassword" className="col-form-label  me-2">카테고리 </label>
                    <div className="flex-fill">

                        <CFormSelect className=""
                                     disabled={listCategory.length === 0}
                                     name={'categoryId'}
                                     onChange={event => handleChange(event, search, setSearch)}
                                     value={search.categoryId ? search.categoryId : TYPE_SELECTION.ALL}
                                     aria-label="Default select example"
                        >
                            <option value={TYPE_SELECTION.ALL}>전체</option>
                            {
                                listCategory.length > 0 && listCategory.sort().map((value, index) => {
                                    return <option key={index}
                                                   value={value.id}>{value.title}</option>
                                })
                            }
                        </CFormSelect>
                    </div>
                </div>

                <div className="col-4 d-flex flex-wrap me-5">
                    <label htmlFor="term" className="col-form-label me-2">브랜드명</label>
                    <div className="flex-fill">
                        <input type="text"
                               className="form-control"
                               id="term"
                               name={'term'}
                               onChange={(e) => handleChange(e, search, setSearch)}
                        />
                    </div>
                </div>

                <div className="col-2">
                    <CButton className={'btn btn-dark  float-end'}
                             type="button"
                             onClick={onClickSearch}
                    >
                        검색
                    </CButton>
                </div>
            </CForm>
            <CTable bordered className="table text-center">
                <CTableHead color={'secondary'}>
                    <CTableRow>
                        <CTableHeaderCell style={{width: '10%'}}>번호</CTableHeaderCell>
                        <CTableHeaderCell style={{width: '40%'}}>카테고리</CTableHeaderCell>
                        <CTableHeaderCell>브랜드명</CTableHeaderCell>
                        <CTableHeaderCell style={{width: '15%'}}>등록일</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <tbody>

                {
                    data?.content.map((value, index) => {
                        return (
                            <React.Fragment key={index}>
                                <CTableRow>
                                    <CTableDataCell>{data.number > 0 ? (data.number * data.size + index + 1) : (index + 1)}</CTableDataCell>
                                    <CTableDataCell>{value.category.title}</CTableDataCell>
                                    <CTableDataCell>
                                        <Link to={{
                                            pathname: `${BRAND_ROUTER.EDIT}/${value.id}`,
                                            state: value
                                        }}>{value.brandName}
                                        </Link>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <FormattedDateTime source={value.createdOn} format={"YYYY.MM.DD"}/>
                                    </CTableDataCell>
                                </CTableRow>
                            </React.Fragment>
                        )
                    })
                }
                </tbody>
            </CTable>

            <div className="float-end">
                <CButton onClick={() => history.push("/product/brand/register")} className={'btn btn-dark '}
                         type="submit">
                    등록
                </CButton>
            </div>

                {/*PAGGING*/}
                {
                    data?.content?.length > 0 &&
                    <Pagination
                        url={history.location.pathname}
                        name="page"
                        onPageChange={(e, v) => handlePageChange(e, v, query, setQuery)}
                        selectedPage={data.number}
                        totalPages={data.totalPages}/>
                }




        </CContainer>
    )
}

export default BrandList
