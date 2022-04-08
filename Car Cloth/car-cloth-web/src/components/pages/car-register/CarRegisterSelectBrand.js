import { useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { AppContext } from "../../../App";
import ProductInfoService from "../../../services/ProductInfoService";
import { Localizations } from "../../../texts/Localizations";
import useInfiniteScroll from "../../../utils/UseInfiniteScroll";
import CLoading from "../../CLoading";
import NavHeaderSpacer from "../../NavHeaderSpacer";
import ErrorCommon from "../../popups/ErrorCommon";

function CarRegisterSelectBrand({ onSelect }) {

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreData, document.documentElement, true);
    const { showNoticePopup } = useContext(AppContext);
    const [data, setData] = useState({
        "content": [],
        "totalPages": 2
    });

    const [pageable, setPageable] = useState({
        "page": 0,
        "size": 10,
        "sort": {
            "propertyName": "id",
            "order": "desc"
        }
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

    function handleBrandSelect(item) {
        const value = {
            id: item.id,
            name: item.brandName
        };

        if (onSelect)
            onSelect(value);
    }

    useEffect(() => {

        ProductInfoService
            .getBrands(
                pageable.page,
                pageable.size,
                pageable.sort.propertyName,
                pageable.sort.order
            )
            .then(res => {

                if (res.status === 200) {
                    const { content, ...resDataWithoutContent } = res.data;
                    const newDataWithoutContent = { ...resDataWithoutContent };
                    const newDataContent = [...data.content, ...content];
                    const newData = { ...newDataWithoutContent, "content": newDataContent }

                    setData(newData);
                    setIsFetching(false);

                    // This for filling data on the screen in case the initial data is short.
                    if (data.totalPages > 1 && document.documentElement.scrollHeight <= document.documentElement.offsetHeight) {
                        fetchMoreData();
                    }
                }
            }).catch(e => ErrorCommon(showNoticePopup, e));
        // eslint-disable-next-line
    }, [pageable]);


    return (
        <>
            <div className="vh-100 carregisterselectbrand-page">
                <div className="flex-grow-1 pt-3">
                    <NavHeaderSpacer />
                    <h3 className="font-gmarket fw-bold fs-22 mb-4">{Localizations.CarRegister.PageTitle}</h3>
                    <div className="row mx-n2 pb-3">
                        {
                            data.content.map((item, index) => {
                                return (
                                    <div key={index} className="col-3 p-2 text-center">
                                        <div className="ratio ratio-1x1" onClick={() => handleBrandSelect(item)}>
                                            <Image src={item.attachFile.objectKey} alt={item.attachFile.fileName} className="rounded-20px p-1" />
                                        </div>
                                        <span className="fs-13">{item.brandName}</span>
                                    </div>
                                );
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

export default CarRegisterSelectBrand;
