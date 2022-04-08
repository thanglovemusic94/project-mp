import { useContext, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppContext } from "../../App";
import CLoading from "../../components/CLoading";
import WrapperContent from "../../components/layouts/WrapperContent";
import ItemReserVationConstruction from "../../components/pages/company/ItemReserVationConstruction";
import ErrorCommon from "../../components/popups/ErrorCommon";
import QuotationService from "../../services/QuotationService";
import useFetchInitialDataMore from "../../utils/UseFetchInitialDataMore";

const ReservationConstructionPage = () => {
    const [hasMore, setHasMore] = useState(true)
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const { showNoticePopup } = useContext(AppContext);
   
    const [param, setParam] = useState({
        page: 0,
        size: 5,
        sort: ['id,DESC'],
        statusFilter: 'RESERVATION'
    })

    const contentRef = useRef(null);

    const fetchMoreData = async (param) => {
        await QuotationService.getAllQuotes(param).then((res) => {
            if (totalElements === 0) {
                setTotalElements(res.data.totalElements)
            }
            if (data.length < res.data.totalElements) {
                setData(prevState => prevState.concat(res.data.content))
                setHasMore(true)
            } else {
                setHasMore(false)
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));

    }

    useEffect(() => {
        fetchMoreData({ ...param, page: 0 })
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useFetchInitialDataMore(
        data,
        totalElements,
        contentRef.current?._infScroll,
        document.documentElement,
        () => {
            if (data.length < totalElements) {
                setParam({ ...param, page: param.page + 1 })
                fetchMoreData({ ...param, page: param.page + 1 })
            }
        }
    );

    
    return (
        <WrapperContent className={`bg-black-60`} hasFooter={true} content={
            <InfiniteScroll
                dataLength={data.length}
                next={
                    () => setTimeout(() => {
                        if (data.length < totalElements) {
                            setParam({ ...param, page: param.page + 1 })
                            fetchMoreData({ ...param, page: param.page + 1 })
                        }
                    }, 1000)
                }

                hasMore={hasMore}
                loader={
                    (data.length < totalElements) && <CLoading />
                }
                scrollThreshold={1}
                className={'h-100'}
                style={{ overflow: "none", height: "100%" }}
                ref={contentRef}
            >
                {
                    data.length > 0 && data.map((value, index) => {
                        const checkItemEnd = index === data.length - 1;
                        return (
                            <div key={index}>
                                <ItemReserVationConstruction item={value} checkItemEnd={checkItemEnd} />
                            </div>
                        )
                    })

                }

            </InfiniteScroll>

        } />
    )
}

export default ReservationConstructionPage
