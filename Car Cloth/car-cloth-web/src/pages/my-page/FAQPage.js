import FAQService from "../../services/FAQService";
import {Accordion, AccordionContext, Card, useAccordionButton} from "react-bootstrap";
import CLoading from "../../components/CLoading";
import InfiniteScroll from "react-infinite-scroll-component";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../../App";
import WrapperContent from "../../components/layouts/WrapperContent";
import ErrorCommon from "../../components/popups/ErrorCommon";
import useFetchInitialDataMore from "../../utils/UseFetchInitialDataMore";

const FAQPage = () => {
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const {setCustomHeaderName, showNoticePopup} = useContext(AppContext)
    const [totalElements, setTotalElements] = useState(0);

    const [param, setParam] = useState({
        page: 0,
        size: 15,
    });

    const contentRef = useRef(null);

    const fetchMoreData = () => {
        setParam({...param, page: param.page + 1});
        FAQService.getFaqList(param).then((res) => {
            if (totalElements === 0){
                setTotalElements(res.data.totalElements)
            }
            if (data.length < res.data.totalElements){
                setData(prevState => prevState.concat(res.data.content))
            }else {
                setHasMore(!hasMore)
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));
    };

    useEffect(() => {
        setCustomHeaderName("자주 묻는 질문")
        fetchMoreData();
        return (() => {
            setCustomHeaderName(null);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useFetchInitialDataMore(
        data.length, 
        totalElements, 
        contentRef.current?._infScroll,
        document.documentElement,
        fetchMoreData
    );


    return (
        <WrapperContent className={'fs-14 px-0 py-3'} hasFooter={true} content={
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

                    {data.length > 0 &&
                    data.map((value, index) => {
                        return (
                            <div key={index}>

                                <Accordion className={'faq'}>
                                    <Card className={`rounded-0 lh-21 px-3 border-0 ${index % 2 === 0 ? "bg-blue-50" : "bg-white"} `}>
                                        <Card.Header className={`faq__header ${index === 0 && 'border-top border-black-800'}`}>
                                            <ContextAwareToggle
                                                children={value.title}
                                                eventKey={index}
                                            ></ContextAwareToggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={index}>
                                            <Card.Body>{value.content}</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                        )
                    })}


                </InfiniteScroll>
            </>
        }/>
    );
};


function ContextAwareToggle({children, eventKey, callback}) {
    const {activeEventKey} = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (


        <>
            {isCurrentEventKey ?
                <div className={'d-flex justify-content-between align-items-center'} onClick={decoratedOnClick}>
                    <div className={'me-2'}>
                        <span className="text-green-400">Q. </span>
                        {children}
                    </div>
                    <svg  width="10" height="6" viewBox="0 0 10 6" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5 0L10 5L9.3 5.7L5 1.4L0.7 5.7L0 5L5 0Z"
                              fill="#7B7B7B"/>
                    </svg>
                </div>

                :

                <div className={'d-flex justify-content-between align-items-center'} onClick={decoratedOnClick}>
                    <div className={'me-2'}>
                        <span className="text-green-400">Q. </span>
                        {children}
                    </div>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M5 5.9998L0 0.999805L0.7 0.299805L5 4.5998L9.3 0.299805L10 0.999805L5 5.9998Z"
                              fill="#7B7B7B"/>
                    </svg>
                </div>
            }
        </>

    );
}

export default FAQPage;
