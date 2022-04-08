import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../App";
import { RightArrowIcon } from "../../assets/svgs/Icons";
import CLoading from "../../components/CLoading";
import ErrorCommon from "../../components/popups/ErrorCommon";
import { CONSTRUCTION_ROUTER } from "../../constants/RouteConstants";
import ConstructionService from "../../services/ConstructionService";
import Format from "../../utils/Format";
import useInfiniteScroll from "../../utils/UseInfiniteScroll";

export default function ConstructionExampleListPage() {
    const { showNoticePopup } = useContext(AppContext);

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreData, document.documentElement, true);

    const [hasMore, setHasMore] = useState(true)
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0)
    const [param, setParam] = useState({
        page: 0,
        size: 5,
        sort: 'id,desc'
    })

    function fetchMoreData() {
        if (totalElements !== 0 && totalElements === data.length) {

            setIsFetching(false);

            return;

        } else {

            setParam({ ...param, page: param.page + 1 })

            ConstructionService.getList(param)
                .then((res) => {

                    if (totalElements === 0) {
                        setTotalElements(res.data.totalElements)
                    }
                    if (data.length < res.data.totalElements) {
                        setData(prevState => prevState.concat(res.data.content))
                    } else {
                        setHasMore(!hasMore)
                    }

                    setIsFetching(false);
                })
                .catch(e => ErrorCommon(showNoticePopup, e));
        }
    }

    useEffect(() => {

        fetchMoreData();

        // eslint-disable-next-line
    }, [])

    useEffect(() => {

        // This for filling data on the screen in case the initial data is short.
        if (data.length < totalElements && document.documentElement.offsetHeight <= document.documentElement.clientHeight) {
            fetchMoreData();
        }

        // eslint-disable-next-line
    }, [data]);

    return (
        <>
            <div className="construction-example-list-page">
                <div className="cc-body row min-vh-100 bg-black-50">
                    <div className="h-100 p-3 pb-0">
                        {
                            data.length > 0 && data.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <ConstructionItem value={value} />
                                    </div>
                                )
                            })
                        }
                        {
                            isFetching && <CLoading />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

function ConstructionItem({ value }) {
    const history = useHistory();

    const handleGoToConstructionDetails = (id) => {
        history.push({ pathname: CONSTRUCTION_ROUTER.CONSTRUCTION_DETAIL, state: id });
    }

    return (
        <>
            <div
                className="position-relative rounded-4px bg-white cc-shadow mb-3 px-12px py-3"
                onClick={() => handleGoToConstructionDetails(value.id)}
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="fs-17 fw-bold mb-0">{value.companyName}</h3>
                    <RightArrowIcon />
                </div>
                <div className="d-flex">
                    <div>
                        <div className="ratio ratio-1x1 bg-light width-74px me-12px">
                            <img
                                src={value.images[0].objectKey}
                                alt=""
                                className="rounded"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="fs-14">
                            <span className="text-green-400">{value.carType.carInfo} </span>
                            {/*<span className="text-black-400">15~19년 </span>*/}
                        </div>
                        <div className="fs-13 text-black-600">
                            <span className="">시공완료일</span>
                            {value.completedDate &&
                                <span>
                                    <span className="px-1">|</span>
                                    <span className="">{Format.datetime(value.completedDate, 'YYYY.MM.DD')}</span>
                                </span>
                            }

                        </div>
                        <div
                            className="fs-14 mt-2 text-truncate"
                            style={{ "maxWidth": "220px" }}
                        >
                            {value.content}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
