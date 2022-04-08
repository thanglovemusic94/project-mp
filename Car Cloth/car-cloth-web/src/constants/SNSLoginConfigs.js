
const NaverLoginConfig = {
    clientId: "S1iKVpimSYmtX_gaU74V",
    clientSecret: '2RMrtmuNGe',
    callbackUrl: `${process.env.REACT_APP_SITE_DOMAIN}/oauth2/callback/naver`
}

const KakaoLoginConfig = {
    clientId: "790a20905293fd33c0cf0c122a1bd107",
    clientSecret: 'Xsksr0CqaL37nVdvcP5MsSuaDrJADgQD',
    callbackUrl: `${process.env.REACT_APP_SITE_DOMAIN}/oauth2/callback/kakao`
}

const AppleLoginConfig = {
    clientId: "",
    clientSecret: '',
    callbackUrl: `${process.env.REACT_APP_SITE_DOMAIN}/oauth2/callback/apple`
}

export const SNSLoginMessage = {
    action: "HANDLE_LOGIN",
    accessToken: "",
    grantType: ""
}

export const SNSLoginConfigs = {
    NaverLoginConfig,
    KakaoLoginConfig,
    AppleLoginConfig
}
