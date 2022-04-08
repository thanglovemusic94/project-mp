import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {ParentService} from "../../../services/ParentService";
import PaggingUtils from "../../../utils/PagingUtils";
import {DateUtils} from "../../../utils/DateUtils";
import NumberFormat from "react-number-format";
import checkClassType from "../../../constants/class.constants";
import SearchNotFound from "../../../components/SearchNotFound";

export default function MyPaymentList() {
    const [data, setData] = useState(null)

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: ['id,DESC'],
    })

    function handlePageChange(e) {
        setParams({...params, page: e - 1})
    }

    useEffect(() => {
        ParentService.getPayment(params).then(res => setData(res.data)).catch(e => console.log(e))
    }, [params])
    return (
        <>
            {(data && data.content.length > 0) ?
            <section className="mypaymentlist-section">
                <div className="tablelist g700">
                    <div className="tablelist-header">
                        <div className="tcol-55 d-none d-lg-block">
                            수업 정보
                        </div>
                        <div className="tcol-15 d-none d-lg-block">
                            결제일시
                        </div>
                        <div className="tcol-15 d-none d-lg-block">
                            결제 금액
                        </div>
                        <div className="tcol-15 d-none d-lg-block">
                            결제 상태
                        </div>
                        <div className="tcol-100 d-block d-lg-none">
                            결제 정보
                        </div>
                    </div>
                    <div className="tablelist-body">
                    {
                        data.content.map((v, i) => {
                                return (
                                        <div key={i} className="tablelist-row">
                                            <div className="tcol-md-55 tcol-100 text-left text-title">
                                                <Link to={`/my-payment/details/${v.id}`}>
                                                    [{checkClassType(v.classInformation.type)}] {v.classInformation.name}
                                                </Link>
                                            </div>
                                            <div className="tcol-md-15 tcol-30 tclear text-g500">
                                                {DateUtils.toLocalDate(v.createdOn)}
                                            </div>
                                            <div className="tcol-md-15 tcol-30 text-price">
                                                <NumberFormat value={v.amount} thousandSeparator={true}
                                                              displayType={'text'}/> 원
                                            </div>
                                            <div className="tcol-md-15 tcol-40 text-right text-md-center text-500">
                                                결제 완료
                                            </div>
                                            {/*<div className="tcol-md-15 tcol-40 text-m500 text-right text-md-center text-500">*/}
                                            {/*    결제 완료*/}
                                            {/*</div>*/}
                                            {/*<div className="tcol-md-15 tcol-40 text-danger text-right text-md-center text-500">*/}
                                            {/*    결제 완료*/}
                                            {/*</div>*/}
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
                <SearchNotFound content={'결제 리스트가 없습니다.'}/>
            }

        </>
    )
}
