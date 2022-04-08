import {
    CButton,
    CContainer,
    CFormSelect, CHeader,
    CHeaderBrand,
    CTable,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import {useHistory} from 'react-router'
import {useEffect, useRef, useState} from "react";
import {NoticeService} from "../../services/NoticeService";
import FormattedDateTime from "../../commons/FormattedDateTime";
import {handleChange, handlePageChange} from "../../utils/StateUtils";
import {Link} from "react-router-dom";
import {NOTIFICATION_ROUTER} from "../../constants/RouterConstant";
import {convertTypeNotice, TYPE_NOTICE} from "../../constants/TypeContaint";
import Pagination from '../../commons/Pagination';

const NoticeList = () => {
    const history = useHistory();
    const [data, setData] = useState();
    const termRef = useRef();
    const [query, setQuery] = useState({
        page: 0,
        size: 10,
        sort: ['createdOn,DESC', 'id,DESC'],
        type: null,
        term: null
    });

    const onSearch = () => {
        const termValue = termRef.current.value;
        setQuery({...query, term: termValue})
    }

    useEffect(() => {
        NoticeService.findByQuery(query).then(r => {
            setData(r.data)
        })
    }, [query])

    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>공지사항 목록</CHeaderBrand>
            </CHeader>
            <div className="d-flex flex-wrap justify-content-end form-horizontal my-5">
                <div className="col-3 me-5">
                    <div className="row">
                        <div className={'col-3'}>
                            <label htmlFor="inputPassword" className="col-form-label text-end d-block me-2">유형 </label>
                        </div>
                        <div className={'col-9'}>
                            <CFormSelect className="" name="type" aria-label="Default select example"
                                         onChange={(e) => handleChange(e, query, setQuery)}>
                                <option value={''}>전체</option>
                                <option value={TYPE_NOTICE.GENERAL_ID}>{TYPE_NOTICE.GENERAL_NAME}</option>
                                <option value={TYPE_NOTICE.COMPANY_ID}>{TYPE_NOTICE.COMPANY_NAME}</option>
                            </CFormSelect>
                        </div>
                    </div>
                </div>

                <div className="col-5 me-4">
                    <div className="row">
                        <div className={'col-3'}>
                            <label htmlFor="inputPassword" className="col-form-label me-2 text-end d-block">공지사항
                                제목
                            </label>
                        </div>
                        <div className={'col-9'}>
                            <input type="text" ref={termRef} className="form-control" name="term" id="inputPassword"/>
                        </div>
                    </div>
                </div>

                <div className="col-2">
                    <button className={'btn btn-dark  float-end'}
                            onClick={onSearch}
                    >
                        검색
                    </button>
                </div>

            </div>

            <CTable bordered className="table ">
                <CTableHead color={'secondary text-center'}>
                    <CTableRow>
                        <CTableHeaderCell style={{width: '10%'}}>순서</CTableHeaderCell>
                        <CTableHeaderCell style={{width: '15%'}}>유형</CTableHeaderCell>
                        <CTableHeaderCell>공지사항 제목</CTableHeaderCell>
                        <CTableHeaderCell style={{width: '15%'}}>등록일</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <tbody>
                {
                    data && data.content.map((v, i) => {
                            return (
                                <CTableRow key={i}>
                                    <CTableDataCell
                                        className={'text-center'}>{data.number > 0 ? (data.number * data.size + i + 1) : (i + 1)}</CTableDataCell>
                                    <CTableDataCell>{convertTypeNotice(v.type)}</CTableDataCell>
                                    <CTableDataCell>
                                        <Link to={`${NOTIFICATION_ROUTER.EDIT}/${v.id}`}>{v.title}</Link>
                                    </CTableDataCell>
                                    <CTableDataCell className={'text-center'}>
                                        <FormattedDateTime source={v.createdOn} format={'YYYY.MM.DD'}/>
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        }
                    )
                }
                </tbody>
            </CTable>

            <div className="float-end">
                <CButton onClick={() => history.push("/notification/register")} className={'btn btn-dark '}
                         type="submit">
                    등록
                </CButton>
            </div>

            {
                data &&
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

export default NoticeList
