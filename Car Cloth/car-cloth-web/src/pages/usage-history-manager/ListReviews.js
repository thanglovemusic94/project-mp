import {useLocation} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import ReviewContent from "../../components/pages/usage-history/quotation-detail/ReviewContent";
import ReviewService from "../../services/ReviewService";
import {AppContext} from "../../App";
import InfiniteScroll from "react-infinite-scroll-component";
import CLoading from "../../components/CLoading";
import WrapperContent from "../../components/layouts/WrapperContent";
import ErrorCommon from "../../components/popups/ErrorCommon";
import useFetchInitialDataMore from "../../utils/UseFetchInitialDataMore";

const ListReviews = () => {
    const idInfo = useLocation().state
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true)
    const {setCustomHeaderName, showNoticePopup} = useContext(AppContext);
    const [totalElements, setTotalElements] = useState(0)
    const [param, setParam] = useState({
        page: 0,
        size: 6
    })

    const contentRef = useRef(null);

    const fetchMoreData = () => {
            setParam({...param, page: param.page + 1})
            ReviewService.listReviewByCompanyId(idInfo, param).then((res) => {
                if (totalElements === 0){
                    setTotalElements(res.data.totalElements)
                }
                if (data.length < res.data.totalElements){
                    setData(prevState => prevState.concat(res.data.content))
                }else {
                    setHasMore(!hasMore)
                }
            }).catch(e => ErrorCommon(showNoticePopup, e));
    }

    useEffect(() => {
        setCustomHeaderName('후기')
        fetchMoreData()
        return (() => {
            setCustomHeaderName(null);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useFetchInitialDataMore(
        data,
        totalElements,
        contentRef.current?._infScroll,
        document.documentElement,
        fetchMoreData
    );

    return (
        <WrapperContent className={'bg-black-50'} hasFooter={true} content={
            <>
                <InfiniteScroll
                    dataLength={data.length}
                    next={
                        ()=>  setTimeout(() => {
                            if (data.length < totalElements) fetchMoreData()
                        }, 1000)
                    }
                    hasMore={hasMore}
                    loader={
                        (data.length < totalElements) && <CLoading/>
                    }
                    scrollThreshold={1}
                    className={'h-100'}
                    style={{overflow: "none", height: "100%"}}
                    ref={contentRef}
                >
                    {
                        data.length > 0 && data.map((v, i) => {
                            return (
                                <div key={i} >
                                    <ReviewContent className={` ${i === data.length - 1 ? '': 'mb-12px'}`} dataReview={v}/>
                                </div>
                            )
                        })
                    }
                </InfiniteScroll>
            </>
            }
        >
        </WrapperContent>
    )
}

export default ListReviews
