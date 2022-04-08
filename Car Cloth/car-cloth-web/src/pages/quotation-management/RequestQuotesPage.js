import WrapperContent from "../../components/layouts/WrapperContent";
import InfiniteScroll from "react-infinite-scroll-component";
import CLoading from "../../components/CLoading";
import {useContext, useEffect, useRef, useState} from "react";
import QuotationService from "../../services/QuotationService";
import ItemRequestQuotes from "../../components/pages/company/ItemRequestQuotes";
import ErrorCommon from "../../components/popups/ErrorCommon";
import {AppContext} from "../../App";
import useFetchInitialDataMore from "../../utils/UseFetchInitialDataMore";

const RequestQuotesPage = () => {
    const [hasMore, setHasMore] = useState(true)
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0)
    const {showNoticePopup} = useContext(AppContext);

    const [param, setParam] = useState({
        page: 0,
        size: 5,
        statusFilter: 'REQUESTED',
        sort: 'desiredDate,desc'
    })

    const infScrollRef = useRef(null);

    const fetchMoreData = () => {
        setParam({...param, page: param.page + 1})
        QuotationService.getAllQuotes(param).then((res) => {
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
        fetchMoreData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useFetchInitialDataMore(
        data,
        totalElements,
        infScrollRef.current?._infScroll,
        document.documentElement,
        fetchMoreData
    );


    return (


            <WrapperContent className={`bg-black-60`} hasFooter={true} content={
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
                    ref={infScrollRef}
                >

                    {
                        data.length > 0 && data.map((value, index) => {
                            const checkItemEnd = index === data.length - 1;
                            return (
                                <div key={index} >
                                    <ItemRequestQuotes item={value} checkItemEnd={checkItemEnd}/>
                                </div>
                            )
                        })

                    }

                </InfiniteScroll>

            }/>


    )
}

export default RequestQuotesPage
