import { useHistory } from "react-router";
import { NotificationIcon } from "../../assets/svgs/Icons";
import { NOTICE_ROUTE } from "../../constants/RouteConstants";

function OptItemNotification() {
    const history = useHistory();

    function handleGoToNoticePage() {

        history.push(NOTICE_ROUTE);
    }

    return (
        <>
            <div onClick={handleGoToNoticePage}>
                <NotificationIcon />
            </div>
        </>
    );
}

export default OptItemNotification;
