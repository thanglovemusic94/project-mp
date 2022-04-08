import axios from "axios";

export const LoginService = {
  login,
  refreshToken,
};

const BASE_URL = "/auth/login";
const BASE_COMMON_API_URL = process.env.REACT_APP_COMMON_API_URL;

export const GRANT_TYPE = {
  CLIENT_CREDENTIALS: "CLIENT_CREDENTIALS",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  NAVER: "NAVER",
  KAKAO: "KAKAO",
  GOOGLE: "GOOGLE",
  APPLE: "APPLE",
};


function refreshToken(keyRefresh) {
    return axios.create({ baseURL: BASE_COMMON_API_URL }).post(BASE_URL, {
        refreshToken: keyRefresh,
        grantType: GRANT_TYPE.REFRESH_TOKEN,
        memberId: null,
        password: null
    })
}

function login(loginParams) {
  const body = {
    appleUserName: loginParams.appleUserName,
    grantType: loginParams.grantType,
    memberId: loginParams.memberId,
    password: loginParams.password,
    refreshToken: loginParams.refreshToken,
    token: loginParams.token,
  };

    return axios.create({ baseURL: BASE_COMMON_API_URL }).post(BASE_URL, body);
}
