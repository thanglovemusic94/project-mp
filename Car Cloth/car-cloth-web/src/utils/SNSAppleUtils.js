import axios from "axios";
import { SNSLoginConfigs } from "../constants/SNSLoginConfigs";

export const SNSAppleUtils = {
    authorize,
    getToken,
    openAuthorizationPopup
}

function openAuthorizationPopup() {
    let requestURL = 'https://appleid.apple.com/auth/authorize';

    requestURL += '?response_type=code';
    requestURL += `&client_id=${SNSLoginConfigs.AppleLoginConfig.clientId}`;
    requestURL += `&redirect_uri=${SNSLoginConfigs.AppleLoginConfig.callbackUrl}`;

    window.open(requestURL, '', 'width=300,height=400');
}

function authorize() {
    let requestURL = 'https://appleid.apple.com/auth/authorize';

    requestURL += '?response_type=code';
    requestURL += `&client_id=${SNSLoginConfigs.AppleLoginConfig.clientId}`;
    requestURL += `&redirect_uri=${SNSLoginConfigs.AppleLoginConfig.callbackUrl}`;

    return axios.get(requestURL);
}

function getToken(authCode) {
    let requestURL = 'https://appleid.apple.com/auth/token';

    requestURL += '?grant_type=authorization_code';
    requestURL += `&client_id=${SNSLoginConfigs.AppleLoginConfig.clientId}`;
    requestURL += `&client_secret=${SNSLoginConfigs.AppleLoginConfig.clientSecret}`;
    requestURL += `&redirect_uri=${SNSLoginConfigs.AppleLoginConfig.callbackUrl}`;
    requestURL += `&code=${authCode}`;

    return axios.post(requestURL);
}
