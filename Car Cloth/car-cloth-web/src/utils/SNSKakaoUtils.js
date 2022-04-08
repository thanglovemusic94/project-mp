import { Browser as CapaBrowser } from '@capacitor/browser';
import { Device } from "@capacitor/device";
import axios from "axios";
import { SNSLoginConfigs } from "../constants/SNSLoginConfigs";

export const SNSKakaoUtils = {
    authorize,
    getToken,
    openAuthorizationPopup
}

async function openAuthorizationPopup(onSuccessCallback, onErrorCallback) {
    let loginURL = "https://accounts.kakao.com/login";
    let authorizeURL = 'https://kauth.kakao.com/oauth/authorize';

    authorizeURL += '?response_type=code';
    authorizeURL += `&client_id=${SNSLoginConfigs.KakaoLoginConfig.clientId}`;
    authorizeURL += `&redirect_uri=${SNSLoginConfigs.KakaoLoginConfig.callbackUrl}`;

    loginURL += `?continue=${encodeURIComponent(authorizeURL)}`;

    const deviceInfo = await Device.getInfo();
    const deviceOS = deviceInfo.operatingSystem;

    if (deviceOS === "android") {

        await CapaBrowser.open({ url: loginURL });
    } else if (deviceOS === "ios") {

        window.plugins.ASWebAuthSession.start("mycarclothapp", loginURL, onSuccessCallback, onErrorCallback);
    } else {

        window.open(loginURL, '', 'width=600,height=800');
    }
}

function authorize(noPrompt) {
    let requestURL = 'https://kauth.kakao.com/oauth/authorize';

    requestURL += '?response_type=code';
    requestURL += `&client_id=${SNSLoginConfigs.KakaoLoginConfig.clientId}`;
    requestURL += `&redirect_uri=${SNSLoginConfigs.KakaoLoginConfig.callbackUrl}`;

    if (noPrompt && noPrompt === true)
        requestURL += '&prompt=none';

    return axios.get(requestURL);
}

function getToken(authCode) {
    let requestURL = 'https://kauth.kakao.com/oauth/token';

    requestURL += '?grant_type=authorization_code';
    requestURL += `&client_id=${SNSLoginConfigs.KakaoLoginConfig.clientId}`;
    requestURL += `&redirect_uri=${SNSLoginConfigs.KakaoLoginConfig.callbackUrl}`;
    requestURL += `&code=${authCode}`;
    requestURL += `&client_secret=${SNSLoginConfigs.KakaoLoginConfig.clientSecret}`;

    return axios.post(requestURL);
}
