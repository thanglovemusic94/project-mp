import { BlueCircleCheckedIcon, FadedCarClothLogo } from "../../../assets/svgs/Icons";
import CButton from "../../buttons/CButton";
import { Localizations } from "../../../texts/Localizations";
import { useHistory } from "react-router";
import { MAIN_PAGE_ROUTE } from "../../../constants/RouteConstants";
import { LocalStorageManager } from "../../../managers/LocalStorageManager";
import NavHeaderSpacer from "../../NavHeaderSpacer";

function CarRegisterComplete() {
    const history = useHistory();

    function goToMainHome() {
        LocalStorageManager.setIsUserCarRegistered(true);

        history.push(MAIN_PAGE_ROUTE);
    }

    return (
        <>
            <div className="d-flex flex-column vh-100 carregistercomplete-page">
                <div className="d-flex flex-column flex-grow-1 pt-3">
                    <NavHeaderSpacer />
                    <h3 className="font-gmarket fw-bold fs-22 mb-3">{Localizations.CarRegister.PageTitle}</h3>
                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                        <div className="text-center">
                            <BlueCircleCheckedIcon />
                            <p className="text-blue-400 fs-22 fw-medium mt-2">{Localizations.CarRegister.CarRegistionComplete}</p>
                            <FadedCarClothLogo />
                        </div>
                    </div>
                </div>
                <div className="pb-6">
                    <CButton className="w-100" onClick={goToMainHome}>{Localizations.CarRegister.MoveToMainHome}</CButton>
                </div>
            </div>
        </>
    );
}

export default CarRegisterComplete;