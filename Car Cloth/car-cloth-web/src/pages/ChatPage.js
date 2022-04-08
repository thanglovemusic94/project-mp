import React, { useContext, useEffect, useState } from 'react';
// Firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Components
import Channel from '../components/chatting/Channel';
import { TOKEN_FIREBASE } from '../constants/TokenConstants';
import ChatService from '../services/ChatService';
import { AppContext } from '../App';
import { useHistory } from 'react-router';
import { MAIN_PAGE_ROUTE } from '../constants/RouteConstants';
import OptItemChat from '../components/extras/OptItemChat';
import { useFirestoreQueryConfig } from '../utils/FireBaseUtils';
import { Collection } from '../constants/Chatting';
import { SessionStorageManager } from "../managers/SessionStorageManager";
import NavHeaderSpacer from '../components/NavHeaderSpacer';

function ChatPage(props) {
    const { channelId } = props.location.state
    const [token, setToken] = useState(window.localStorage.getItem(TOKEN_FIREBASE));
    const [isAuth, setAuth] = useState(false)
    const { setCustomHeaderName, setOptionalItem, showConfirmPopup, showNoticePopup } = useContext(AppContext)
    const userInfo = SessionStorageManager.getMemberInfo();

    //Authentication with firebase
    useEffect(() => {
        auth(token)
        // eslint-disable-next-line
    }, [channelId, token]);

    //firebase configuration chat
    const db = firebase.firestore();
    const collectionRef = db.collection(Collection.CONFIG)

    const [dataConfig, setDataConfig] = useState({
        id: "",
        turnedOn: true,
        isPushNotice: true,
    })

    useFirestoreQueryConfig(collectionRef, channelId, userInfo?.memberId, setDataConfig)

    const history = useHistory()

    //Set option item of header
    useEffect(() => {
        setOptionalItem(OptItemChat({ turnedOn: dataConfig.turnedOn, handleClick: handleOnOffNotice }))
        // eslint-disable-next-line
    }, [dataConfig]);

    //Set name of header
    useEffect(() => {
        nameInfo()
        return (() => {
            setCustomHeaderName(null);
        });
        // eslint-disable-next-line
    }, []);

    function nameInfo() {
        
        ChatService.getNameInfo(channelId)
            .then((res) => {
                for(const info of res.data) {
                    if(info.memberId !== userInfo?.memberId) 
                    setCustomHeaderName(info.displayName)
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function auth(token) {
        
        if (!token) await fetchToken()
        //authen firebase with token
        firebase.auth().signInWithCustomToken(token)
            .then(() => {
                setAuth(true)
            })
            .catch((error) => {
                setAuth(false)
                window.localStorage.setItem(TOKEN_FIREBASE, null)
                setToken(null)

                console.log("errorCode: " + error.code)
                console.log("errorMessage: " + error.message)
            });
    }

    function fetchToken() {
        //Call api get token firebase
        ChatService.getTokenFirebase()
            .then((res) => {
                let data = res.data
                setToken(data.token)
                window.localStorage.setItem(TOKEN_FIREBASE, data.token)
            })
            .catch((error) => {
                console.log(error)
                history.push(MAIN_PAGE_ROUTE)
            });
    }

    const handleOnOffNotice = () => {
        //Popup confirm
        if (dataConfig.turnedOn) {
            showConfirmPopup("알림끄기​",
                <>
                    <div className={'fw-bold fs-17'}><span>알림을 끄시겠습니까?</span>​</div>
                    <div className={'text-black-400 fs-13'}><span>해당 채팅방의 새로운 알림을<br />표시하지 않습니다.</span></div>
                </>,
                setupOnOffNotice)
        } else {
            showConfirmPopup("알림끄기​",
                <>
                    <div className={'fw-bold fs-17'}><span>알림을 켜시겠습니까?</span>​</div>
                    <div className={'text-black-400 fs-13'}><span>해당 채팅방의 새로운 알림을<br />표시합니다.​</span></div>
                </>,
                setupOnOffNotice)
        }
    }

    const setupOnOffNotice = () => {
        //setup to firebase
        if (!dataConfig.id) {
            collectionRef.doc(channelId + userInfo?.id).set({
                channelId: channelId,
                uid: userInfo?.memberId,
                turnedOn: !dataConfig.turnedOn
            })
        } else {
            collectionRef.doc(dataConfig.id).update({ turnedOn: !dataConfig.turnedOn });
        }

        //Show alert
        if (dataConfig.turnedOn) {
            showNoticePopup(<div className={'text-green-400'}><span>채팅방 알림이 꺼졌습니다.​</span></div>, false)
        } else {
            showNoticePopup(<div className={'text-green-400'}><span>채팅방 알림이 켜졌습니다.</span></div>, false)
        }

        setDataConfig({ ...dataConfig, turnedOn: !dataConfig.turnedOn })
    }

    const pushNotice = (isFirstMess) => {
        if (dataConfig.isPushNotice) {
            //Call apis push notice
            ChatService.pushNotice(channelId, isFirstMess)
                .then(() => { })
                .catch((error) => {
                    console.log("Push notice error: " + error)
                })
        }
    }

    const renderContent = () => {
        return (
            <div className="position-absolute top-0 end-0 w-100 h-100">
                <NavHeaderSpacer />
                {isAuth && channelId &&
                    <Channel channelId={channelId} pushNotice={pushNotice} />}
            </div>)
    };

    return renderContent();
}

export default ChatPage;
