import React, {useEffect, useState} from 'react'
import {ParentService} from "../../../services/ParentService";
import PaggingUtils from "../../../utils/PagingUtils";
import NumberFormat from "react-number-format";
import {DateUtils} from "../../../utils/DateUtils";
import SearchNotFound from "../../../components/SearchNotFound";

export default function MyCashList() {
    const [data, setData] = useState()
    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: ['id,DESC'],
    })

    function handlePageChange(e) {
        setParams({...params, page: e - 1})
    }

    useEffect(() => {
        ParentService.getCashRequirement(params).then(res => setData(res.data)).catch(e => console.log(e))
    }, [params])

    function checkClassName(action) {
        switch (action) {
            case 'CASH_REQUEST':
                return {
                    name: '현금 신청',
                    className: 'text-m500'
                }
            case 'CASH_COMPLETE':
                return {
                    name: '현금 완료',
                    className: ''
                }

            case 'NON_CASH':
            default:
                return {
                    name: '현금 불가',
                    className: 'text-danger'
                };
        }
    }
    return (
        <>
            {(data && data.content.length > 0) ?
                <section className="mypaymentlist-section">
                    <div className="tablelist g700">
                        <div className="tablelist-header">
                            <div className="tcol-md-50 tcol-40 text-title text-left text-lg-center pl-3">
                                포인트
                            </div>
                            <div className="tcol-md-15 tcol-30">신청 일시</div>
                            <div className="tcol-md-15 tcol-30">완료 일시</div>
                            <div className="tcol-20 d-none d-lg-block">상태</div>
                        </div>
                        <div className="tablelist-body">
                            {data.content.map((v, i) => {
                                return (
                                    <div key={i} className="tablelist-row">
                                        <div className="tcol-md-50 tcol-40 text-title pl-3">
                                            <NumberFormat value={v.point}
                                                          thousandSeparator={true}
                                                          displayType={'text'}/> 포인트
                                        </div>
                                        <div className="tcol-md-15 tcol-30 text-g500 text-center">
                                            {DateUtils.toLocalDate(v.createdOn)}
                                        </div>
                                        <div className="tcol-md-15 tcol-30 text-g500 text-center">
                                            {v.completionTime ? DateUtils.toLocalDate(v.completionTime): '-'}
                                        </div>
                                        <div className={`tcol-md-20 tcol-100 ${checkClassName(v.status).className} text-title pl-3`}>
                                            {checkClassName(v.status).name}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <PaggingUtils
                        page={params.page + 1}
                        size={params.size}
                        totalPages={data.totalPages}
                        onClick={handlePageChange}
                    />
                </section>
                :
                <SearchNotFound content={'현금 신청 리스트가 없습니다.'}/>
            }
        </>
    )
}
