import WrapperContent from "../../components/layouts/WrapperContent";
import ItemQuoteManager from "../../components/pages/company/ItemQuoteManager";
import { useHistory } from "react-router-dom";
import { COMPANY } from "../../constants/RouteConstants";
import { useEffect, useState } from "react";
import QuotationService from "../../services/QuotationService";

const CompanyQuotePage = () => {
    const history = useHistory()
    const [checkNotice, setCheckNotice] = useState();
    useEffect(() => {
        QuotationService.checkNewNotice().then(res => {
            if (res.status === 200) {
                setCheckNotice(res.data)
            }
        }).catch(e => console.log(e))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    
    return (
        <WrapperContent className={'bg-blue-50'} hasFooter={true} content={
            <>
                <ItemQuoteManager
                    onClick={() => history.push(COMPANY.REQUESTED_QUOTES)}
                    isNew={checkNotice?.requestQuotes.length > 0 ?? false}
                    text={'요청 받은 견적서'} icon={
                        <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M17 3H20C21.1046 3 22 3.89543 22 5V26C22 27.1046 21.1046 28 20 28H2C0.89543 28 0 27.1046 0 26V5C0 3.89543 0.89543 3 2 3H5V2C5 0.89543 5.89543 0 7 0H15C16.1046 0 17 0.89543 17 2V3ZM15 2H7V6H15V2ZM20 26H2V5H5V8H17V5H20V26ZM12 18H10V22H12V18ZM15 16H17V22H15V16ZM7 12H5V22H7V12Z" fill="#6A84D7" />
                        </svg>
                    } />

                <ItemQuoteManager
                    onClick={() => history.push(COMPANY.DELIVERED_QUOTE)}
                    className={'mt-18px'}
                    isNew={checkNotice?.deliverQuotes.length > 0 ?? false}
                    text={'전달한 견적서'} icon={
                        <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20 0H2C0.895887 0.00110246 0.00110246 0.895887 0 2V27C0 27.5523 0.447715 28 1 28H2C2.31479 28.0002 2.61125 27.8519 2.8 27.6L5 24.667L7.2 27.6C7.39659 27.8395 7.69015 27.9783 8 27.9783C8.30985 27.9783 8.60341 27.8395 8.8 27.6L11 24.667L13.2 27.6C13.3966 27.8395 13.6901 27.9783 14 27.9783C14.3099 27.9783 14.6034 27.8395 14.8 27.6L17 24.667L19.2 27.6C19.3889 27.8518 19.6852 28 20 28H21C21.5523 28 22 27.5523 22 27V2C21.9989 0.895887 21.1041 0.00110246 20 0ZM20 25.333L17.8 22.4C17.6034 22.1605 17.3099 22.0217 17 22.0217C16.6901 22.0217 16.3966 22.1605 16.2 22.4L14 25.333L11.8 22.4C11.6034 22.1605 11.3099 22.0217 11 22.0217C10.6901 22.0217 10.3966 22.1605 10.2 22.4L8 25.333L5.8 22.4C5.60341 22.1605 5.30985 22.0217 5 22.0217C4.69015 22.0217 4.39659 22.1605 4.2 22.4L2 25.333V2H20V25.333ZM18 14H16V16H18V14ZM4 14H12V16H4V14ZM18 10H16V12H18V10ZM4 10H12V12H4V10ZM18 6H4V8H18V6Z" fill="#6A84D7" />
                        </svg>
                    } />

                <ItemQuoteManager
                    onClick={() => history.push(COMPANY.RESERVATION_CONSTRUCTION)}
                    isNew={checkNotice?.reservationAndConstructionQuotes.length > 0 ?? false}
                    className={'mt-18px'} text={'예약 & 시공 관리'} icon={
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9 0H0V9H2V2H9V0ZM0 19V28H9V26H2V19H0ZM28 9V0H19V2H26V9H28ZM19 28H28V19H26V26H19V28ZM23.49 8.13L14.49 3.13C14.1806 2.95137 13.7994 2.95137 13.49 3.13L4.49 8.13C4.18321 8.31187 3.99651 8.64337 4 9V19C4.00062 19.3608 4.19551 19.6932 4.51 19.87L13.51 24.87C13.8194 25.0486 14.2006 25.0486 14.51 24.87L23.51 19.87C23.8168 19.6881 24.0035 19.3566 24 19V9C23.9994 8.63924 23.8045 8.30677 23.49 8.13ZM14 5.14L20.94 9L14 12.86L7.06 9L14 5.14ZM6 10.7L13 14.59V22.3L6 18.41V10.7ZM15 22.3V14.59L22 10.7V18.41L15 22.3Z" fill="#6A84D7" />
                        </svg>
                    } />

                <ItemQuoteManager
                    onClick={() => history.push(COMPANY.CONSTRUCTION_COMPLETED)}
                    className={'mt-18px'}
                    text={'시공 완료'} icon={
                        <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9 18.18L5.41 14.59L4 16L9 21L18 12L16.59 10.58L9 18.18ZM20 3H17V2C17 0.89543 16.1046 0 15 0H7C5.89543 0 5 0.89543 5 2V3H2C0.89543 3 0 3.89543 0 5V26C0 27.1046 0.89543 28 2 28H20C21.1046 28 22 27.1046 22 26V5C22 3.89543 21.1046 3 20 3ZM7 2H15V6H7V2ZM2 26H20V5H17V8H5V5H2V26Z" fill="#6A84D7" />
                        </svg>
                    } />
            </>
        } />
    )
}

export default CompanyQuotePage
