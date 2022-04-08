import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../../App";
import CButtonPosition from "../../components/buttons/CButtonPosition";
import CarPartSelector from "../../components/car-parts/CarPartSelector";
import WrapperContent from "../../components/layouts/WrapperContent";
import ErrorCommon from "../../components/popups/ErrorCommon";
import SliderImage from "../../components/SliderImage";
import { CarPartControllerLayout } from "../../constants/CarPartControllerLayout";
import { ConstructionStatus } from "../../constants/ConstructionStatus";
import { InsuranceStatus } from "../../constants/InsuranceStatus";
import { COMPANY } from "../../constants/RouteConstants";
import { SessionStorageManager } from "../../managers/SessionStorageManager";
import QuotationService from "../../services/QuotationService";
import CarPartParamsUtils from "../../utils/CarPartParamsUtils";

const RequestQuoteDetailPage = () => {
    const history = useHistory();
    const quoteDetail = useLocation().state;

    const { setCustomHeaderName, showNoticePopup } = useContext(AppContext);

    const useInfo = SessionStorageManager.getMemberInfo()

    const [dataRequest, setDataRequest] = useState();
    const [selectedParts, setSelectedParts] = useState([]);

    const [selectedImage, setSelectedImage] = useState(-1);
    const [showImageDetailPopup, setShowImageDetailPopup] = useState(false);

    const onCreateQuote = () => {
        if (useInfo.isCompany) {
            history.push({ pathname: COMPANY.CREATE_QUOTE, state: quoteDetail })
        }
    }

    function handleImageViewDetail(index) {
        setSelectedImage(index);
        setShowImageDetailPopup(true);
    }

    useEffect(() => {
        if (showImageDetailPopup === false) {
            setSelectedImage(-1);
        }
    }, [showImageDetailPopup]);

    useEffect(() => {
        if (useInfo.isCompany) {
            setCustomHeaderName('요청 받은 견적서 상세')
        }
        if (quoteDetail) {
            QuotationService.getRequestQuoteDetail(quoteDetail.id).then(res => {
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

        return (() => {
            setCustomHeaderName(null);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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
                            <div className="row row-cols-4 gx-6px">
                                {
                                    dataRequest?.attachImages.map((value, index) => {
                                        return (
                                            <div className="" key={index}>
                                                <img className={'img-fluid w-100 rounded-3px'}
                                                    // src={value.objectKey}
                                                    src={value.objectKey}
                                                    alt=" "
                                                    onClick={() => handleImageViewDetail(index)}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={'py-3 px-12px'}>
                        <div className={'fw-bold fs-15 fw700'}>원하는 시공</div>
                    </div>
                    <CarPartSelector
                        layout={CarPartControllerLayout[quoteDetail?.type]}
                        parts={selectedParts} />
                    {useInfo?.isCompany &&
                        <CButtonPosition
                            className={'mt-20px'}
                            disabledPosition={true}
                            text={'견적서 작성'}
                            onClick={onCreateQuote}
                        />
                    }
                    {
                        selectedImage !== -1
                        &&
                        <SliderImage
                            show={showImageDetailPopup}
                            setShow={setShowImageDetailPopup}
                            listImage={dataRequest.attachImages}
                        />
                    }
                </>
            }
        />
    )
}

export default RequestQuoteDetailPage
