import {EditReviewRatingIcon} from "../../assets/svgs/Icons";
import {COMPANY} from "../../constants/RouteConstants";
import {useHistory} from "react-router-dom";


const CompanyInfoHeader = () => {
    const history = useHistory();
    function handleClick() {
        history.push(COMPANY.COMPANY_INFOR_EDIT)
    }

    return (
        <>
            {
                <div onClick={handleClick}>
                    <EditReviewRatingIcon/>
                </div>
            }
        </>
    );
}

export default CompanyInfoHeader
