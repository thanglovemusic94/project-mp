import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../App";
import CarPartSelector from "../../components/car-parts/CarPartSelector";
import WrapperContent from "../../components/layouts/WrapperContent";
import ErrorCommon from "../../components/popups/ErrorCommon";
import SliderImage from "../../components/SliderImage";
import { CarPartControllerLayout } from "../../constants/CarPartControllerLayout";
import { ConstructionStatus } from "../../constants/ConstructionStatus";
import { InsuranceStatus } from "../../constants/InsuranceStatus";
import UsageHistoryService from "../../services/UsageHistoryService";
import CarPartParamsUtils from "../../utils/CarPartParamsUtils";


const UsageRequestQuoteDetailPage = () => {
    const quoteDetail = useLocation().state;
    const { showNoticePopup } = useContext(AppContext);
    const [dataRequest, setDataRequest] = useState();
    const [selectedParts, setSelectedParts] = useState([]);

    useEffect(() => {
        if (quoteDetail) {
            UsageHistoryService.getTransactionById(quoteDetail.id).then(res => {
                const { address, attachImages, carInfo, desiredDate, otherRequest, type, insurance, ...carParts } = res.data;

                let selectedCarParts = [];
                Object.entries(carParts).forEach(item => {

                    if (item[1] === true)
                        selectedCarParts.push(item[0]);
                });

                setSelectedParts(CarPartParamsUtils.getCarPartByFieldName(selectedCarParts));
                setDataRequest(res.data)
            }).catch(e => ErrorCommon(showNoticePopup, e));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [show, setShow] = useState(false);

    return (
        <WrapperContent
            className={'bg-blue-50'}
            hasFooter={false}
            content={
                <>
                    <div className={'bg-white py-18px px-12px box-shadow'}>
                        <div>
                            <span className={'fw-bold fs-15'}>차 정보</span>
                            {/*<div className={'d-block fw-normal fs-14'}>*/}
                            {/*    <span>기아 K5 2세대</span>*/}
                            {/*    <span className={'text-black-300 fs-13'}> 15~19년</span>*/}
                            {/*</div>*/}
                            <div className={'fs-14'}>{dataRequest?.carInfo}</div>
                        </div>
                        <div className={'pt-20px'}>
                            <span className={'fw-bold fs-15'}>원하는 시공</span>
                            <div className={'d-block fw-normal fs-14'}>
                                <span>{ConstructionStatus[dataRequest?.type]}</span>
                            </div>
                        </div>
                        <div className={'pt-20px'}>
                            <span className={'fw-bold fs-15'}>원하는 시공 날짜</span>
                            <div className={'d-block fw-normal fs-14'}>
                                <span>{dataRequest?.desiredDate}</span>
                            </div>
                        </div>
                        <div className={'pt-20px'}>
                            <span className={'fw-bold fs-15'}>보험 유/무</span>
                            <div className={'d-block fw-normal fs-14'}>
                                <span>{dataRequest?.insurance ? InsuranceStatus.insurance : InsuranceStatus.Uninsurance}</span>
                            </div>
                        </div>
                        <div className={'pt-20px'}>
                            <span className={'fw-bold fs-15'}>기타 요청사항</span>
                            <div className={'d-block fw-normal fs-14'}>
                                <span>
                                    {dataRequest?.otherRequest}
                                </span>
                            </div>
                        </div>
                        <div className={'pt-3'}>
                            {
                                dataRequest?.attachImages && <SliderImage listImage={dataRequest?.attachImages} show={show} setShow={setShow} />
                            }
                        </div>
                    </div>
                    <div className={'py-3 px-12px'}>
                        <div className={'fw-bold fs-15 fw700'}>원하는 시공</div>
                    </div>
                    <CarPartSelector
                        layout={CarPartControllerLayout[quoteDetail?.type]}
                        parts={selectedParts} />
                </>
            }
        />
    )
}

export default UsageRequestQuoteDetailPage
