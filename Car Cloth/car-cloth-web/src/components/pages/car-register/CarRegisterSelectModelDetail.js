import {useContext, useEffect, useState} from "react";
import { RightArrowIcon } from "../../../assets/svgs/Icons";
import ProductInfoService from "../../../services/ProductInfoService";
import { Localizations } from "../../../texts/Localizations";
import useInfiniteScroll from "../../../utils/UseInfiniteScroll";
import CLoading from "../../CLoading";
import {AppContext} from "../../../App";
import ErrorCommon from "../../popups/ErrorCommon";
import NavHeaderSpacer from "../../NavHeaderSpacer";

function CarRegisterSelectModelDetail({ selectedModel, onSelect }) {

    const {showNoticePopup} = useContext(AppContext);
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreData, document.documentElement, true);

    const [data, setData] = useState({
        "content": [],
        "totalPages": 1
    });

    const [pageable, setPageable] = useState({
        "page": 0,
        "size": 10
    });

    function handleModelDetailSelect(item) {
        const value = {
            id: item.id,
            name: item.name
        };

        if (onSelect)
            onSelect(value);
    }

    function fetchMoreData() {

        if (pageable.page + 1 < data.totalPages) {
            let newPageable = { ...pageable };

            newPageable.page += 1;

            setPageable(newPageable);
        } else {
            setIsFetching(false);
        }
    }

    useEffect(() => {

        ProductInfoService.getModelDetailById(selectedModel.id, pageable.page, pageable.size).then(res => {

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

    useEffect(() => {

        // This for filling data on the screen in case the initial data is short.
        if (data.totalPages > 1 && document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
            fetchMoreData();
        }
        // eslint-disable-next-line
    }, [data.totalPages]);


    return (
        <>
            <div className="d-flex flex-column vh-100 carregistermodeldetail-page">
                <div className="flex-grow-1 pt-3">
                    <NavHeaderSpacer />
                    <h3 className="font-gmarket fw-bold fs-22 mb-4">{Localizations.CarRegister.PageTitle}</h3>
                    <h4 className="fs-18 fw-medium mb-3">{selectedModel.name}</h4>
                    <div>
                        {
                            data.content.map((item, index) => {
                                return (
                                    <div key={index} className="fs-14 d-flex align-items-center justify-content-between mb-3" onClick={() => handleModelDetailSelect(item)}>
                                        <span>{item.name}</span>
                                        <RightArrowIcon />
                                    </div>
                                );
                            })
                        }
                    </div>
                    {
                        isFetching && <CLoading />
                    }
                </div>
            </div>
        </>
    );
}

export default CarRegisterSelectModelDetail;
