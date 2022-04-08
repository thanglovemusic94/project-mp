import IconCircle from "../../../IconCircle";
import { Button } from "react-bootstrap";

import { QuoteStatus } from "../../../../constants/QuoteStatus";
import { useContext } from "react";
import { AppContext } from "../../../../App";
import UsageHistoryService from "../../../../services/UsageHistoryService";
import Format from "../../../../utils/Format";
import { CHATTING, USAGE_HISTORY_ROUTER } from "../../../../constants/RouteConstants";
import { Link, useHistory } from "react-router-dom";
import RatingReview from "../../../RatingReview";
import BadgeStatus from "../../../BadgeStatus";
import {useCheckNewMess} from "../../../../utils/FireBaseUtils";
import {SessionStorageManager} from "../../../../managers/SessionStorageManager";


const ItemReceivedQuote = ({ value, indexEnd }) => {
    const history = useHistory();
    const { showInfoPopup } = useContext(AppContext);
    const memberInfo = SessionStorageManager.getMemberInfo()
    const checkNewMess = useCheckNewMess(value.id.toString(), memberInfo?.memberId);

    const onClickChatConsultation = () => {
        //state is quoteId
        history.push({ pathname: CHATTING, state: {channelId: value.id.toString() }})
    }

    const onClickViewDetailQuote = () => {
        history.push({ pathname: USAGE_HISTORY_ROUTER.QUOTATION_DETAIL, state: value })
    }

    const pathCompanyInfo = USAGE_HISTORY_ROUTER.COMPANY_INFO

    const onClickViewCancelReason = () => {
        UsageHistoryService.geInfoReservationHistory(value.id).then(res => {
            const reason = res.data.reason
            showInfoPopup(null,
                <div>
                    <div className={'fs-17 fw-medium lh-22'}>
                        취소 사유
                    </div>
                    <div>{reason}</div>
                </div>
                , null)
        })
    }

    return (
        <>
            <div className={`bg-white p-12px ${indexEnd ? '' : 'mb-12px'}`}>
                <div className={'d-flex justify-content-between align-items-center mb-1'}>
                    <BadgeStatus idQuote={value?.id} status={value?.status} />
                    <Link style={{ 'cursor': 'pointer' }} className={'d-flex align-items-center text-decoration-none'} to={{ pathname: pathCompanyInfo, state: value.company.id }}>
                        <IconCircle nameIcon={'info'} />
                        <span className={' fs-12 lh-15 text-green-300 '}>업체정보</span>
                    </Link>
                </div>
                <div className={'fs-17 text-black-900 fw-bold'}>{value.company.companyName}</div>
                <div className={'fs-12 text-black-550 '}>{value.company.address.addressDetail + ", " + value.company.address.address}</div>
                <RatingReview ratingValue={value.company.average} />

                <span className={'fs-12 text-black-550 align-bottom'}> ({Format.number(value.company.average, 1)}) 후기 {Format.number(value.company.totalReview, 0)}+
                </span>

                <hr className={'mt-12px6 mb-8px4'} />

                <div className={'d-flex justify-content-between align-items-center  text-black-550 fs-12 mb-2px'}>
                    <span>보험 수리</span>
                    <span>VAT 포함</span>
                </div>

                <div className={'ps-4'}>
                    <div className={'d-flex justify-content-between align-items-center text-black-900'}>
                        <span className={'fs-12'}>총 시공 비용</span>
                        <span className={'fs-14'}>{Format.money(value.constructionFee)}</span>
                    </div>
                    <div className={'d-flex justify-content-between align-items-center'}>
                        <span className={'fs-12'}>결제 금액</span>
                        <span className={'fw-bold text-blue-500'}>{Format.money(value.paymentAmount)} </span>
                    </div>
                </div>

                <div className={'row gx-2 pt-6px'}>
                    <div className="col d-grid gap-1">
                        <Button className={'text-white text-center fs-14 rounded-0'} variant="green-300"
                            onClick={onClickChatConsultation}
                        >
                            <span>채팅 상담</span>
                            {
                                checkNewMess && <IconCircle nameIcon={'new'} />
                            }
                        </Button>
                    </div>
                    <div className="col d-grid gap-1">
                        <Button className={' text-center fs-14 rounded-0'}
                            variant="outline-green-300"
                            onClick={onClickViewDetailQuote}
                        >상세 견적 보기
                        </Button>

                    </div>
                </div>
                {
                    value.status === QuoteStatus.CANCEL.value &&
                    <div className={'d-grid gap-1 pt-2'}>
                        <Button className={'text-center fs-14 rounded-0'}
                            variant="outline-green-300"
                            onClick={onClickViewCancelReason}
                        >취소 사유 보기
                        </Button>
                    </div>
                }

            </div>
        </>
    )
}

export default ItemReceivedQuote
