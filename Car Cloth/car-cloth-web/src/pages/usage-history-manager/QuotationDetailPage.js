import { useHistory, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Format from "../../utils/Format";
import UsageHistoryService from "../../services/UsageHistoryService";
import { AppContext } from "../../App";
import ReviewContent from "../../components/pages/usage-history/quotation-detail/ReviewContent";
import ReviewService from "../../services/ReviewService";
import { CHATTING, USAGE_HISTORY_ROUTER } from "../../constants/RouteConstants";
import WrapperContent from "../../components/layouts/WrapperContent";
import CButtonPosition from "../../components/buttons/CButtonPosition";
import StaticKakaoMap from "../../components/StaticKakaoMap";

import { QuotationAction } from "../../context/quotation/QuotationAction";
import { QuotationContext } from "../../context/quotation/QuotationProvider";
import ErrorCommon from "../../components/popups/ErrorCommon";
import { SessionStorageManager } from "../../managers/SessionStorageManager";
import { useCheckNewMess } from "../../utils/FireBaseUtils";
import IconCircle from "../../components/IconCircle";


const QuotationDetailPage = () => {
    const history = useHistory();
    const { dispatch } = useContext(QuotationContext);
    const { showInfoPopup, showNoticePopup } = useContext(AppContext);
    const itemReceivedQuote = useLocation().state;
    const [data, setData] = useState();
    const [dataReviewExit, setDataReviewExit] = useState();
    const [showReview, setShowReview] = useState(false);

    const memberInfo = SessionStorageManager.getMemberInfo()
    const checkNewMess = useCheckNewMess(itemReceivedQuote.id.toString(), memberInfo?.memberId);

    const onClickShowReview = () => {

        history.push({
            pathname: USAGE_HISTORY_ROUTER.REGISTER_REVIEW,
            state: {
                itemReceivedQuote: itemReceivedQuote,
                dataReviewExit: dataReviewExit,
            },
        });
    };

    const onClickEditReview = () => {
        history.push({
            pathname: USAGE_HISTORY_ROUTER.EDIT_REVIEW,
            state: {
                itemReceivedQuote: itemReceivedQuote,
                dataReviewExit: dataReviewExit,
            },
        });
    };

    const onClickChatConsultation = () => {
        history.push({ pathname: CHATTING, state: { channelId: itemReceivedQuote.id.toString() } })
    };

    const onClickViewReservationHistory = () => {
        history.push({
            pathname: USAGE_HISTORY_ROUTER.RESERVATION_HISTORY,
            state: itemReceivedQuote.id,
        });
    };

    const onCheckApplication = () => {
        UsageHistoryService.checkApplyReservation(itemReceivedQuote.id)
            .then(
                (res) => {
                    if (res.data === true) {
                        history.push({
                            pathname: USAGE_HISTORY_ROUTER.RESERVATION_APPLICATION,
                            state: itemReceivedQuote.id,
                        });
                    } else {
                        showInfoPopup(
                            "",
                            <div>
                                <div className={'fs-17 fw-medium lh-22'}>
                                    다른 업체에 예약하였습니다.
                                </div>
                                <div>기존 예약 건 취소 후 예약 가능합니다.</div>
                            </div>
                        )
                    }
                }
            )
            .catch(e => ErrorCommon(showNoticePopup, e));

    };

    const onClickViewCancelReason = () => {
        UsageHistoryService.geInfoReservationHistory(itemReceivedQuote.id)
            .then(
                (res) => {
                    const reason = res.data.reason;
                    showInfoPopup(
                        "",
                        <div>
                            <div className={'fs-17 fw-medium lh-22'}>
                                취소 사유
                            </div>
                            <div>{reason}</div>
                        </div>
                    )
                }
            )
            .catch(e => ErrorCommon(showNoticePopup, e));
    };

    useEffect(() => {
        const loadData = async () => {
            const quotationDetail = await UsageHistoryService.getQuotationDetail(itemReceivedQuote.id);

            try {
                setData(quotationDetail.data);
                dispatch({ type: QuotationAction.SET_QUOTATION, payload: quotationDetail.data.company.id });
            } catch (err) {
                ErrorCommon(showNoticePopup, err);
            }

            const quotationReview = await ReviewService.getExistedReview(itemReceivedQuote.id);

            try {

                if (quotationReview.status === 200) {
                    setDataReviewExit(quotationReview.data);
                    setShowReview(true);
                }
            } catch (err) {

                if (err.response.status === 404) {
                    // Do nothing
                } else {
                    return ErrorCommon(showNoticePopup, err);
                }
            }
        }

        loadData();

        // eslint-disable-next-line
    }, [itemReceivedQuote.id]);

    return (
        <>
            <WrapperContent
                content={
                    <>
                        {data && (
                            <>
                                <div className="row">
                                    <div
                                        className={
                                            "bg-black-50 d-flex justify-content-center align-items-center mb-3 p-0"
                                        }
                                        style={{ height: "211px" }}
                                    >
                                        <StaticKakaoMap
                                            className="w-100 h-100"
                                            lat={data.company.address?.lat}
                                            lng={data.company.address?.lon}
                                            onMarket={true}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className={"fs-20 fw-bold"}>{data.company.companyName}</div>
                                    <hr className={"mb-2 mt-12px"} />

                                    <div
                                        className={
                                            "d-flex justify-content-between align-items-center  text-black-600 fs-12 mb-2px"
                                        }
                                    >
                                        <span className={'fs-12'}>보험 수리</span>
                                        <span>VAT 포함</span>
                                    </div>

                                    <div className={"ps-4"}>
                                        <div
                                            className={
                                                "d-flex justify-content-between align-items-center text-black-900"
                                            }
                                        >
                                            <span className={"fs-12 fw-medium"}>총 시공 비용</span>
                                            <span className={"fs-14 fw-medium"}>
                                                {Format.money(data.constructionFee)}
                                            </span>
                                        </div>
                                        <div
                                            className={
                                                "d-flex justify-content-between align-items-center"
                                            }
                                        >
                                            <span className={"fs-12"}>결제 금액</span>
                                            <span className={"fw-bold text-blue-500"}>
                                                {Format.money(data.paymentAmount)}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            "d-flex justify-content-between align-items-center py-12px px-2 bg-blue-50-op-30 rounded-2 mt-2"
                                        }
                                    >
                                        <span className={"fs-13 fw-medium"}>예상 시공 시간</span>
                                        <span className={"fs-14"}>
                                            {data.estConstructionPeriod}
                                        </span>
                                    </div>

                                   
                                    <div
                                        className={
                                            `py-10px px-12px w-100 rounded-8px ${data.notes ? 'my-14px border border-black-700 text-black-800' : ''} fs-14`
                                        }
                                    >
                                        {data.notes}
                                    </div>

                                    <div className={"row gx-2"}>
                                        <div className="col d-grid gap-1">
                                            <Button
                                                className={"text-white text-center fs-14 rounded-0"}
                                                variant="green-300"
                                                onClick={onClickChatConsultation}
                                            >
                                                <span>채팅 상담</span>
                                                {
                                                    checkNewMess && <IconCircle nameIcon={'new'} />
                                                }
                                            </Button>
                                        </div>
                                        <div className="col d-grid gap-1">
                                            {["DELIVERED", "REQUESTED"].indexOf(data.status) !==
                                                -1 && (
                                                    <Button
                                                        className={" text-center fs-14 rounded-0"}
                                                        variant="outline-green-300"
                                                        onClick={onCheckApplication}
                                                    >
                                                        예약 신청
                                                    </Button>
                                                )}

                                            {["APPLY", "CONFIRM", "CONSTRUCTING", "COMPLETE"].indexOf(
                                                data.status
                                            ) !== -1 && (
                                                    <Button
                                                        className={" text-center fs-14 rounded-0"}
                                                        variant="outline-green-300"
                                                        onClick={onClickViewReservationHistory}
                                                    >
                                                        예약 내역
                                                    </Button>
                                                )}

                                            {data.status === "CANCEL" && (
                                                <Button
                                                    className={" text-center fs-14 rounded-0"}
                                                    variant="outline-green-300"
                                                    onClick={onClickViewCancelReason}
                                                >
                                                    취소 사유 보기
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {showReview ? (
                                    dataReviewExit && (
                                        <div>
                                            <hr className={"mt-4 mb-14px"} />
                                            <div className={"font-gmarket fs-17 fw-bold mb-2"}>
                                                내 후기
                                            </div>
                                            <ReviewContent
                                                dataReview={dataReviewExit}
                                                onClickEditReview={onClickEditReview}
                                            />
                                        </div>
                                    )
                                ) : (
                                    <CButtonPosition
                                        text={"후기 등록"}
                                        onClick={onClickShowReview}
                                    />
                                )}
                            </>
                        )}
                    </>
                }
            />
        </>
    )
};

export default QuotationDetailPage;
