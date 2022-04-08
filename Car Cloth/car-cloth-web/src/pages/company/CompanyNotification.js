import { useContext, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CLoading from "../../components/CLoading";
import WrapperContent from "../../components/layouts/WrapperContent";
import CustomAccordion from "../../components/pages/my-page/notification/CustomAccordion";
import CompanyService from "../../services/CompanyService";
import ErrorCommon from "../../components/popups/ErrorCommon";
import { AppContext } from "../../App";
import useFetchInitialDataMore from "../../utils/UseFetchInitialDataMore";

function CompanyNotification() {
    const { showNoticePopup } = useContext(AppContext);

    const [hasMore, setHasMore] = useState(true)
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0)

    const [param, setParam] = useState({
        page: 0,
        size: 8,
        sort: 'createdOn,desc'
    });

    const contentRef = useRef(null);

    const fetchMoreData = () => {
        setParam({ ...param, page: param.page + 1 })
        CompanyService.getCompanyNotification(param)
            .then((res) => {
                if (totalElements === 0) {
                    setTotalElements(res.data.totalElements)
                }
                if (data.length < res.data.totalElements) {
                    setData(prevState => prevState.concat(res.data.content))
                } else {
                    setHasMore(!hasMore)
                }
            })
            .catch((e) => ErrorCommon(showNoticePopup, e))
    }
    useEffect(() => {
        fetchMoreData()
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
        <WrapperContent className={`px-0`} hasFooter={true} content={
            <InfiniteScroll
                dataLength={data.length}
                next={
                    () => setTimeout(() => {
                        if (data.length < totalElements) fetchMoreData()
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
                        return (
                            <CustomAccordion
                                item={value}
                                eventKey={index}
                                key={index}
                            ></CustomAccordion>
                        )
                    })
                }
    
            </InfiniteScroll>
    
        } />
    )
    
}

export default CompanyNotification
