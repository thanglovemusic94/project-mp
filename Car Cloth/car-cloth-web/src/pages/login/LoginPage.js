import { App as CapaApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useContext, useEffect, useRef, useState } from "react";
import { Toast } from "react-bootstrap";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { AppContext } from "../../App";
import {
  CarClothLogo,
  SNSAppleIcon,
  SNSGoogleIcon,
  SNSKakaoIcon,
  SNSNaverIcon
} from "../../assets/svgs/Icons";
import NavHeaderSpacer from "../../components/NavHeaderSpacer";
import ErrorCommon from "../../components/popups/ErrorCommon";
import { MAIN_PAGE_ROUTE, TERMS_AND_CONDITIONS_ROUTE } from "../../constants/RouteConstants";
import {
  SNSLoginMessage
} from "../../constants/SNSLoginConfigs";
import { LocalStorageManager } from "../../managers/LocalStorageManager";
import { GRANT_TYPE, LoginService } from "../../services/LoginService";
import { MainPageService } from "../../services/MainPageService";
import { Localizations } from "../../texts/Localizations";
import { SNSAppleUtils } from "../../utils/SNSAppleUtils";
import { SNSKakaoUtils } from "../../utils/SNSKakaoUtils";
import { SNSNaverUtils } from "../../utils/SNSNaverUtils";

function LoginPage() {
  const history = useHistory();
  const location = useLocation().state;
  const [showToast, setShowToast] = useState(location?.show_toast ?? false);
  const isPlatformAndroid = useRef(Capacitor.getPlatform() === 'android');

  const { showNoticePopup } = useContext(AppContext);

  useEffect(() => {
    const currentPlaform = Capacitor.getPlatform();

    // Init Google login.
    GoogleAuth.init();

    // Add listener to process callback after SNS login on Web.
    let messageListener = null;
    if (currentPlaform === "web") {
      messageListener = addSNSLoginCallback();
    }

    // Add listener to process callback after SNS login on Android
    let snsRemoveListener = null;
    if (currentPlaform === "android") {

      snsRemoveListener = CapaApp.addListener(
        'appUrlOpen',
        urlScheme => {
          const action = new URLSearchParams(new URL(urlScheme.url).search).get('action');

          if (action !== null && action === SNSLoginMessage.action) {
            const token = new URLSearchParams(new URL(urlScheme.url).search).get('accessToken');
            const type = new URLSearchParams(new URL(urlScheme.url).search).get('grantType');

            loginAfterSNS(type, token);
          }
        }
      );
    }

    // Remove listeners
    return () => {

      if (snsRemoveListener)
        snsRemoveListener();

      if (messageListener)
        window.removeEventListener("message", messageListener);
    };
    // Remove listeners end.

    // eslint-disable-next-line
  }, []);

  function addSNSLoginCallback() {

    return window.addEventListener(
      "message",
      (event) => {

        if (event.origin !== process.env.REACT_APP_SITE_DOMAIN) return;

        const messageData = event.data;
        if (messageData.action === SNSLoginMessage.action) {

          loginAfterSNS(messageData.grantType, messageData.accessToken)
        }
      },
      false
    );
  }

  function loginAfterSNS(grantType, accessToken) {

    const loginArgs = {
      "grantType": grantType,
      "token": accessToken
    };

    LoginService.login(loginArgs)
      .then((res) => {

        if (res.status === 200) {
          // [WARNING] This should be the token returned by the application's login API, not SNS's login API.
          LocalStorageManager.saveUserToken(res.data);

          // [WARNING] 
          // This is code to check if user data has already existed. 
          // This API here is for workaround only, need proper API.
          MainPageService.getInfo().then(res => {

            if (res.status === 200) {
              const { carInfo } = res.data;
              const { brandName, modelName, carNumber, detailModelName } = carInfo;

              if (
                (brandName)
                && (modelName)
                && (carNumber)
                && (detailModelName)
              ) {
                LocalStorageManager.setIsUserPhoneVerified(true);
                LocalStorageManager.setIsUserCarRegistered(true);

                history.push(MAIN_PAGE_ROUTE);

              } else {

                history.push(TERMS_AND_CONDITIONS_ROUTE);
              }
            }
          }).catch(e => ErrorCommon(showNoticePopup, e));
        }
      })
      .catch((error) => alert(JSON.stringify(error)))
  }

  function handleNaverLogin() {

    SNSNaverUtils.authorizeToken(
      function (urlScheme) {
        const token = new URLSearchParams(new URL(urlScheme).search).get('accessToken');

        loginAfterSNS(GRANT_TYPE.NAVER, token);
      },
      function () {
        // Handle error here.
      }
    );
  }

  function handleKakaoLogin() {

    SNSKakaoUtils.openAuthorizationPopup(
      function (urlScheme) {
        const token = new URLSearchParams(new URL(urlScheme).search).get('accessToken');

        loginAfterSNS(GRANT_TYPE.KAKAO, token);
      },
      function () {
        // Handle error here.
      }
    );
  }

  function handleAppleLogin() {

    SNSAppleUtils.openAuthorizationPopup();
  }

  function signInGoogle() {

    GoogleAuth.signIn()
      .then((result) => {

        loginAfterSNS(GRANT_TYPE.GOOGLE, result.authentication.idToken);
      })
      .catch((error) => alert(JSON.stringify(error)));
  }

  return (
    <>
      <div className="d-flex flex-column vh-100 login-page">
        <div className="flex-grow-1 p-4">
          <NavHeaderSpacer />
          <div className="mt-5">
            <CarClothLogo />
          </div>
          <div className="mt-4 ms-1 fs-25">
            <span>{Localizations.Login.Welcome1}</span>
            <br />
            <span>{Localizations.Login.Welcome2}</span>
          </div>
        </div>

        <div className="text-center pb-4 mb-6">
          <div className="d-flex justify-content-between mb-4 px-4">
            <div onClick={handleNaverLogin}>
              <SNSNaverIcon />
            </div>
            <div onClick={handleKakaoLogin}>
              <SNSKakaoIcon />
            </div>
            <div onClick={signInGoogle}>
              <SNSGoogleIcon onClick={signInGoogle} />
            </div>
            <div onClick={handleAppleLogin} hidden={isPlatformAndroid.current === true}>
              <SNSAppleIcon />
            </div>
          </div>
          <span className="text-black-700 fs-14 text-decoration-underline">
            {Localizations.Login.SNSLoginWelcome}
          </span>
        </div>
      </div>

      <Toast
        className="position-fixed start-50 translate-middle-x rounded-pill text-center text-green-400 w-75 mx-auto shadow-sm bg-white"
        style={{ bottom: "80px" }}
        onClose={() => setShowToast(!showToast)}
        show={showToast}
        delay={2000}
        autohide
      >
        <Toast.Body className="fs-14 py-6px">
          로그아웃이 완료되었습니다.
        </Toast.Body>
      </Toast>
    </>
  );
}

export default LoginPage;
