import {CompanyInfoHeaderIcon} from "../../assets/svgs/Icons";
import {useHistory} from "react-router-dom";
import {USAGE_HISTORY_ROUTER} from "../../constants/RouteConstants";
import {useContext} from "react";
import {QuotationContext} from "../../context/quotation/QuotationProvider";


const QuotationHeaderIcon = () => {
    const history = useHistory();
    const {state} = useContext(QuotationContext)

    function handleClick() {
        history.push({pathname: USAGE_HISTORY_ROUTER.COMPANY_INFO, state: state})
    }

    return (
        <>
            {

                <div onClick={handleClick}>
                    <CompanyInfoHeaderIcon />
                </div>
            }
        </>
    );
}

export default QuotationHeaderIcon
