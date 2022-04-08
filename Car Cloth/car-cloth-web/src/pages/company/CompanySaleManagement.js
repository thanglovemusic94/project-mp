import {useContext, useEffect, useRef, useState} from "react"
import { Collapse } from "react-bootstrap"
import InfiniteScroll from "react-infinite-scroll-component"
import { CollapseIcon, ExpandIcon } from "../../assets/svgs/Icons"
import CButton from "../../components/buttons/CButton"
import CLoading from "../../components/CLoading"
import CustomDatePicker from "../../components/datetimes/CustomDatePicker"
import ItemSaleInfo from "../../components/pages/company/ItemSaleInfo"
import CompanyService from "../../services/CompanyService"
import Format from "../../utils/Format"
import ErrorCommon from "../../components/popups/ErrorCommon";
import {AppContext} from "../../App";
import useFetchInitialDataMore from "../../utils/UseFetchInitialDataMore"

function CompanySaleManagement() {
    const {showNoticePopup} = useContext(AppContext);
    const sortDefault = "completeDate,desc"
    const [isDirtyDatePicker, setIsDirtyDatePicker] = useState(false)

    const initPeriods = {
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)), // 30 day before access date
        endDate: new Date(),
        page: null,
        size: 10
    }

    const [showDatePicker, setShowDatePicker] = useState(false)

    const [filters, setFilter] = useState(initPeriods)

    const [tempFilters, setTemp] = useState({
        startDate: initPeriods.startDate,
        endDate: initPeriods.endDate
    })

    const [totalSale, setTotalSale] = useState(0)

    const [saleList, setSaleList] = useState({ content: [], totalElements: 0 })

    const wrapperRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        CompanyService.getSaleTotalAmount(
            Format.datetime(filters.startDate, "YYYY.MM.DD"),
            Format.datetime(filters.endDate, "YYYY.MM.DD")
        ).then((res) => {
            if (res.data) {
                setTotalSale(res.data.totalAmount)
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));

        CompanyService.getSaleInfo(
            Format.datetime(filters.startDate, "YYYY.MM.DD"),
            Format.datetime(filters.endDate, "YYYY.MM.DD"),
            0,//
            filters.size,
            sortDefault
        ).then((res) => {
            let newData = res.data
            let content = [].concat(newData.content);//
            setSaleList({ ...newData, content })
        })
        filters.page = 0
        // eslint-disable-next-line
    }, [filters.startDate, filters.endDate])

    useEffect(() => {
        filters.page &&
            CompanyService.getSaleInfo(
                Format.datetime(filters.startDate, "YYYY.MM.DD"),
                Format.datetime(filters.endDate, "YYYY.MM.DD"),
                filters.page,//
                filters.size,
                sortDefault
            ).then((res) => {
                let newData = res.data
                let content = [].concat(saleList.content).concat(newData.content);//
                setSaleList({ ...newData, content })
            }).catch(e => ErrorCommon(showNoticePopup, e));
        // eslint-disable-next-line
    }, [filters.page])

    useFetchInitialDataMore(
        saleList.content,
        saleList.totalElements,
        contentRef.current?._infScroll,
        wrapperRef.current,
        () => {
            let page = filters.page === null ? 1 : filters.page + 1
            setFilter({ ...filters, page })
        }
    );

    function handleChangeStartDate(date) {
        let endDate = tempFilters.endDate
        if (date > tempFilters.endDate) {
            endDate = date
        }
        setTemp({ ...tempFilters, startDate: date, endDate: endDate })
    }

    function handleChangeEndDate(date) {
        let startDate = tempFilters.startDate
        if (date < tempFilters.startDate) {
            startDate = date
        }
        setTemp({ ...tempFilters, startDate: startDate, endDate: date })
    }

    function handleFilterByDateRange() {
        setFilter({ ...filters, startDate: tempFilters.startDate, endDate: tempFilters.endDate })
        setIsDirtyDatePicker(true)
    }

    function handleDatePicker() {
        setShowDatePicker(!showDatePicker)
    }
    return (
        <>
            <div className="salemanagement-page">
                <div className="cc-body d-flex flex-column vh-100 mx-n3">
                    <div className="d-flex flex-column h-100">
                        <div className="">
                            <div className="bg-blue-50 px-3">
                                <div className="py-5 border-white border-bottom">
                                    <div className="text-center">
                                        <div className="fs-14 mb-2">기간 내 총 매출</div>
                                        <div className="fs-35 lh-1 fw-bold text-blue-500">{Format.money(totalSale, '')} <span className="fs-25 fw-normal">원</span></div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-end py-3">
                                    <div className="fs-14">
                                        <span>조회 기간 설정</span>
                                        <br />
                                        <span>{Format.datetime(filters.startDate, "YYYY.MM.DD")} ~ {Format.datetime(filters.endDate, "YYYY.MM.DD")}</span>
                                    </div>
                                    <div className="fs-14">
                                        <span onClick={handleDatePicker}> {isDirtyDatePicker ? '직접 설정' : '지난 30일'} {showDatePicker ? <CollapseIcon /> : <ExpandIcon />}</span>
                                    </div>
                                </div>
                            </div>
                            <Collapse in={showDatePicker} >
                                <div>
                                    <div className="py-12px px-3 border-bottom">
                                        <div className="d-flex justify-content-between align-items-center mb-12px">
                                            <div className="d-flex justify-content-between align-items-center p-9px border border-1 border-black-500 rounded-8px" style={{ width: '160px' }}>
                                                <CustomDatePicker
                                                    selectsStart
                                                    selected={tempFilters.startDate}
                                                    onChange={handleChangeStartDate}
                                                    placeholderText="YYYY.MM.DD"
                                                    startDate={tempFilters.startDate}
                                                    endDate={tempFilters.endDate}
                                                    minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 3))}
                                                    maxDate={new Date()}
                                                />
                                                <ExpandIcon />
                                            </div>
                                            <span>~</span>
                                            <div className="d-flex justify-content-between align-items-center py-2 px-1 border border-1 border-black-500 rounded-8px" style={{ width: '160px' }}>
                                                <CustomDatePicker
                                                    selectsEnd
                                                    selected={tempFilters.endDate}
                                                    onChange={handleChangeEndDate}
                                                    placeholderText="YYYY.MM.DD"
                                                    startDate={tempFilters.startDate}
                                                    endDate={tempFilters.endDate}
                                                    minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 3))}
                                                    maxDate={new Date()} />
                                                <ExpandIcon />
                                            </div>
                                        </div>
                                        <CButton className="w-100 shadow-none" onClick={handleFilterByDateRange}>
                                            <span className="fw-bold">적용</span>
                                        </CButton>
                                    </div>
                                </div>
                            </Collapse>
                            <div className="d-flex justify-content-around py-2 border-bottom fs-14">
                                <span>내용 / 날짜</span>
                                <span>결제금액</span>
                            </div>
                        </div>
                        <div className="flex-grow-1 position-relative">
                            <div id="saleListDiv" className="position-absolute top-0 start-0 end-0 bottom-0 overflow-auto" ref={wrapperRef}>
                                <InfiniteScroll
                                    dataLength={saleList.content.length}
                                    next={
                                        () => setTimeout(() => {
                                            let page = filters.page === null ? 1 : filters.page + 1
                                            setFilter({ ...filters, page })
                                        }, 1500)
                                    }
                                    hasMore={saleList.content.length < saleList.totalElements}
                                    loader={<CLoading />}
                                    scrollThreshold={1}
                                    className={'pt-12px'}
                                    style={{overflow: "none"}}
                                    scrollableTarget="saleListDiv"
                                    ref={contentRef}
                                >
                                    {saleList && saleList.content.map((element, idx) => <ItemSaleInfo key={idx} data={element} />)}
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )



    // return <>
    //     <WrapperContent hasHeader={true} hasFooter={true} content={CompanySaleManagementContent} />

    // </>
}



export default CompanySaleManagement
