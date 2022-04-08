import {Button} from "react-bootstrap";
import {ConstructionStatus} from "../../../constants/ConstructionStatus";
import Format from "../../../utils/Format";
import {useHistory} from "react-router-dom";
import {COMPANY} from "../../../constants/RouteConstants";

const ItemRequestQuotes = ({item, checkItemEnd}) =>{
    const history = useHistory()
    const onClickReceivedQuote = (value) => {
        history.push({pathname: COMPANY.REQUESTED_QUOTE_DETAIL, state: value})
    }
    return (
        <div className={`pt-14px pb-3 px-12px bg-white ${checkItemEnd ? '': 'mb-12px'}`}>
            <div className={'fs-17 fw-bold'}>{ConstructionStatus[item.type]}</div>
            <div className={'fs-14 pt-2'}>{item.brand +" "+ item.model} <span className={'text-black-400'}>{item.carType}</span> </div>
            <div className={'text-black-600 fs-13 d-flex align-items-center'}><span>시공 희망일</span>
                {item.desiredDate ?
                    <div>
                        <span className={'d-inline-block bg-black-400 mx-6px'} style={{width: "0.5px", height: "8px"}}></span>
                        <span>{item.desiredDate ? Format.datetime(item.desiredDate, "YYYY.MM.DD") : ''}</span>
                    </div>
                    :
                    ''
                }


            </div>
            <div className="col d-grid gap-1 align-items-center pt-2">
                <Button className={'text-center text-white fs-14 lh-21 rounded-0'} variant="green-300"
                        onClick={()=>onClickReceivedQuote(item)}
                >
                    <span>상세 정보</span>
                </Button>
            </div>
        </div>
    )
}

export default ItemRequestQuotes
