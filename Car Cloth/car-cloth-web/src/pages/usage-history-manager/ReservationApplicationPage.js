import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../App";
import InputDatePicker from "../../components/datetimes/InputDatePicker";
import InputForm from "../../components/datetimes/InputForm";
import {useHistory, useLocation} from "react-router-dom";
import UsageHistoryService from "../../services/UsageHistoryService";
import {MAIN_PAGE_ROUTE} from "../../constants/RouteConstants";
import Format from "../../utils/Format";
import WrapperContent from "../../components/layouts/WrapperContent";
import CButtonPosition from "../../components/buttons/CButtonPosition";
import ErrorCommon from "../../components/popups/ErrorCommon";
import {SessionStorageManager} from "../../managers/SessionStorageManager";
import TimePickerPopup from "../../components/popups/TimePickerPopup";

const ReservationApplicationPage = () => {
    const {setCustomHeaderName} = useContext(AppContext);
    const {showInfoPopup, showNoticePopup} = useContext(AppContext);
    const state = SessionStorageManager.getMemberInfo()
    const [startDate, setStartDate] = useState(new Date());
    const idQuote = useLocation().state
    const history = useHistory()

    const [show, onShow] = useState(false)
    const [time, setTime] = useState(Format.datetime(startDate, 'HH:mm'))

    const onTimeSelected = (time) =>{
        const timehandle = Format.datetime(time, 'HH:mm')
        startDate.setHours(time.getHours())
        startDate.setMinutes(time.getMinutes())
        setStartDate(startDate)
        setTime(timehandle)
       
    }

    const onSubmit = () => {
        const date = Format.datetime(startDate, 'YYYY.MM.DD')
        const dataTime = date +' '+ time
        
        UsageHistoryService.applyReservation(idQuote, dataTime)
            .then((res) => {
                showInfoPopup(
                    "",
                    <div>
                        <div className={'fs-17 fw-medium lh-22'}>
                            예약 신청이 완료되었습니다!
                        </div>
                        <div>기존 예약 건 취소 후 예약 가능합니다.</div>
                    </div>
                    , () => {
                        history.push(MAIN_PAGE_ROUTE)
                    }
                )
            }).catch(e => ErrorCommon(showNoticePopup, e));
    }

    useEffect(() => {
        setCustomHeaderName('예약 신청')
        return (() => {
            setCustomHeaderName(null);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <WrapperContent hasHeader={true} className={'bg-blue-50-op-50 px-18 py-3'} content={
                <>
                    <div>
                        <InputForm
                            render={
                                <>
                                    <InputDatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                    />
                                   
                                    <input
                                        value={Format.datetime(startDate, 'HH:mm')}
                                        type="text"
                                        className="text-black-800 mt-2 p-12px form-control rounded-8px lh-21 border-black-700 fs-14"
                                        readOnly={true}
                                        onClick={()=>{onShow(!show)}}
                                    />

                                    <TimePickerPopup show={show} onShow={onShow} onTimeSelected={onTimeSelected} dateNow={startDate}/>
                                </>
                            }
                            label={'예약 일시'}
                        />
                        <InputForm readOnly={true} defaultValue={state?.name} label={'예약자'}/>
                        <InputForm readOnly={true} defaultValue={state?.phone} label={'연락처'}/>

                        <CButtonPosition disabled={startDate <= new Date()} text={'예약 신청'} onClick={onSubmit}/>
                    </div>

                </>
            }>

            </WrapperContent>
        </>
    )
}


export default ReservationApplicationPage
