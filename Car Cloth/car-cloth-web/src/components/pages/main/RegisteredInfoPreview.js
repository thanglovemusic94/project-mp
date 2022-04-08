import { useContext } from "react";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { AppContext } from "../../../App";
import { CarIconSmall, EditIcon } from "../../../assets/svgs/Icons";
import { CAR_REGISTER_ROUTE, QUOTE_REQUEST_START_ROUTE } from "../../../constants/RouteConstants";
import { Localizations } from "../../../texts/Localizations";
import CButton from "../../buttons/CButton";


function RegisteredInfoPreview({ source }) {
    const history = useHistory();

    const { showConfirmPopup } = useContext(AppContext);

    function handleGoToQuoteRequestPage() {
        history.push(QUOTE_REQUEST_START_ROUTE);
    }

    function handleCarRegisterConfirm() {

        showConfirmPopup(
            "",
            <p>
                {Localizations.Main.ExistedCarInfoWillBeDeteled}
                <br />
                {Localizations.Main.WouldYouLikeToRegisterNewCarInfo}
            </p>,
            () => {
                history.push(CAR_REGISTER_ROUTE);
            }
        );
    }

    return (
        <>
            <div className="p-3">
                <div className="d-flex align-items-end justify-content-between mb-3">
                    <div>
                        <CarIconSmall />
                        <div className="fw-bold fs-22 text-black-800">{source.carNumber}</div>
                        <div className="fs-13">
                            <span>{source.modelName}{` `}</span>
                            <span className="text-black-400">{source.detailModelName}</span>
                        </div>
                    </div>
                    <div className="position-relative">
                        <Image src={source.objectKey} fluid className="rounded" />
                        <div className="position-absolute bottom-0 end-0" onClick={handleCarRegisterConfirm}>
                            <EditIcon />
                        </div>
                    </div>
                </div>
                <CButton className="w-100 shadow-none" onClick={handleGoToQuoteRequestPage}>
                    <span className="fw-bold">{Localizations.Common.RequestQuote}</span>
                </CButton>
            </div>
        </>
    );
}

export default RegisteredInfoPreview;