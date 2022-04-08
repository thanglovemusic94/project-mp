import {Badge} from "react-bootstrap";
import {TRANSACTION_STATUS} from "../constants/TransactionStatus";
import {DropdownUpIcon} from "../assets/svgs/Icons";
import React, {useContext, useState} from "react";
import {
    Company__Reservation_Confirm,
    Company__Reservation_Constructing,
    Company_Reservation_Apply,
    ReservationApply_Confirm,
    ReservationCancel,
    ReservationDropdownStatus
} from "../constants/ReservationDropdownStatus";
import {AppContext} from "../App";
import {QuoteStatus} from "../constants/QuoteStatus";
import {RefreshContext} from "../context/refresh/RefreshProvider";
import UsageHistoryService from "../services/UsageHistoryService";
import QuotationService from "../services/QuotationService";
import ErrorCommon from "./popups/ErrorCommon";
import {useHistory} from "react-router-dom";
import {REFRESH} from "../context/refresh/RefreshAction";

const BadgeStatus = ({idQuote, status, bg, textColor, hasOutLine, hasIcon, hasShadow, fillIcon, onClick, isCompany}) => {
    const history = useHistory()
    const {dispatch} = useContext(RefreshContext);
    const {showInputPopup, showConfirmPopup, showSelectionPopup, showNoticePopup} = useContext(AppContext)
    const [selectStatus, setSelectStatus] = useState()
    const onClickChangeStatus = (status) => {
        const keys = Object.keys(status)
        const values = Object.values(status)
        showSelectionPopup(Object.values(status), (index) => {
            setSelectStatus({key: keys[index], value: values[index]})
            const keyStatus = keys[index]
            switch (keyStatus) {
                case ReservationDropdownStatus.CANCEL:
                    showInputPopup(
                        "예약 취소 하시겠습니까?\n" +
                        "취소 사유를 작성해 주세요.",
                        "최소 5글자 이상 작성해 주세요.",
                        (data) => {
                            if (isCompany) {
                                QuotationService.companyChangeStatusQuote(idQuote, {
                                    action: ReservationDropdownStatus.CANCEL,
                                    reason: data
                                }).then(() => {
                                    history.go(0)
                                }).catch(e => ErrorCommon(showNoticePopup, e));
                            } else {
                                UsageHistoryService.cancelReservation(idQuote, data).then(() => {
                                    dispatch(REFRESH)
                                }).catch(e => ErrorCommon(showNoticePopup, e));
                            }
                        }
                    )
                    break;
                case ReservationDropdownStatus.DELETE:
                    showConfirmPopup(
                        '',
                        <>
                            <div className={''}>
                                <div className={'fw-bold'}>
                                    삭제 하시겠습니까?
                                </div>
                                <div>
                                    삭제된 내역은 복구할 수 없습니다.
                                </div>
                            </div>
                        </>,
                        () => {
                            if (isCompany) {
                                QuotationService.companyChangeStatusQuote(idQuote, {
                                    action: ReservationDropdownStatus.DELETE,
                                    reason: null
                                }).then(() => {
                                    history.go(0)
                                }).catch(e => ErrorCommon(showNoticePopup, e));
                            } else {
                                UsageHistoryService.deleteReservation(idQuote).then(() => {
                                    dispatch(REFRESH)
                                }).catch(e => ErrorCommon(showNoticePopup, e));
                            }
                        }
                    )
                    break;
                case ReservationDropdownStatus.CONFIRM:
                    showConfirmPopup(
                        '',
                        <>
                            <div className={''}>
                                <div className={'fw-bold'}>
                                    예약 확정 하시겠습니까?
                                </div>
                            </div>
                        </>,
                        () => {
                            if (isCompany) {
                                QuotationService.companyChangeStatusQuote(idQuote, {
                                    action: ReservationDropdownStatus.CONFIRM,
                                    reason: null
                                }).then(() => {
                                    history.go(0)
                                }).catch(e => ErrorCommon(showNoticePopup, e));
                            }
                        }
                    )
                    break;
                case ReservationDropdownStatus.CONSTRUCTING:
                    showConfirmPopup(
                        '',
                        <>
                            <div className={''}>
                                <div className={'fw-bold'}>
                                    시공 중 상태로 변경 하시겠습니까?
                                </div>
                            </div>
                        </>,
                        () => {
                            if (isCompany) {
                                QuotationService.companyChangeStatusQuote(idQuote, {
                                    action: ReservationDropdownStatus.CONSTRUCTING,
                                    reason: null
                                }).then(() => {
                                    history.go(0)
                                }).catch(e => ErrorCommon(showNoticePopup, e));
                            }
                        }
                    )
                    break;
                case ReservationDropdownStatus.COMPLETE:
                    showConfirmPopup(
                        '',
                        <>
                            <div className={''}>
                                <div className={'fw-bold'}>
                                    시공 완료 상태로 변경 하시겠습니까?
                                </div>
                            </div>
                        </>,
                        () => {
                            if (isCompany) {
                                QuotationService.companyChangeStatusQuote(idQuote, {
                                    action: ReservationDropdownStatus.COMPLETE,
                                    reason: null
                                }).then(() => {
                                    history.go(0)
                                }).catch(e => ErrorCommon(showNoticePopup, e));
                            }
                        }
                    )
                    break;
                default:
                    break;
            }
        }, true)
    }


    switch (status) {
        //TRANSACTION
        case TRANSACTION_STATUS.RESERVATION.value: //blue
            return (
                <>
                    {
                        <Badge style={{'cursor': 'pointer'}} onClick={onClick} pill bg={'blue-500'}
                               className={'rounded-pill py-3px px-8px lh-13 fs-11 fw-500 border border-blue-500 button-shadow text-white'}
                        >
                            {TRANSACTION_STATUS.RESERVATION.label}
                        </Badge>
                    }
                </>
            )
        case TRANSACTION_STATUS.COMPARE.value: //outline black
            return (
                <>
                    {
                        <Badge style={{'cursor': 'pointer'}} onClick={onClick} pill bg={'white'}
                               className={'rounded-pill lh-13 fs-11 fw-500 border border-black-100   text-black-100 py-3px px-8px'}>
                            {TRANSACTION_STATUS.COMPARE.label}
                        </Badge>
                    }
                </>
            )
        // case QuoteStatus.COMPLETE.value: //black-300
        case TRANSACTION_STATUS.COMPLETE.value: //black-300
            return (
                <>
                    {

                        <Badge style={{'cursor': 'pointer'}} onClick={onClick} pill bg={'black-300'}
                               className={'rounded-pill lh-13 fs-11 fw-500 border border-black-300   text-white py-3px px-8px '}
                        >
                            {TRANSACTION_STATUS.COMPLETE.label}
                        </Badge>
                    }
                </>
            )

        // case TRANSACTION_STATUS.CONSTRUCTING.value://green
        case QuoteStatus.CONSTRUCTING.value: //outline-green-400
            return (
                <>
                    {
                        isCompany ?
                            <Badge pill bg={'white'}
                                   style={{'cursor': 'pointer'}}
                                   onClick={() => onClickChangeStatus(Company__Reservation_Constructing)}
                                   className={'rounded-pill lh-13 fs-11 fw-500 border border-green-400   text-green-400  py-3px px-8px'}>
                                {QuoteStatus.CONSTRUCTING.label}
                            </Badge>
                            :
                            <Badge pill bg={'white'}
                                   className={'rounded-pill lh-13 fs-11 fw-500 border border-green-400   text-green-400  py-3px px-8px'}>
                                {QuoteStatus.CONSTRUCTING.label}
                            </Badge>
                    }
                </>
            )

        //QUOTATION
        case QuoteStatus.APPLY.value: //outline-blue-500
            return (
                <Badge style={{'cursor': 'pointer'}}
                       onClick={() => onClickChangeStatus(isCompany ? Company_Reservation_Apply : ReservationApply_Confirm)}
                       pill
                       bg={'white'}
                       className={`d-inline-flex align-items-center rounded-pill py-3px px-8px lh-13 fs-11 fw-500 border border-blue-500 text-blue-500`}
                >
                    <span
                        className={'pe-5px'}>{QuoteStatus.APPLY.label}</span>
                    <DropdownUpIcon fill={'#004FC6'}/>
                </Badge>
            )
        case QuoteStatus.CONFIRM.value: //-blue-500
            return (
                <Badge style={{'cursor': 'pointer'}}
                       onClick={() => onClickChangeStatus(isCompany ? Company__Reservation_Confirm : ReservationApply_Confirm)}
                       pill
                       bg={'blue-500'}
                       className={`d-inline-flex align-items-center rounded-pill py-3px px-8px lh-13 fs-11 fw-500 border border-blue-500 `}
                >
                    <span
                        className={'pe-5px'}>{QuoteStatus.CONFIRM.label}</span>
                    <DropdownUpIcon fill={'#FFFFFF'}/>
                </Badge>
            )
        case QuoteStatus.CANCEL.value: //outline-red
            return (
                <Badge style={{'cursor': 'pointer'}} onClick={() => onClickChangeStatus(ReservationCancel)} pill
                       bg={'white'}
                       className={`d-inline-flex align-items-center rounded-pill py-3px px-8px lh-13 fs-11 fw-500 border border-red text-red`}
                >
                    <span
                        className={'pe-5px'}>{QuoteStatus.CANCEL.label}</span>
                    <DropdownUpIcon fill={'#FF3347'}/>
                </Badge>
            )

        case QuoteStatus.REQUESTED.value:
        case QuoteStatus.DELIVERED.value://outline-black-800
            return (
                <Badge pill bg={'white'}
                       className={'rounded-pill lh-13 fs-11 fw-500 border border-black-800   text-black-800 py-3px px-8px'}>
                    {QuoteStatus.REQUESTED.label}
                </Badge>
            )
        default:
            return (
                <>
                    {hasOutLine === false ?
                        <Badge style={{'cursor': 'pointer'}} onClick={onClickChangeStatus} pill bg={bg}
                               className={`rounded-pill py-3px px-8px lh-13 fs-11 fw-500 border border-${bg} button-shadow text-white`}
                        >
                            <span>{selectStatus?.value ?? status}</span>
                            {hasIcon &&
                            <DropdownUpIcon fill={fillIcon}/>
                            }
                        </Badge>
                        :
                        <Badge style={{'cursor': 'pointer'}} onClick={onClickChangeStatus} pill bg={'white'}
                               className={`d-inline-flex align-items-center rounded-pill py-3px px-8px lh-13 fs-11 fw-500 border border-${textColor} ${hasShadow ? 'button-shadow' : ''} text-${textColor}`}
                        >
                            <span className={'pe-5px'}>{selectStatus?.value ?? status}</span>
                            {hasIcon &&
                            <DropdownUpIcon fill={fillIcon}/>
                            }
                        </Badge>
                    }
                </>
            )
    }
}

export default BadgeStatus
