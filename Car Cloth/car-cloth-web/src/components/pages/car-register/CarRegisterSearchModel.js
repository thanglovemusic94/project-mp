import { useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { AppContext } from "../../../App";
import { CloseIconBlack, RightArrowIcon, SearchIcon } from "../../../assets/svgs/Icons";
import CButton from "../../../components/buttons/CButton";
import NoResult from "../../../components/extras/NoResult";
import ProductInfoService from "../../../services/ProductInfoService";
import { Localizations } from "../../../texts/Localizations";
import useInfiniteScroll from "../../../utils/UseInfiniteScroll";
import CLoading from "../../CLoading";
import NavHeaderSpacer from "../../NavHeaderSpacer";
import ErrorCommon from "../../popups/ErrorCommon";

function FormControlSearch({ onTextClear, ...props }) {

    function handleClearText() {

        if (onTextClear)
            onTextClear();
    }

    return (
        <>
            <div className="position-relative w-100">
                <Form.Control {...props} type="text"></Form.Control>
                <div
                    className="position-absolute top-50 end-0 translate-middle-y pt-2 pe-2"
                    hidden={props.value.length === 0}
                    onClick={handleClearText}
                >
                    <CloseIconBlack />
                </div>
            </div>
        </>
    );
}

function CarRegisterSearchModel({ onModelSelect, onStepByStepSelect }) {
    const { showNoticePopup } = useContext(AppContext);
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreData, document.documentElement, true);

    const highlightSearch = useRef('');
    const [searchResult, setSearchResult] = useState({
        content: [],
        totalPages: 2
    });
    const [searchValue, setSearchValue] = useState("");
    const [noResult, setNoResult] = useState(false);

    const [pageable, setPageable] = useState({
        page: 0,
        size: 10
    });

    useEffect(() => {

        if (searchValue.length > 0) {

            ProductInfoService.getModelByName(searchValue, pageable.page, pageable.size).then(res => {

                if (res.status === 200) {

                    if (res.data !== "") {
                        const { content, ...resDataWithoutContent } = res.data;
                        const newDataWithoutContent = { ...resDataWithoutContent };
                        const newDataContent = [...searchResult.content, ...content];
                        const newData = { ...newDataWithoutContent, "content": newDataContent }

                        if (noResult === true) setNoResult(false);

                        setSearchResult(newData);
                        setIsFetching(false);
                    } else {
                        setNoResult(true);
                    }

                }
            }).catch(e => ErrorCommon(showNoticePopup, e));
        }
        // eslint-disable-next-line
    }, [pageable]);

    useEffect(() => {

        // This for filling data on the screen in case the initial data is short.
        if (searchResult.totalPages > 1 && document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
            fetchMoreData();
        }
        // eslint-disable-next-line
    }, [searchResult.totalPages]);

    function fetchMoreData() {

        if (pageable.page + 1 < searchResult.totalPages) {
            let newPageable = { ...pageable };

            newPageable.page += 1;

            setPageable(newPageable);
        } else {
            setIsFetching(false);
        }
    }

    function handleModelSearch(event) {
        event.preventDefault();
        event.stopPropagation();

        if (searchValue.length === 0) {
            showNoticePopup(Localizations.CarRegister.PleaseEnterTheSearchKeyword);
        } else {
            setPageable({ ...pageable, page: 0 })
            setSearchResult({ ...searchResult, content: [] })
            highlightSearch.current = searchValue;
        }
    }

    function handleStepByStepSelect() {

        if (onStepByStepSelect)
            onStepByStepSelect();
    }

    function handleModelSelect(item) {
        const value = {
            id: item.id,
            name: item.modelName
        };

        if (onModelSelect)
            onModelSelect(value);
    }


    return (
        <>
            <div className="d-flex flex-column vh-100 carregistermodel-page">
                <div className="flex-grow-1 d-flex flex-column">
                    <div className="mt-3">
                        <NavHeaderSpacer />
                        <h3 className="font-gmarket fw-bold fs-22 mb-3">{Localizations.CarRegister.PageTitle}</h3>
                        <Form onSubmit={handleModelSearch}>
                            <Form.Group className="d-flex">
                                <FormControlSearch
                                    className="border-0 rounded-10px bg-blue-50-op-30 flex-grow-1 py-2 px-3"
                                    type="search"
                                    placeholder={Localizations.CarRegister.CarModelNameSearch}
                                    value={searchValue}
                                    onChange={ev => setSearchValue(ev.currentTarget.value)}
                                    onTextClear={() => setSearchValue("")}
                                />
                                <span className="my-auto ms-2" onClick={handleModelSearch}><SearchIcon /></span>
                            </Form.Group>
                            <p className="text-blue-500 pt-2">{Localizations.CarRegister.SearchCarByModelName}</p>
                        </Form>
                    </div>

                    {
                        searchResult.content.length > 0
                            ?
                            <div className="mt-5">
                                <h4 className="fs-18 fw-medium mb-3">{Localizations.Common.SearchResult}</h4>
                                <div>
                                    {
                                        searchResult.content.map((item, index) => {
                                            const parts = item.modelName.split(new RegExp(`(${highlightSearch.current})`, 'gi'));
                                            const highlightedModelName =
                                                <span>
                                                    {
                                                        parts.map(
                                                            (part, partIndex) => part.toLowerCase() === highlightSearch.current.toLowerCase()
                                                                ? <span key={partIndex} className="fw-bold">{part}</span>
                                                                : part !== ""
                                                                    ? <span key={partIndex}>{part}</span>
                                                                    : ""
                                                        )
                                                    }
                                                </span>;
                                            return (
                                                <div key={index} className="fs-14 d-flex align-items-center justify-content-between mb-3" onClick={() => handleModelSelect(item)}>
                                                    {highlightedModelName}
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
                            :
                            noResult === true
                            &&
                            <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                <NoResult />
                            </div>
                    }

                </div>
                {
                    searchResult.content.length === 0
                    &&
                    <div className="pb-6 text-center">
                        <p className="fs-13 text-black-400">{Localizations.CarRegister.RegisterBySearchBrandAndVehicleModel}</p>
                        <CButton className="w-100" onClick={handleStepByStepSelect}>{Localizations.CarRegister.RegisterBrandSelection}</CButton>
                    </div>
                }
            </div>
        </>
    );
}

export default CarRegisterSearchModel;
