import { useEffect } from "react";
import { SNSLoginMessage } from "../../constants/SNSLoginConfigs";
import { SNSAppleUtils } from "../../utils/SNSAppleUtils";

function AppleLoginPageCallback() {

    useEffect(() => {

        window.addEventListener('load', function () {
            const authCode = new URLSearchParams(window.location.search).get('code');

            SNSAppleUtils.getToken(authCode).then(res => {

                if (res.status === 200) {

                    window.opener.postMessage({
                        ...SNSLoginMessage,

                        'accessToken': res.data['access_token']
                    }, process.env.REACT_APP_SITE_DOMAIN);
                    window.close();
                }
            });
        });
    }, []);

    return (
        <></>
    );
}

export default AppleLoginPageCallback;