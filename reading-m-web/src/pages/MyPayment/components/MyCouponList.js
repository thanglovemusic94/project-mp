import React, {useEffect, useState} from 'react'
import {ParentService} from "../../../services/ParentService";
import NumberFormat from "react-number-format";
import {checkStatusCoupon, checkStatusLiveClass} from "../../../constants/coupon.constaints";
import {DateUtils} from "../../../utils/DateUtils";
import PaggingUtils from "../../../utils/PagingUtils";
import SearchNotFound from "../../../components/SearchNotFound";

export default function MyCouponList() {

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
        ParentService.getAllCoupon(params).then(res => setData(res.data)).catch(e => console.log(e))
    }, [params])

    return (
        <>
            {(data && data.content.length > 0) ?
                <section className="mycouponlist-section">
                    <div className="tablelist g700">
                        <div className="tablelist-header">
                            <div className="tcol-md-50 tcol-100">쿠폰 정보</div>
                            <div className="tcol-10 d-none d-lg-block">
                                할인 금액
                            </div>
                            <div className="tcol-20 d-none d-lg-block">
                                적용 수업
                            </div>
                            <div className="tcol-20 d-none d-lg-block">
                                유효기간
                            </div>
                        </div>
                        <div className="tablelist-body">
                            {
                                data.content.map((v, i) => {
                                    return (
                                        <div className="tablelist-row" key={i}>
                                            <div className="tcol-md-50 tcol-80 text-left text-title mb-md-0 mb-1">
                                                <span className="lcicon-coupon"></span>
                                                {v.name}
                                            </div>
                                            <div className="tcol-md-10 tcol-20 text-right text-md-center text-danger">
                                                <NumberFormat value={v.amount} thousandSeparator={true}
                                                              displayType={'text'}/> 원
                                            </div>
                                            <div className="tcol-md-20 tcol-40 tclear">
                                                {checkStatusLiveClass(v.classType)}
                                            </div>
                                            <div className="tcol-md-20 tcol-60 text-g500">
                                                {DateUtils.toLocalDate(v.startValidDate)} ~ {DateUtils.toLocalDate(v.endValidDate)}
                                            </div>
                                        </div>
                                    )
                                })
                            }

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
                <SearchNotFound content={'쿠폰 리스트가 없습니다.'}/>
            }

        </>
    )
}
