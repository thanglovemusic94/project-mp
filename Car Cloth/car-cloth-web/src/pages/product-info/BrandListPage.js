import {useContext, useEffect, useRef, useState} from "react";
import {Container} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import CLoading from "../../components/CLoading";
import ProductInfoService from "../../services/ProductInfoService";
import ItemBrand from "../../components/pages/product-info/ItemBrand";
import {AppContext} from "../../App";
import ErrorCommon from "../../components/popups/ErrorCommon";
import NavHeaderSpacer from "../../components/NavHeaderSpacer";
import useFetchInitialDataMore from "../../utils/UseFetchInitialDataMore";

function BrandListPage(props) {
    const categoryId = props.location.state
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true)
    const [totalElements, setTotalElements] = useState(0);
    const { showNoticePopup } = useContext(AppContext);

    const [pageable, setPageable] = useState({
        page: 0,
        size: 24,
        sort: 'brandName,ASC',
    })

    const contentRef = useRef(null);

    const fetchData = () => {
        setPageable({ ...pageable, page: pageable.page + 1 })

        ProductInfoService.getAllBrandByCategoryId(pageable, categoryId)
            .then((res) => {
                if (totalElements === 0) {
                    setTotalElements(res.data.totalElements);
                }

                if (data.length < res.data.totalElements) {
                    setData(prevState => prevState.concat(res.data.content))
                } else {
                    setHasMore(!hasMore)
                }
            })
            .catch((error) => {
                if (error.response?.data?.message) {
                    showNoticePopup(error.response.data.message)
                } else {
                    return ErrorCommon(showNoticePopup, error)
                }
            })
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useFetchInitialDataMore(
        data,
        totalElements,
        contentRef.current?._infScroll,
        document.documentElement,
        () => {
            
            if (data.length < totalElements) {
                fetchData();
            }
        }
    );


    return (
        <div className="position-absolute top-0 end-0 w-100 h-100">
            <NavHeaderSpacer />
            <div>
                <div className="brand-title">
                    <p>랩핑</p>
                </div>
            </div>
            <Container className={'bg-white-500  min-vh-100 p-3 mb-nav-bottom'}>
                <InfiniteScroll
                    dataLength={data.length}
                    next={
                        () => setTimeout(() => {
                            fetchData()
                        }, 1500)
                    }
                    hasMore={data.length < totalElements}
                    loader={<CLoading />}
                    scrollThreshold={1}
                    className={'h-100'}
                    style={{ overflow: "none", height: "100%" }}
                    ref={contentRef}
                >
                    {
                        data.length > 0 && data.map((v, i) => {
                            return <ItemBrand source={v} key={i} />
                        })
                    }
                </InfiniteScroll>
                <div className="nav-bottom"></div>
            </Container>
        </div>
    )
}

export default BrandListPage;
