import { Browser as CapaBrowser } from "@capacitor/browser";
import { Device as CapaDevice } from "@capacitor/device";
import axios from "axios";
import { SNSLoginConfigs } from "../constants/SNSLoginConfigs";


export const SNSNaverUtils = {
    openAuthorizationPopup,
    getToken,
    authorizeToken
}


async function openAuthorizationPopup(onSuccessCallback, onErrorCallback) {
    let authorizeURL = "https://nid.naver.com/oauth2.0/authorize";

    authorizeURL += "?response_type=code";
    authorizeURL += `&client_id=${SNSLoginConfigs.NaverLoginConfig.clientId}`;
    authorizeURL += `&redirect_uri=${SNSLoginConfigs.NaverLoginConfig.callbackUrl}`;

    const deviceInfo = await CapaDevice.getInfo();
    const deviceOS = deviceInfo.operatingSystem;

    if (deviceOS === "android") {

        await CapaBrowser.open({ url: authorizeURL });
    } else if (deviceOS === "ios") {

        window.plugins.ASWebAuthSession.start("mycarclothapp", authorizeURL, onSuccessCallback, onErrorCallback);
    } else {

        window.open(authorizeURL, '', 'width=300,height=400');
    }
}

function getToken(authCode) {
    let requestURL = "https://nid.naver.com/oauth2.0/token";

    requestURL += "?grant_type=authorization_code";
    requestURL += `&client_id=${SNSLoginConfigs.NaverLoginConfig.clientId}`;
    requestURL += `&client_secret=${SNSLoginConfigs.NaverLoginConfig.clientSecret}`;
    requestURL += `&code=${authCode}`;

    return axios.get(requestURL);
}

async function authorizeToken(onSuccessCallback, onErrorCallback) {
    let loginURL = "https://nid.naver.com/nidlogin.login";
    let authorizeURL = "https://nid.naver.com/oauth2.0/authorize";

    authorizeURL += "?response_type=token";
    authorizeURL += `&client_id=${SNSLoginConfigs.NaverLoginConfig.clientId}`;
    authorizeURL += `&redirect_uri=${SNSLoginConfigs.NaverLoginConfig.callbackUrl}`;

    loginURL += `?nurl=${encodeURIComponent(authorizeURL)}`;

    const deviceInfo = await CapaDevice.getInfo();
    const deviceOS = deviceInfo.operatingSystem;

    if (deviceOS === "android") {

        await CapaBrowser.open({ url: loginURL });
    } else if (deviceOS === "ios") {

        window.plugins.ASWebAuthSession.start("mycarclothapp", loginURL, onSuccessCallback, onErrorCallback);
    } else {

        window.open(loginURL, '', 'width=600,height=800');
    }
}

