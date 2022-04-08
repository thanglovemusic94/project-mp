import {useHistory} from "react-router-dom";
import {CHATTING, COMPANY} from "../../../constants/RouteConstants";
import {ConstructionStatus} from "../../../constants/ConstructionStatus";
import Format from "../../../utils/Format";
import {Button} from "react-bootstrap";
import IconCircle from "../../IconCircle";
import {useContext} from "react";
import {AppContext} from "../../../App";
import UsageHistoryService from "../../../services/UsageHistoryService";
import BadgeStatus from "../../BadgeStatus";
import {QuoteStatus} from "../../../constants/QuoteStatus";
import { SessionStorageManager } from "../../../managers/SessionStorageManager";
import { useCheckNewMess } from "../../../utils/FireBaseUtils";

const ItemReserVationConstruction = ({item, checkItemEnd}) => {
    const {showInfoPopup} = useContext(AppContext)
    const history = useHistory()

    const memberInfo = SessionStorageManager.getMemberInfo();
    const checkNewMess = useCheckNewMess(item.id.toString(), memberInfo?.memberId);

    const onMoveDeliveredQuoteDetail = () => {
        history.push({pathname: COMPANY.DELIVERED_QUOTE_DETAIL, state: item})
    }

    const onMoveRequestedQuoteDetail = () => {
        history.push({pathname: COMPANY.REQUESTED_QUOTE_DETAIL, state: item})
    }

    const onClickViewCancelReason = () => {
        UsageHistoryService.geInfoReservationHistory(item.id).then(res => {
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

    const onClickChatConsultation = () => {
        history.push({pathname: CHATTING, state: {channelId: item.id.toString()}})
    };

    return (
        <div className={`py-14px px-12px bg-white ${checkItemEnd ? '' : 'mb-12px'}`}>
            <div className={'d-flex justify-content-between align-items-center'}>
                <span className={'fs-17 fw-bold'}>{ConstructionStatus[item.type]}</span>
                <span>
                    <BadgeStatus
                        idQuote={item.id}
                        status={item.status}
                        isCompany={true}
                    />
                </span>
            </div>
            <div className={'fs-14 pt-2'}>{item.brand + " " + item.model} <span
                className={'text-black-400'}>{item.carType}</span></div>
            <div className={'text-black-600 fs-13 d-flex align-items-center'}><span>예약일시</span>
                <span className={'d-inline-block bg-black-400 mx-6px'} style={{width: "0.5px", height: "8px"}}></span>
                <span>{item.reservationDate ? Format.datetime(item.reservationDate, "YYYY.MM.DD HH:mm") : ''}</span>
            </div>
            <div className="row row-cols-2 g-2 pt-2">
                <div className="d-grid gap-1">
                    <Button
                        onClick={onMoveRequestedQuoteDetail}
                        className={'text-white text-center fs-14 lh-21 rounded-0'} variant="green-300">요정 견적 상세</Button>
                </div>
                <div className="d-grid gap-1">
                    <Button
                        onClick={onMoveDeliveredQuoteDetail}
                        className={' text-center fs-14 lh-21 rounded-0'} variant="outline-green-300">전달 견적 상세</Button>
                </div>
            </div>
            {
                item.status  !== QuoteStatus.CANCEL.value &&
                <div className="col d-grid gap-1 align-items-center pt-2">
                    <Button className={'text-center fs-14 lh-21 rounded-0'} variant="outline-green-300"
                            onClick={onClickChatConsultation}
                    >
                        <span>채팅 상담</span>
                        {
                            checkNewMess && <IconCircle nameIcon={'new'} />
                        }
                    </Button>
                </div>
            }

            {
                item.status  === QuoteStatus.CANCEL.value &&
                <div className={'d-grid gap-1 pt-2'}>
                    <Button className={'text-center fs-14 rounded-0'}
                            variant="outline-blue-500"
                            onClick={onClickViewCancelReason}
                    >취소 사유 보기
                    </Button>
                </div>
            }
        </div>
    )
}

export default ItemReserVationConstruction
