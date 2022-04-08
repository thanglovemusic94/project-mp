import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {ParentService} from "../../../services/ParentService";
import PaggingUtils from "../../../utils/PagingUtils";
import checkClassType from "../../../constants/class.constants";
import checkRefund from "../../../constants/refund.containts";
import checkRefundStatus from "../../../constants/refund.containts";
import {DateUtils} from "../../../utils/DateUtils";
import SearchNotFound from "../../../components/SearchNotFound";

export default function MyRefundList() {
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
        ParentService.getRefund(params).then(res => setData(res.data)).catch(e => console.log(e))
    }, [params])

    return (
        <>
            {(data && data.content.length > 0) ?
                <section className="myrefundlist-section">
                    <div className="tablelist g700">
                        <div className="tablelist-header">
                            <div className="tcol-md-70 tcol-80">수업 정보</div>
                            <div className="tcol-15 d-none d-lg-block">
                                환불 신청 일시
                            </div>
                            <div className="tcol-md-15 tcol-20">환불 상태</div>
                        </div>
                        <div className="tablelist-body">
                            {data.content.map((v, i) => {
                                let status = checkRefundStatus(v.status)
                                return (
                                    <div className="tablelist-row">
                                        <div className="tcol-md-70 tcol-100 text-left text-title">
                                            <Link to={`/refund-details/${v.id}`}>
                                                [{checkClassType(v.payment.classInformation.type)}] {v.payment.classInformation.name}
                                            </Link>
                                        </div>
                                        <div className="tcol-md-15 tcol-50 tclear text-g500">
                                            {DateUtils.toLocalDate(v.createdOn)}
                                        </div>
                                        <div className={`tcol-md-15 tcol-50 ${status.className} text-right text-md-center text-title`}>
                                            {status.name}
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
                <SearchNotFound content={'환불 리스트가 없습니다.'}/>
            }
        </>
    )
}
