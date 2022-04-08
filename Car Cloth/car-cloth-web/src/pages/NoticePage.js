import { useContext, useEffect, useRef, useState } from "react";
import { Image, Stack } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AppContext } from "../App";
import CLoading from "../components/CLoading";
import NoResult from "../components/extras/NoResult";
import SwipeableItem from "../components/extras/SwipeableItem";
import IconCircle from "../components/IconCircle";
import NavHeaderSpacer from "../components/NavHeaderSpacer";
import ErrorCommon from "../components/popups/ErrorCommon";
import { CommonError } from "../constants/CommonConstants";
import { NoticeType } from "../constants/NoticeConstants";
import { CHATTING, COMPANY, USAGE_HISTORY_ROUTER } from "../constants/RouteConstants";
import { NoticeService } from "../services/NoticeService";
import { Localizations } from "../texts/Localizations";
import useInfiniteScroll from "../utils/UseInfiniteScroll";

function NoticePage() {
    const headerImage = "./images/notice-header.jpg";
    const history = useHistory()
    const { showNoticePopup } = useContext(AppContext);

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreData, document.documentElement, true);

    const [data, setData] = useState({
        "content": [],
        "totalPages": 1,
        "totalElements": 0
    });

    const [pageable, setPageable] = useState({
        pageNumber: 0,
        pageSize: 8,
        sort: {
            prop: 'id',
            order: 'desc'
        }
    });

    const contentRef = useRef(null);

    useEffect(() => {

        NoticeService.getNotices(pageable.pageNumber, pageable.pageSize, pageable.sort).then(res => {

            if (res.status === 200) {
                const { content, ...resDataWithoutContent } = res.data;
                const newDataWithoutContent = { ...resDataWithoutContent };
                const newDataContent = [...data.content, ...content];
                const newData = { ...newDataWithoutContent, "content": newDataContent }

                setData(newData);
                setIsFetching(false);
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));

        // eslint-disable-next-line
    }, [pageable]);

    // This for filling data on the screen in case the initial data is short.
    useEffect(() => {

        if (
            data['content'].length < data['totalElements'] 
            && contentRef.current.scrollHeight <= document.documentElement.clientHeight
        ) {
            fetchMoreData();
        }

        // eslint-disable-next-line
    }, [data]);

    function fetchMoreData() {

        if (pageable.pageNumber + 1 < data.totalPages) {
            let newPageable = { ...pageable };

            newPageable.pageNumber += 1;

            setPageable(newPageable);
        } else {
            setIsFetching(false);
        }
    }

    function handleNoticeDelete(index) {
        const notice = data.content[index];

        NoticeService.deleteNotice(notice.id).then(res => {

            if (res.status === 200) {
                let newData = { ...data };
                let newDataContent = [...newData.content];

                newDataContent.splice(index, 1);
                newData.content = [...newDataContent];

                setData(newData);
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));
    }

    const processNoticeContent = (content) => {
        const maxLength = 70;
        let processedContent = content;

        if (content.length > maxLength) {
            processedContent = content.substring(0, maxLength);

            let lastSpacingIndex = processedContent.lastIndexOf(' ');
            processedContent = processedContent.substring(0, lastSpacingIndex);

            processedContent += '...';
        }

        return processedContent;
    }

    function handleDetail(e, item) {
        const targetParent = e.currentTarget.parentElement;

        if (targetParent.className.indexOf("just-swiped") !== -1) {
            targetParent.className = targetParent.className.replace(' just-swiped', '');
        } else {

            //Call api confirmed notice
            NoticeService.markAsRead(item.id)
                .then()
                .catch(e => ErrorCommon(showNoticePopup, e));

            //redrirect to detail
            switch (item.type) {
                case NoticeType.REQUESTED_QUOTE:
                case NoticeType.APPLIED_RESERVATION:
                    history.push({ pathname: COMPANY.REQUESTED_QUOTE_DETAIL, state: { 'id': item.detailId } })
                    break;

                case NoticeType.CANCELED_RESERVATION:
                case NoticeType.CONFIRMED_RESERVATION:
                    history.push({ pathname: COMPANY.DELIVERED_QUOTE_DETAIL, state: { 'id': item.detailId } })
                    break;

                case NoticeType.DELIVERED_QUOTE:
                case NoticeType.REVIEW:
                    history.push({ pathname: USAGE_HISTORY_ROUTER.QUOTATION_DETAIL, state: { 'id': item.detailId } })
                    break;

                case NoticeType.POINT:
                    //TODO: waiting point detail page
                    history.push({ pathname: COMPANY.POINT_PURCHASE })
                    break;

                case NoticeType.CHAT_MESSAGE:
                    history.push({ pathname: CHATTING, state: { channelId: item.detailId.toString() } })
                    break;

                default:
                    showNoticePopup(CommonError);
            }
        }
    }


    return (
        <>
            <div className="position-absolute top-0 start-0 w-100 vh-100 d-flex flex-column">
                {
                    data.content.length > 0
                        ?
                        <div className="bg-black-30 h-100">
                            <NavHeaderSpacer />
                            <p className="fs-7 fw-light text-black-700 text-center pt-3">{Localizations.Notice.DeleteOnExpired}</p>
                            <Stack className="bg-black-30 px-3 pb-3" gap={3} ref={contentRef}>
                                {
                                    data.content.map((item, index) => {
                                        const createdDate = new Date(item.createdOn);
                                        const today = new Date();
                                        const addedTime = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));

                                        return (
                                            <SwipeableItem key={index} onItemDelete={() => handleNoticeDelete(index)}>
                                                <div className="m-h-swipe-item d-flex flex-grow-1" onClick={(e) => handleDetail(e, item)}>
                                                    <div className="notice-item-header flex-shrink-0">
                                                        <Image className="rounded-start" src={headerImage} alt="" />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-between p-2">
                                                        <span className="text-black-900 fs-14 lh-21">{processNoticeContent(item.content)}</span>
                                                        <span className="text-black-700 lh-21 fs-12 fw-light">{addedTime}{Localizations.Postfix.DaysAgo}</span>
                                                    </div>
                                                    {
                                                        item.hasRead === false
                                                        &&
                                                        <div className="position-absolute top-0 start-100 translate-middle">
                                                            <IconCircle nameIcon="new" />
                                                        </div>
                                                    }
                                                </div>
                                            </SwipeableItem>
                                        );
                                    })
                                }
                            </Stack>
                            {
                                isFetching && <CLoading />
                            }
                            <div className="nav-bottom"></div>
                        </div>
                        :
                        <div className="my-auto">
                            <NoResult message={Localizations.Notice.NoResult} />
                        </div>
                }
            </div>
        </>
    );
}

export default NoticePage;
