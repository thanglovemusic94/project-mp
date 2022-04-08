import { Camera as CapacitorCamera } from "@capacitor/camera";
import { Geolocation as CapacitorGeoLocation } from '@capacitor/geolocation';
import { PushNotifications as CapacitorPN } from '@capacitor/push-notifications';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CameraPermissionIcon, LocationPermissionIcon } from "../assets/svgs/Icons";
import { MAIN_PAGE_ROUTE, SNS_LOGIN_ROUTE } from "../constants/RouteConstants";
import { LocalStorageManager } from "../managers/LocalStorageManager";
import { Localizations } from "../texts/Localizations";


function PermissionPage() {
  const history = useHistory();

  async function handleRequestPermissions() {
    // In case of Android 11 and above, please check the following link if user denied twice the request permission popup.
    // https://developer.android.com/about/versions/11/privacy/permissions#dialog-visibility

    await CapacitorCamera.requestPermissions({ permissions: ["camera", "photos"] });
    await CapacitorGeoLocation.requestPermissions({ permissions: ["coarseLocation", "location"] });
    await CapacitorPN.requestPermissions();

    if (LocalStorageManager.isTokenUserExisted() === true) {
      history.replace(MAIN_PAGE_ROUTE);
    } else {
      history.replace(SNS_LOGIN_ROUTE);
    }    
  }


  return (
    <>
      <div className="d-flex flex-column vh-100 permission-page">
        <div className="p-4 flex-grow-1">
          <div className="p-5 ps-0">
            <div className="fs-22 fw-bold mb-2">
              <p className="mb-0">
                <span className="text-green-400">
                  {Localizations.Common.AppName}
                  {` `}
                </span>
                {Localizations.Permission.Title1}
              </p>
              <p className="mb-0">{Localizations.Permission.Title2}</p>
            </div>
            <div className="fs-14 fw-light">
              <p className="mb-0">{Localizations.Permission.Description1}</p>
              <p>{Localizations.Permission.Description2}</p>
            </div>
          </div>
          <div>
            <div className="d-flex">
              <CameraPermissionIcon />
              <div className="ms-2">
                <span className="fs-14 fw-bold text-black">
                  {Localizations.Permission.CameraAccessTitle}
                </span>
                <p className="fs-13 text-black-500 fw-light">
                  {Localizations.Permission.CameraAccessDescription}
                </p>
              </div>
            </div>
            <div className="d-flex">
              <LocationPermissionIcon />
              <div className="ms-2">
                <span className="fs-14 fw-bold text-black">
                  {Localizations.Permission.LocationAccessTitle}
                </span>
                <p className="fs-13 text-black-500 fw-light">
                  {Localizations.Permission.LocationAccessDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-6">
          <div className="p-3">
            <hr className="mb-4" />
            <ul className="fw-light fs-12 ps-4">
              <li>{Localizations.Permission.Notice1}</li>
              <li>{Localizations.Permission.Notice2}</li>
            </ul>
          </div>
          <Button variant="blue-500" className="w-100" onClick={handleRequestPermissions}>
            {Localizations.Common.Confirm}
          </Button>
        </div>
      </div>
    </>
  );
}

export default PermissionPage;
