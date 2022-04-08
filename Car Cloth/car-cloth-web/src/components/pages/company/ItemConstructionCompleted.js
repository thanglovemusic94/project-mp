import {useHistory} from "react-router-dom";
import {CHATTING, COMPANY, CONSTRUCTION_ROUTER} from "../../../constants/RouteConstants";
import {ConstructionStatus} from "../../../constants/ConstructionStatus";
import BadgeStatus from "../../BadgeStatus";
import Format from "../../../utils/Format";
import {Button} from "react-bootstrap";


const ItemConstructionCompleted = ({item, checkItemEnd}) => {
    const history = useHistory()
    const onMoveDeliveredQuoteDetail = () => {
        history.push({pathname: COMPANY.DELIVERED_QUOTE_DETAIL, state: item})
    }

    const onMoveRequestedQuoteDetail = () => {
        history.push({pathname: COMPANY.REQUESTED_QUOTE_DETAIL, state: item})
    }

    const handleConstructionExampleButton = () =>{

        if (item['conExample'] === null) {
            history.push({pathname: CONSTRUCTION_ROUTER.CONSTRUCTION_REGISTER, state: item})
        } else {
            history.push({pathname: CONSTRUCTION_ROUTER.CONSTRUCTION_DETAIL, state: item['conExample']})
        }
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
                    />
                </span>
            </div>
            <div className={'fs-14 pt-2'}>{item.brand + " " + item.model} <span
                className={'text-black-400'}>{item.carType}</span></div>
            <div className={'text-black-600 fs-13 d-flex align-items-center'}><span>예약일시</span>
                <span className={'d-inline-block bg-black-400 mx-6px'} style={{width: "0.5px", height: "8px"}}></span>
                <span>{item.completeDate ? Format.datetime(item.completeDate, "YYYY.MM.DD", true) : ''}</span>
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


                <div className="row row-cols-2 g-2 pt-2">
                    <div className="col d-grid gap-1 align-items-center ">
                        <Button className={'text-center fs-14 lh-21 rounded-0'} variant="outline-green-300"
                                onClick={onClickChatConsultation}
                        >
                            <span>채팅 상담</span>
                        </Button>
                    </div>
                    <div className="d-grid gap-1">
                        <Button
                            onClick={handleConstructionExampleButton}
                            className={'text-white text-center fs-14 lh-21 rounded-0'} 
                            variant="green-300"
                        >
                            { item['conExample'] === null ? '시공 사례 등록' : '시공 사례 상세' }
                        </Button>
                    </div>
                    {/*<div className="d-grid gap-1">*/}
                    {/*    <Button*/}
                    {/*        onClick={onRegisterConstructionExample}*/}
                    {/*
                    {/*    /!*className={'text-white  text-center fs-14 lh-21 rounded-0'} variant="green-300">시공 사례 상세</Button>*!/*/}
                    {/*</div>*/}
                </div>
            }


        </div>
    )
}

export default ItemConstructionCompleted
