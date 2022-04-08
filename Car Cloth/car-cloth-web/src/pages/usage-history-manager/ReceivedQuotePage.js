import {useContext, useEffect, useState} from "react";
import StepReceivedQuote from "../../components/pages/usage-history/receivedQuote/StepReceivedQuote";
import UsageHistoryService from "../../services/UsageHistoryService";
import {useLocation} from "react-router-dom";
import {STEPS_TRANSACTION_STATUS} from "../../constants/TransactionStatus";
import ItemReceivedQuote from "../../components/pages/usage-history/receivedQuote/ItemReceivedQuote";

import {AppContext} from "../../App";
import WrapperContent from "../../components/layouts/WrapperContent";
import {RefreshContext} from "../../context/refresh/RefreshProvider";
import ErrorCommon from "../../components/popups/ErrorCommon";

const ReceivedQuotePage = () => {
    const [data, setData] = useState();
    const {state} = useContext(RefreshContext);
    const {setCustomHeaderName, showNoticePopup} = useContext(AppContext);

    const value = useLocation().state;
    useEffect(() => {
        setCustomHeaderName("견적서 목록");
        UsageHistoryService.getQuotationByTransactionId(value.id).then((res) => {
            res.data.quotes.reverse()
            setData(res.data);
        }).catch(e => ErrorCommon(showNoticePopup, e));
        return (() => {
            setCustomHeaderName(null);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, value.id]);

    return (
        <>

            <WrapperContent
                className="bg-black-50 pt-0"
                hasFooter={true}
                content={
                    <>
                        {data && (
                            <>
                                <div className="row">
                                    <StepReceivedQuote
                                        currentStep={STEPS_TRANSACTION_STATUS.indexOf(data.status)}
                                        arr_step={STEPS_TRANSACTION_STATUS}
                                        colorStep={"blue-500"}
                                        colorCircleStep={"black-250"}
                                    />
                                </div>

                                <div className="row bg-black-50">
                                    <div className="p-3 pb-0">
                                        <h3 className="fw-bold fs-17 font-gmarket mb-3">
                                            받은 견적서 ({data.quotes.length})
                                        </h3>

                                        {data.quotes.map((v, i) => {
                                            const checkItemEnd = i === data.quotes.length - 1
                                            return (
                                                <ItemReceivedQuote key={i} value={v} indexEnd={checkItemEnd}/>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                }
            />
        </>
    );
};

export default ReceivedQuotePage;
