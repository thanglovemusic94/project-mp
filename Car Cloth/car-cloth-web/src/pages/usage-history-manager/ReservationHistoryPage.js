import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../App";
import {useHistory, useLocation} from "react-router-dom";
import UsageHistoryService from "../../services/UsageHistoryService";
import Format from "../../utils/Format";
import CButtonPosition from "../../components/buttons/CButtonPosition";
import WrapperContent from "../../components/layouts/WrapperContent";
import ErrorCommon from "../../components/popups/ErrorCommon";
import {SessionStorageManager} from "../../managers/SessionStorageManager";

const ReservationHistoryPage = () => {
    const {setCustomHeaderName} = useContext(AppContext);
    const {showInputPopup, showNoticePopup} = useContext(AppContext);
    const state = SessionStorageManager.getMemberInfo()
    const idQuote = useLocation().state
    const history = useHistory()
    const [dataDetail, setDataDetail] = useState()

    const onSubmit = () => {
        showInputPopup(
            "예약 취소 하시겠습니까?\n" +
            "취소 사유를 작성해 주세요.",
            "최소 5글자 이상 작성해 주세요.",
            (data) => {
                UsageHistoryService.cancelReservation(idQuote, data).then(() => {
                    history.go(-1)
                }).catch(e => ErrorCommon(showNoticePopup, e));
            }
        )
    }

    useEffect(() => {
        setCustomHeaderName('예약 내역')
        UsageHistoryService.geInfoReservationHistory(idQuote).then(res => {
            setDataDetail(res.data)
        }).catch(e => ErrorCommon(showNoticePopup, e));
        return (() => {
            setCustomHeaderName(null);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <WrapperContent className={`bg-blue-50 `} content={
            <>
                <div className={'bg-white py-18px px-12px box-shadow'}>
                    <div className={'pb-20px'}>
                        <div className={'fs-15 fw-bold pb-1'}>예약일시</div>
                        <div
                            className={'fs-14'}>{dataDetail && Format.datetime(dataDetail.reservationDate, 'YYYY-MM-DD HH:MM')}</div>
                    </div>
                    <div className={'pb-20px'}>
                        <div className={'fs-15 fw-bold pb-1'}>예약자</div>
                        <div className={'fs-14'}>{state?.name}</div>
                    </div>
                    <div>
                        <div className={'fs-15 fw-bold pb-1'}>연락처</div>
                        <div className={'fs-14'}>{state?.phone}</div>
                    </div>
                </div>

                <CButtonPosition
                    text={'예약 취소'}
                    onClick={onSubmit}
                    left={"18px"}
                    right={"18px"}/>
            </>
        }/>
    )
}

export default ReservationHistoryPage
