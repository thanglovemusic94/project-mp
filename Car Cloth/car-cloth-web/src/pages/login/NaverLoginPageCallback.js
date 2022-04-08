import { Device as CapaDevice } from "@capacitor/device";
import { useEffect } from "react";
import { SNSLoginMessage } from "../../constants/SNSLoginConfigs";
import { GRANT_TYPE } from "../../services/LoginService";

function NaverLoginPageCallback() {

    useEffect(() => {
        const redirectToApp = async (token) => {

            const deviceInfo = await CapaDevice.getInfo();
            const deviceOS = deviceInfo.operatingSystem;

            if (deviceOS === "android") {

                window.location.href = `mycarclothapp://com.carcloth?action=${SNSLoginMessage.action}&accessToken=${token}&grantType=${GRANT_TYPE.NAVER}`;
            } else if (deviceOS === "ios") {

                window.location.href = `mycarclothapp://?action=${SNSLoginMessage.action}&accessToken=${token}&grantType=${GRANT_TYPE.NAVER}`;
            } else {

                window.opener.postMessage({
                    ...SNSLoginMessage,

                    'accessToken': token,
                    'grantType': GRANT_TYPE.NAVER
                }, process.env.REACT_APP_SITE_DOMAIN);

                window.close();
            }
        };

        const originURL = window.location.href;
        const correctedURL = originURL.replace('naver#', 'naver?');
        const accessToken = new URLSearchParams(new URL(correctedURL).search).get('access_token');

        redirectToApp(accessToken ?? "");
    }, []);


    return (
        <></>
    );
}

export default NaverLoginPageCallback;