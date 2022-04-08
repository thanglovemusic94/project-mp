import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from "@capacitor/core";
import firebase from 'firebase/app';
import { createContext, useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import BottomNav from "./components/layouts/BottomNav";
import HeaderNav from "./components/layouts/HeaderNav";
import TheContent from "./components/layouts/TheContent";
import ConfirmPopup from "./components/popups/ConfirmPopup";
import InfoPopup from "./components/popups/InfoPopup";
import InputPopup from "./components/popups/InputPopup";
import KakaoMapPopup from "./components/popups/KakaoMapPopup";
import NoticePopup from "./components/popups/NoticePopup";
import SelectionPopup from "./components/popups/SelectionPopup";
import WithdrawPopup from "./components/popups/WithdrawPopup";
import { useNetworkOnline } from "./utils/useNetworkOnline";

export const AppContext = createContext(App);

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

function App() {
  const history = useHistory();
  const { pathname } = useLocation();
  const networkStatusPromise = useNetworkOnline();

  const popupStack = useRef([]);
  const [popup, setPopup] = useState(null);

  const customHandleBack = useRef(null);
  const [customHeaderName, setCustomHeaderName] = useState(null);
  const [optionalItem, setOptionalItem] = useState(null);

  const isPlatformIOS = useRef(Capacitor.getPlatform() === "ios");


  useEffect(() => {

    if (Capacitor.getPlatform() === 'android') {

      CapacitorApp.addListener("backButton", evt => {
        const { canGoBack } = evt;

        if (canGoBack === true) {

          if (customHandleBack.current)
            customHandleBack.current();
          else
            history.goBack();
        } else {
          CapacitorApp.minimizeApp();
        }
      })
    }

    // [WARNING] Temporary does not use this check, need to work on this later.
    // if (LocalStorageManager.isTokenUserExisted() === false) {
    //   LocalStorageManager.removeKey(USER_PHONE_AUTH);
    //   LocalStorageManager.removeKey(USER_CAR_REGISTER);

    //   if (window.location.origin === process.env.REACT_APP_SITE_DOMAIN) {
    //     if (window.location.pathname !== SNS_LOGIN_ROUTE
    //       && window.location.pathname !== SNS_KAKAO_LOGIN_CALLBACK_ROUTE
    //       && window.location.pathname !== SNS_NAVER_LOGIN_CALLBACK_ROUTE
    //     ) {
    //       window.location.href = SNS_LOGIN_ROUTE;
    //     }
    //   }
    // }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    networkStatusPromise.then(value => {
      if (value.connected === false) {
        showNoticePopup(
          <div>
            <div className={'fs-17 fw-medium lh-22'}>
              네트워크 연결이 끊겼습니다!
            </div>
            <div className={'fs-13'} style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
              네트워크 연결 상태를 확인한 후
              다시 시도해주세요.
            </div>
          </div>
        );
      }
    })

    // eslint-disable-next-line
  }, [pathname])

  useEffect(() => {

    if (popup === null && popupStack.current.length > 0) {
      setPopup(popupStack.current[0]);
    }
  }, [popup]);

  function pushPopup(popup) {
    popupStack.current.push(popup);

    setPopup(popupStack.current[0]);
  }

  function removePopup(index) {
    popupStack.current.splice(index, 1);

    setPopup(null);
  }

  function handlePopupExited() {
    removePopup(0);
  }

  function showNoticePopup(content, modalFooter) {
    pushPopup(<NoticePopup content={content} onExited={handlePopupExited} modalFooter={modalFooter} />);
  }

  function showWithdrawPopup(title, content, callback) {
    setPopup(
      <WithdrawPopup
        title={title}
        content={content}
        onAgree={handlePopupExited}
        onExited={callback}
      />
    );
  }

  function showConfirmPopup(title, content, callback) {
    pushPopup(
      <ConfirmPopup
        title={title}
        content={content}
        onAgree={callback}
        onExited={handlePopupExited}
      />
    );
  }

  function showInfoPopup(title, content, callback, backdrop) {
    pushPopup(
      <InfoPopup
        title={title}
        content={content}
        onAgree={callback}
        backdrop={backdrop}
        onExited={handlePopupExited}
      />
    );
  }

  function showInputPopup(title, invalidFeedback, callback) {
    pushPopup(
      <InputPopup
        title={title}
        onAgree={callback}
        invalidFeedback={invalidFeedback}
        onExited={handlePopupExited}
      />
    );
  }

  function showSelectionPopup(source, callback, isClose) {
    pushPopup(
      <SelectionPopup
        source={source}
        onSelect={callback}
        isClose={isClose}
        onExited={handlePopupExited}
      />
    );
  }

  function showKakaoMapPopup(value, callback) {
    pushPopup(<KakaoMapPopup value={value} onConfirm={callback} onExited={handlePopupExited} />);
  }

  function setCustomHandleBack(handler) {
    customHandleBack.current = handler;
  }

  return (
    <AppContext.Provider
      value={{
        isPlatformIOS,

        customHeaderName,
        setCustomHeaderName,
        setCustomHandleBack,
        optionalItem,
        setOptionalItem,

        showNoticePopup,
        showConfirmPopup,
        showWithdrawPopup,
        showInfoPopup,
        showInputPopup,
        showSelectionPopup,
        showKakaoMapPopup,
      }}
    >
      <Container>
        <HeaderNav onBack={() => { return customHandleBack.current ? customHandleBack.current() : false }} />
        <TheContent />
        <BottomNav />
        {popup}
      </Container>
    </AppContext.Provider>
  );
}

export default App;
