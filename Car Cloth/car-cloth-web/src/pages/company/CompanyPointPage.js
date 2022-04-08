import {useContext, useEffect, useState} from "react";
import {Button, Toast} from "react-bootstrap";
import {AppContext} from "../../App";
import CompanyPointService from "../../services/CompanyPointService";
import Format from "../../utils/Format";
import {useHistory} from "react-router-dom";
import {COMPANY} from "../../constants/RouteConstants";
import ErrorCommon from "../../components/popups/ErrorCommon";

const CompanyPointPage = () => {

    const history = useHistory();
    const { setCustomHeaderName, showConfirmPopup, showNoticePopup } =
        useContext(AppContext);
    const [companyUsage, setCompanyUsage] = useState({
        point: 0,
        autoExtend: true,
    });
    const [autoExtend, setAutoExtend] = useState(true);
    const [showToast, setShowToast] = useState(false);

    const releaseAutoExtend = () => {
        CompanyPointService.realeaseAutoExtend().then((res) => {
            if (res.status === 200) {
                setAutoExtend(false);
                setShowToast(!showToast);
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));
    };

    const restoreAutoExtend = () => {
        CompanyPointService.restoreAutoExtend()
            .then((res) => {
                if (res.status === 200) {
                    setAutoExtend(true);
                    setShowToast(!showToast);
                }
            })
            .catch(e => ErrorCommon(showNoticePopup, e));
    };

    const handlePurchasePoint = () => {
        history.push(COMPANY.POINT_PURCHASE)
    };

    const handleAutoExtension = () => {
        showConfirmPopup(
            null,
            <>
                <div className="fs-17 fw-medium text-center">
                    <div>자동 연장을</div>
                    <div>해지 하시겠습니까?</div>
                </div>
            </>,
            releaseAutoExtend
        );
    };

    useEffect(() => {
        setCustomHeaderName("포인트&업체 이용 안내");
        CompanyPointService.getHoldingPoints()
            .then((res) => {
                if (res.status === 200) {
                    setCompanyUsage(res.data);
                }
            })
            .catch(e => ErrorCommon(showNoticePopup, e));

        return (() => {
            setCustomHeaderName(null);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoExtend]);

    return (
        <>
            <CompanyPoint />
        </>
    );

    function CompanyPoint() {
        return <div className="companypoint-page">
            <div className="cc-body row flex-column vh-100 bg-blue-50-op-30">
                <div className="flex-grow-1">
                    <div className="bg-white cc-shadow my-3 p-12px">
                        <div className="text-center border-bottom pt-3 pb-32px">
                            <p className="fs-14 mb-0">보유 포인트</p>
                            <div className="text-blue-500 fw-bold mb-40px">
                                <span className="fs-30">
                                    {Format.number(companyUsage.point)}
                                </span>
                                <span className="fs-25">P</span>
                            </div>
                            {/* <CButtonPosition text={"포인트 구매"} disabledPosition={true} /> */}
                            <Button
                                variant="blue-500"
                                className="font-gmarket fw-bold fs-15 py-15px w-100 lh-1"
                                onClick={handlePurchasePoint}
                            >
                                포인트 구매
                            </Button>
                        </div>
                        <div className="py-3">
                            <div className="fw-bold fs-15 text-black-900">
                                남은 이용기간
                            </div>
                            <div className="text-black-800 fs-14">
                                <div>
                                    {`${companyUsage.expiredDateTime ? Format.datetime(companyUsage.expiredDateTime, "YYYY.MM.DD HH:MM", true) : ""}`} 
                                    {' 이용 가능'}
                                </div>
                                <div>
                                    {
                                        autoExtend
                                            ? companyUsage.autoExtendTime 
                                                ? "자동 연장일: " + Format.datetime(companyUsage.autoExtendTime, "YYYY.MM.DD HH:MM", true)
                                                : ""
                                            : "자동 연장 해지 신청"
                                    }
                                </div>
                            </div>
                        </div>
                        {!autoExtend && (
                            // <div style={{ marginTop: "32px" }}>
                            //     <CButtonPosition
                            //         variant={"outline-blue-500"}
                            //         text={"자동 연장 해지 신청 취소"}
                            //         onClick={() => restoreAutoExtend()}
                            //         disabledPosition={true}
                            //     />
                            // </div>
                            <div className="mt-3 mb-2">
                                <Button
                                    variant="outline-blue-500"
                                    className="font-gmarket fw-bold fs-15 py-15px w-100 lh-1"
                                    onClick={() => restoreAutoExtend()}
                                >
                                    자동 연장 해지 신청 취소
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="pb-4">
                    <div className="border-top pt-28px">
                        <ul className="fs-12 text-black-700 fw-light mb-1">
                            <li>자동 연장을 해지하더라도 만료일까지 이용 가능합니다.</li>
                            <li>
                                자동 연장일 이전에 해지 신청 시 포인트가 차감되지 않습니다.
                            </li>
                            <li>자동 연장 해지 신청은 아래 링크에서 가능합니다.</li>
                        </ul>
                    </div>
                    <div className="mt-1 ps-32px" onClick={handleAutoExtension}>
                        <span
                            className={
                                "fs-14 fw-medium text-blue-500 border-bottom border-blue-500"
                            }
                        >
                            자동 연장 해지
                        </span>
                    </div>
                </div>
                <Toast
                    className="position-fixed start-50 translate-middle-x rounded-pill text-center text-green-400 w-75 mx-auto shadow-sm bg-white"
                    style={{ bottom: "80px" }}
                    onClose={() => setShowToast(!showToast)}
                    show={showToast}
                    delay={2000}
                    autohide
                >
                    <Toast.Body className="fs-14 py-6px">
                        {autoExtend
                            ? "자동 연장 해지 신청 완료"
                            : "자동 연장 해지 신청 취소 완료"}
                    </Toast.Body>
                </Toast>
            </div>
        </div>
    }
};

export default CompanyPointPage;
