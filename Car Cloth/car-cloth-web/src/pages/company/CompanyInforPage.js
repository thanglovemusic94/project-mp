import { useContext, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../../App";
import WrapperContent from "../../components/layouts/WrapperContent";
import ErrorCommon from "../../components/popups/ErrorCommon";
import RatingReview from "../../components/RatingReview";
import SliderImage from "../../components/SliderImage";
import StaticKakaoMap from "../../components/StaticKakaoMap";
import { getLabelConstructableTypes } from "../../constants/ConstructableTypes";
import {
    CONSTRUCTION_ROUTER,
    USAGE_HISTORY_ROUTER
} from "../../constants/RouteConstants";
import CompanyService from "../../services/CompanyService";
import Format from "../../utils/Format";


const CompanyInforPage = () => {
    const history = useHistory();
    const idInfo = useLocation().state;

    const { showNoticePopup } = useContext(AppContext);

    const [data, setData] = useState();
    const [selectedCEIndex, setSelectedCEIndex] = useState(-1);
    const [showCEImageDetailPopup, setShowCEImageDetailPopup] = useState(false);

    useEffect(() => {

        CompanyService.getCompanyInfo(idInfo)
            .then((res) => {

                if (res.status === 200) {
                    setData(res.data);
                }
            })
            .catch(e => ErrorCommon(showNoticePopup, e));

        // eslint-disable-next-line
    }, [idInfo]);

    useEffect(() => {

        if (showCEImageDetailPopup === false) {
            setSelectedCEIndex(-1);
        }
    }, [showCEImageDetailPopup]);

    const getConstructableType = (constructableType) => {
        let arr = [];

        for (const [key, value] of Object.entries(constructableType)) {

            if (value === true) {
                arr.push(getLabelConstructableTypes(key));
            }
        }

        return arr;
    };

    const seeMore = () => {
        history.push(CONSTRUCTION_ROUTER.CONSTRUCTION_LIST);
    };

    function handleImageViewDetail(selectedIndex) {
        setSelectedCEIndex(selectedIndex);
        setShowCEImageDetailPopup(true);
    }


    return (
        <>
            {data &&
                <WrapperContent
                    hasFooter={true}
                    content={
                        <>
                            <div className="row">
                                <img
                                    className={"img-fluid w-100 align-bottom p-0"}
                                    style={{
                                        height: "200px",
                                    }}
                                    src={data.attachFile.objectKey}
                                    alt=""
                                />
                            </div>

                            <div className={"companyInfo__detail mt-3"}>
                                <div className={"text-black-900"}>
                                    <div className={"fw-bold fs-20 mb-1"}>{data.companyName}</div>
                                    <div className={"fw-light fs-14 mb-6px"}>
                                        {data.address.addressDetail + "," + data.address.address}
                                    </div>
                                    <div className={"fw-medium fs-14 mb-1"}>
                                        영업 시간{" "}
                                        <span className={"fw-normal text-black-700"}>
                                            {data.workingTime}
                                        </span>
                                    </div>
                                    <div className={"mb-6px fw-medium fs-14"}>시공 유형</div>

                                    <div className={"row row-cols-3 g-2 "}>
                                        {getConstructableType(data.constructableType).map(
                                            (value, index) => {
                                                return (
                                                    <div key={index} className={"col"}>
                                                        <div
                                                            className={
                                                                "rounded-0 bg-white text-blue-300 border border-blue-300 text-center py-2"
                                                            }
                                                        >
                                                            {value}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <hr className={"mt-3 mb-13px37"} />
                                <div
                                    className={
                                        "d-flex align-items-center justify-content-between"
                                    }
                                >
                                    <div>
                                        <div className={"d-flex align-items-center mb-9px37"}>
                                            <RatingReview
                                                ratingValue={data.average}
                                                starSpacing={"1.76px"}
                                                width={22}
                                                height={20}
                                                childrenActive={
                                                    <svg
                                                        width="22"
                                                        height="20"
                                                        viewBox="0 0 22 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M10.9999 0.375L7.87176 6.71375L0.879883 7.72438L5.93988 12.6606L4.74363 19.625L10.9999 16.3387L17.2561 19.625L16.0599 12.6606L21.1199 7.73125L14.128 6.71375L10.9999 0.375Z"
                                                            fill="#FFD233"
                                                        />
                                                    </svg>
                                                }
                                                childrenUnActive={
                                                    <svg
                                                        width="22"
                                                        height="20"
                                                        viewBox="0 0 22 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M10.9999 3.4825L12.8974 7.31875L13.2136 8.00625L13.9011 8.10938L18.1361 8.72125L15.1249 11.6775L14.6093 12.1794L14.733 12.8669L15.4549 17.0812L11.6668 15.0944L10.9999 14.8125L10.3605 15.1494L6.57238 17.1087L7.25988 12.8944L7.38363 12.2069L6.87488 11.6775L3.83613 8.68687L8.07113 8.075L8.75863 7.97187L9.07488 7.28437L10.9999 3.4825ZM10.9999 0.375L7.87176 6.71375L0.879883 7.72438L5.93988 12.6606L4.74363 19.625L10.9999 16.3387L17.2561 19.625L16.0599 12.6606L21.1199 7.73125L14.128 6.71375L10.9999 0.375Z"
                                                            fill="#FFD233"
                                                        />
                                                    </svg>
                                                }
                                            />
                                            <span className={"ms-4px88"}>
                                                ({Format.number(data.average, 1)})
                                            </span>
                                        </div>
                                        <div
                                            className={
                                                "d-flex justify-content-between align-items-center mb-2px fs-12"
                                            }
                                        >
                                            <div className={"text-black-550 me-15px"}>
                                                <div>시공 퀄리티</div>
                                                <div>친절도</div>
                                                <div>제품에 대한 설명</div>
                                            </div>
                                            <div>
                                                <div className={"d-flex align-items-center"}>
                                                    <RatingReview
                                                        ratingValue={data.constructionQuality}
                                                    />
                                                    <span className={"ms-4px88 text-black-600 "}>
                                                        ({Format.number(data.constructionQuality, 1)})
                                                    </span>
                                                </div>
                                                <div className={"d-flex align-items-center"}>
                                                    <RatingReview ratingValue={data.kindness} />
                                                    <span className={"ms-4px88 text-black-600 "}>
                                                        ({Format.number(data.kindness, 1)})
                                                    </span>
                                                </div>
                                                <div className={"d-flex align-items-center"}>
                                                    <RatingReview ratingValue={data.explainProduct} />
                                                    <span className={"ms-4px88 text-black-600 "}>
                                                        ({Format.number(data.explainProduct, 1)})
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        className={
                                            "d-flex flex-column justify-content-center align-items-center text-decoration-none bg-black-70 rounded border border-6 border-black-80"
                                        }
                                        style={{ width: "80px", height: "80px" }}
                                        to={{
                                            pathname: USAGE_HISTORY_ROUTER.LIST_REVIEW,
                                            state: idInfo,
                                        }}
                                    >
                                        <div className={"fw-normal fs-18 mt-26px text-black-900"}>
                                            {data.totalReview}+
                                        </div>
                                        <div className={"text-black-550 fs-12 mt-13px"}>
                                            {" "}
                                            후기 더보기
                                        </div>
                                    </Link>
                                </div>
                                <hr className={"mt-3 mb-12px"} />

                                {data.introduction &&
                                    <div className={"p-12px fs-14 bg-blue-50 rounded mb-10px"}>
                                        {data.introduction}
                                    </div>
                                }

                            </div>


                            <div className={"d-flex justify-content-between mb-2"} >
                                <div className={"font-gmarket fw-bold fs-17"}>시공 사례</div>

                                <div className={"fs-12 fw-light "}
                                    style={{ cursor: "pointer" }}
                                    onClick={seeMore}
                                >더보기</div>
                            </div>


                            <div className={" overflow-auto mb-3"} style={{ marginRight: "-1rem" }}>

                                <Stack direction="horizontal" gap={2} className={'mb-3'}>
                                    {
                                        data.constructionExamples.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <img
                                                        // className={`align-bottom ${i === data.constructionExamples.length - 1 && "me-3"}`}
                                                        className={`align-bottom`}
                                                        style={{
                                                            width: "160px",
                                                            height: "120px",
                                                        }}
                                                        src={item.images[0].objectKey}
                                                        alt=""
                                                        onClick={() => handleImageViewDetail(index)}
                                                    />
                                                    <div className={"fs-14 py-1"}>
                                                        <span>{item.carInfo.modelName}{` `}</span>
                                                        <span className={"text-black-300"}>{item.carInfo.detailModelName}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </Stack>

                            </div>
                            <div className={"fs-17 mb-12px font-gmarket"}>오시는 길</div>
                            <div
                                className="companyInfo__map d-flex bg-black-50 align-items-center justify-content-center w-100"
                                style={{ height: "211px" }}
                            >
                                <StaticKakaoMap
                                    className="w-100 h-100"
                                    lat={data.address.lat}
                                    lng={data.address.lon}
                                    onMarket={true}
                                />
                            </div>
                            {
                                selectedCEIndex !== -1
                                &&
                                <SliderImage
                                    show={showCEImageDetailPopup}
                                    setShow={setShowCEImageDetailPopup}
                                    listImage={data.constructionExamples[selectedCEIndex].images}
                                />
                            }

                        </>
                    }
                ></WrapperContent>
            }
        </>
    );
};

export default CompanyInforPage;
