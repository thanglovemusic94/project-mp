import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../App";
import WrapperContent from "../../components/layouts/WrapperContent";
import ErrorCommon from "../../components/popups/ErrorCommon";
import QuotationService from "../../services/QuotationService";
import Format from "../../utils/Format";

const DeliveredQuoteDetailPage = () => {
    const item = useLocation().state;
    const { showNoticePopup } = useContext(AppContext);
    const [data, setData] = useState({
        'constructionFee': 0,
        'paymentAmount': 0,
        'estConstructionPeriod': '',
        'notes': ''
    })

    useEffect(() => {

        QuotationService.getDeliveredDetail(item.id).then(res => {

            if (res.status === 200) {
                setData(res.data)
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <WrapperContent className={`bg-black-50 `} hasHeader={true} hasFooter={true} content={
                <div className={'bg-white'}>
                    <div className={'p-18px'}>
                        <div className={'d-flex justify-content-between align-items-center'}>
                            <span className={'fw-bold fs-15'}>총 시공 비용</span>
                            <span className={'fw-medium fs-14'}>{Format.money(data?.constructionFee)}</span>
                        </div>

                        <div className={'d-flex justify-content-between align-items-center mt-28px'} >
                            <span className={'fw-bold fs-15'}>결제금액</span>
                            <span className={'fw-bold fs-16 text-blue-500'}>{Format.money(data?.paymentAmount)}</span>
                        </div>
                    </div>
                    <div className={'px-12px pb-3'}>
                        <hr className={'mb-26px'} />
                        <div className={'p-12px bg-blue-50 rounded'}>
                            <div className={'row g-0'}>
                                <div className={'col-4 fs-13'}>예상 시공 시간</div>
                                <div className={'col-8 text-end'}>입고일로부터 {data?.estConstructionPeriod} 일</div>
                            </div>
                        </div>
                        <div className={'fs-15 fw-bold mb-6px mt-3'}>추가 전달사항</div>

                        <textarea
                            type="text"
                            rows={5}
                            className="fs-14 text-black-800 p-10px form-control rounded-8px lh-21 border-black-700"
                            defaultValue={data?.notes}
                            readOnly={true}
                        />
                    </div>
                </div>
            } />
        </>
    )
}

export default DeliveredQuoteDetailPage
