import {useHistory} from "react-router-dom";

const PointPurchaseHeaderIcon = () => {
    const history = useHistory();

    function handleClick() {
        history.goBack()
    }

    return (
        <>
            {
                <div onClick={handleClick}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M12 1.05L10.95 0L6 4.95L1.05 0L0 1.05L4.95 6L0 10.95L1.05 12L6 7.05L10.95 12L12 10.95L7.05 6L12 1.05Z"
                              fill="#262626"/>
                    </svg>
                </div>
            }
        </>
    );
}

export default PointPurchaseHeaderIcon
