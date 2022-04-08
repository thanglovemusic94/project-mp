import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {ParentService} from "../../../services/ParentService";
import PaggingUtils from "../../../utils/PagingUtils";
import NumberFormat from "react-number-format";
import {DateUtils} from "../../../utils/DateUtils";
import SearchNotFound from "../../../components/SearchNotFound";

export default function MyPointList() {
    const [data, setData] = useState()
    const [summary, setSummary] = useState()

    const [params, setParams] = useState({
        page: 0,
        size: 10,
        sort: ['id,DESC'],
    })

    function handlePageChange(e) {
        setParams({...params, page: e - 1})
    }

    useEffect(() => {
        ParentService.getPoints(params).then(res => setData(res.data)).catch(e => console.log(e))
        ParentService.getSummaryPoints().then(res => setSummary(res.data)).catch(e => console.log(e))
    }, [params])

    function checkSummary(type) {
        let item = summary.filter((v) => {
            return v.type === type;
        })

        return (
            <>
                <NumberFormat value={item[0].amount} thousandSeparator={true}
                              displayType={'text'}/> <span>${`\xa0\xa0 포인트`}</span>
            </>
        )
    }

    function checkClassName(action) {
        switch (action) {
            case 'REFUND':
                return {
                    name: '지급',
                    className: 'text-danger'
                }
            case 'USE':
                return {
                    name: '사용',
                    className: 'text-m500'
                }

            case 'PROVIDE':
            default:
                return {
                    name: '환불',
                    className: ''
                };
        }
    }

    function checkPointClassification(type) {
        if (type === 'EVENT_POINT') return '이벤트 포인트'
        if (type === 'CASH_POINT') return '현금 포인트'
    }

    function checkAmount(action) {
        if (action === 'PROVIDE')
            return " + "
        else return " - "
    }

    return (
        <>
            {(data && data.content.length > 0) ?
                <section className="mypointlist-section">
                    <div className="mypoint-intro pb-lg-4">
                        {summary &&
                        <div className="d-lg-flex">
                            <div className="col-lg-4 d-flex d-lg-block">
                                <label className="label-point col-4 col-lg-12 ">
                                    <i className="lcicon-cashpoint mr-1"></i>
                                    현금 포인트
                                </label>
                                <p className="point-amount col-8 col-lg-12 d-flex">
                                    {checkSummary('CASH_POINT')}
                                    <Button
                                        variant="g700"
                                        className="btn-point ml-2"
                                        as={Link}
                                        to={{pathname:'/my-payment/cash-application', state: summary.filter(v=> v.type === 'CASH_POINT')[0]}}
                                    >
                                        현금 신청
                                    </Button>
                                </p>
                            </div>
                            <div className="col-lg-3 d-flex d-lg-block">
                                <label className="label-point col-4 col-lg-12">
                                    <i className="lcicon-eventpoint mr-1"></i>
                                    이벤트 포인트
                                </label>
                                <p className="point-amount col-8 col-lg-12 d-flex">
                                    {checkSummary('EVENT_POINT')}
                                </p>
                            </div>
                            <div className="col-lg-5">
                                <div className="point-period">
                                    <h3 className="p">포인트 유효기간</h3>
                                    <p className="text-g500">
                                        - 이벤트/마케팅 행사로 지급된 이벤트
                                        포인트는 포인트 지급 후 3개월 뒤에 자동으로
                                        소멸합니다. - 수업 환불로 지급된 현금
                                        포인트는 포인트 지급 후 5년 뒤에 자동으로
                                        소멸합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                        }

                    </div>
                    <div className="tablelist g700">
                        <div className="tablelist-header">
                            <div className="tcol-md-5 d-none d-lg-block">구분</div>
                            <div className="tcol-15 d-none d-lg-block">
                                포인트 구분
                            </div>
                            <div className="tcol-20 d-none d-lg-block">포인트</div>
                            <div className="tcol-40 d-none d-lg-block">
                                포인트명
                            </div>
                            <div className="tcol-20 d-none d-lg-block">지급일</div>
                            <div className="tcol-100 d-block d-lg-none">
                                포인트 정보
                            </div>
                        </div>
                        <div className="tablelist-body">
                            {data.content.map((v, i) => {
                                return (
                                    <div className="tablelist-row" key={i}>
                                        <div
                                            className={`tcol-md-5 tcol-20 ${checkClassName(v.action).className} point-status text-title`}>
                                            {checkClassName(v.action).name}
                                        </div>
                                        <div className="tcol-md-15 tcol-40">
                                            {checkPointClassification(v.type)}
                                        </div>
                                        <div className={`tcol-md-20 ${checkClassName(v.action).className} tcol-40 text-title`}>
                                            {checkAmount(v.action)}<NumberFormat value={v.amount}
                                                                                 thousandSeparator={true}
                                                                                 displayType={'text'}/> 포인트
                                        </div>
                                        <div className="tcol-md-40 point-sub">
                                            {v.name}
                                        </div>
                                        <div className="tcol-md-20 text-g500 tcol-80">
                                            {DateUtils.toLocalDate(v.createdOn)}
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
                <SearchNotFound content={'포인트 리스트가 없습니다.'}/>
            }
        </>
    )
}
