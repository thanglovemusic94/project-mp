import { Device } from '@capacitor/device';
import { useEffect } from "react";
import { SNSLoginMessage } from "../../constants/SNSLoginConfigs";
import { GRANT_TYPE } from "../../services/LoginService";
import { SNSKakaoUtils } from "../../utils/SNSKakaoUtils";

function KakaoLoginPageCallback() {

    useEffect(() => {
        const redirectToApp = async (authCode) => {

            const deviceInfo = await Device.getInfo();
            const deviceOS = deviceInfo.operatingSystem;

            SNSKakaoUtils.getToken(authCode).then(res => {

                if (res.status === 200) {

                    if (deviceOS === "android") {

                        window.location.href = `mycarclothapp://com.carcloth?action=${SNSLoginMessage.action}&accessToken=${res.data['access_token']}&grantType=${GRANT_TYPE.KAKAO}`;
                    } else if (deviceOS === "ios") {

                        window.location.href = `mycarclothapp://?action=${SNSLoginMessage.action}&accessToken=${res.data['access_token']}&grantType=${GRANT_TYPE.KAKAO}`;
                    } else {

                        window.opener.postMessage({
                            ...SNSLoginMessage,

                            'accessToken': res.data['access_token'],
                            'grantType': GRANT_TYPE.KAKAO
                        }, process.env.REACT_APP_SITE_DOMAIN);

                        window.close();
                    }
                }
            });
        }

        const authCode = new URLSearchParams(window.location.search).get('code');

        redirectToApp(authCode ?? "");
    }, []);

    return (
        <>
        </>
    );
}

export default KakaoLoginPageCallback;