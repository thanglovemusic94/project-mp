import { Camera as CapacitorCamera } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { Geolocation as CapacitorGeoLocation } from '@capacitor/geolocation';
import { PushNotifications as CapacitorPN } from '@capacitor/push-notifications';
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CarClothLogo } from "../assets/svgs/Icons";
import { CAR_REGISTER_ROUTE, MAIN_PAGE_ROUTE, PERMISSION_ROUTE, SNS_LOGIN_ROUTE } from "../constants/RouteConstants";
import { LocalStorageManager, USER_CAR_REGISTER, USER_PHONE_AUTH } from "../managers/LocalStorageManager";

function SplashPage() {
    const history = useHistory();


    useEffect(() => {

        setTimeout(() => {

            checkPermissions()
                .then(res => {
                    // [WARNING]
                    if (res === false) {
                        history.replace(PERMISSION_ROUTE);
                    } else {
                        if (
                            LocalStorageManager.isTokenUserExisted() === false
                            || LocalStorageManager.hasKeyValue(USER_PHONE_AUTH) === false
                        ) {
                            window.location.href = SNS_LOGIN_ROUTE;
                        } else if (LocalStorageManager.hasKeyValue(USER_CAR_REGISTER) === false) {
                            window.location.href = CAR_REGISTER_ROUTE;
                        } else {
                            window.location.href = MAIN_PAGE_ROUTE;
                        }
                    }
                });
        }, 2000);
        // eslint-disable-next-line
    }, []);

    async function checkPermissions() {

        if (Capacitor.getPlatform() !== "web") {
            const cameraPromise = CapacitorCamera.checkPermissions();
            const geoLocationPromise = CapacitorGeoLocation.checkPermissions();
            const pushNotificationPromise = CapacitorPN.checkPermissions();

            const results = await Promise.all([cameraPromise, geoLocationPromise, pushNotificationPromise]);

            let permissionsStatus = {};

            results.forEach(s => permissionsStatus = { ...permissionsStatus, ...s });

            return Object.values(permissionsStatus).every(s => s !== "prompt" && s !== "prompt-with-rationale");
        }

        return true;
    }


    return (
        <>
            <div className="d-flex flex-column justify-content-center vh-100 splash-page">
                <div className="text-center">
                    <CarClothLogo />
                </div>
            </div>
        </>
    );
}

export default SplashPage;