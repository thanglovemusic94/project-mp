import {useContext, useEffect, useState} from "react";
import { RightArrowIcon } from "../../../assets/svgs/Icons";
import ProductInfoService from "../../../services/ProductInfoService";
import { Localizations } from "../../../texts/Localizations";
import useInfiniteScroll from "../../../utils/UseInfiniteScroll";
import CLoading from "../../CLoading";
import ErrorCommon from "../../popups/ErrorCommon";
import {AppContext} from "../../../App";
import NavHeaderSpacer from "../../NavHeaderSpacer";


function CarRegisterSelectModel({ selectedBrand, onSelect }) {

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

    function fetchMoreData() {

        if (pageable.page + 1 < data.totalPages) {
            let newPageable = { ...pageable };

            newPageable.page += 1;

            setPageable(newPageable);
        } else {
            setIsFetching(false);
        }
    }

    function handleModelSelect(item) {
        const value = {
            id: item.id,
            name: item.modelName
        };

        if (onSelect)
            onSelect(value);
    }

    useEffect(() => {

        ProductInfoService.getModelByBrandId(selectedBrand.id, pageable.page, pageable.size).then(res => {

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

        if (data.totalPages > 1 && document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
            fetchMoreData();
        }
        // eslint-disable-next-line
    }, [data.totalPages]);


    return (
        <>
            <div className="d-flex flex-column vh-100 carregisterselectmodel-page">
                <div className="flex-grow-1 pt-3">
                    <NavHeaderSpacer />
                    <h3 className="font-gmarket fw-bold fs-22 mb-4">{Localizations.CarRegister.PageTitle}</h3>
                    <h4 className="fs-18 fw-medium mb-3">{selectedBrand.name}</h4>
                    <div>
                        {
                            data.content.map((item, index) => {
                                return (
                                    <div key={index} className="fs-14 d-flex align-items-center justify-content-between mb-3" onClick={() => handleModelSelect(item)}>
                                        <span>{item.modelName}</span>
                                        <RightArrowIcon />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                {
                    isFetching && <CLoading />
                }
            </div>
        </>
    );
}

export default CarRegisterSelectModel;
