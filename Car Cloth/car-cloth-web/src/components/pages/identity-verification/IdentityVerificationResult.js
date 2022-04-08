import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { TickIcon } from "../../../assets/svgs/Icons";
import { CAR_REGISTER_ROUTE, MAIN_PAGE_ROUTE } from "../../../constants/RouteConstants";
import { Localizations } from "../../../texts/Localizations";
import CButtonPosition from "../../buttons/CButtonPosition";

function IdentityVerificationResult({ isChangePhone }) {
  const history = useHistory();
  return (
    <>
      <div className="d-flex align-items-baseline fs-22 fw-bold mb-2">
        {Localizations.IdentityVerification.ValidationResultP1}
        <span className="text-green-400 ms-1 me-2">
          {Localizations.Common.Completed}
        </span>
        <TickIcon />
      </div>
      <p className="fs-14 text-black-400">
        {Localizations.IdentityVerification.ValidationCongrats}
      </p>
      <CButtonPosition
        text={Localizations.IdentityVerification.GettingStartedButton}
        onClick={() => {
          if (isChangePhone) {
            history.push(MAIN_PAGE_ROUTE)
          } else {
            history.push(CAR_REGISTER_ROUTE)
          }
        }}
      />
    </>
  );
}

export default IdentityVerificationResult;
