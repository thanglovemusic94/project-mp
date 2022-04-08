import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { USAGE_HISTORY_ROUTER } from "../../../constants/RouteConstants";
import BadgeStatus from "../../BadgeStatus";
import { TRANSACTION_STATUS } from "../../../constants/TransactionStatus";
import Format from "../../../utils/Format";
import { ConstructionStatus } from "../../../constants/ConstructionStatus";


const ItemUsageHistory = ({ item, checkItemEnd }) => {
    const history = useHistory();

    const onClickRequestQuoteDetail = () => {
        history.push({ pathname: USAGE_HISTORY_ROUTER.DETAIL, state: item })
    }

    const onClickReceivedQuote = (value) => {
        history.push({ pathname: USAGE_HISTORY_ROUTER.DETAIL_RECEIVED_QUOTE, state: value })
    }

    const checkTypeDate = (type) => {
        switch (type) {
            case TRANSACTION_STATUS.RESERVATION.value:
            case TRANSACTION_STATUS.CONSTRUCTING.value:
                return '예약일시'
            case TRANSACTION_STATUS.COMPLETE.value:
                return '시공완료일시'
            case TRANSACTION_STATUS.COMPARE.value:
                return '시공 희망일'
            default:
                return ''
        }
    }

    return (
        <div className={`p-12px bg-white ${checkItemEnd ? `` : `mb-12px`}`}>
            <div>
                <div className={'d-flex justify-content-between align-items-center'}>
                    <span className={'fs-17 fw-bold'}>{ConstructionStatus[item.type]}</span>
                    <BadgeStatus status={item.status} />
                </div>
                <span className={'text-black-100 fs-14 fw-normal '}>{checkTypeDate(item.status)} : {Format.datetime(item.desiredDate, 'YYYY.MM.DD')}</span>
                <div className="row row-cols-2 gx-2 mt-3">
                    <div className="col-6 d-grid gap-1">
                        <Button onClick={onClickRequestQuoteDetail} className={'text-white text-center fs-14 rounded-0'} variant="green-300" >요청 견적 상세</Button>
                    </div>
                    <div className="col-6 d-grid gap-1 align-items-center">
                        <Button className={'text-center fs-14'} variant="outline-green-300"
                                onClick={() => onClickReceivedQuote(item)}
                        >
                            <span>받은 견적 상세</span>
                            {/*{item.status === TRANSACTION_STATUS.COMPARE.value*/}
                            {/*&&*/}
                            {/*<IconCircle nameIcon={'new'} />*/}
                            {/*}*/}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemUsageHistory
