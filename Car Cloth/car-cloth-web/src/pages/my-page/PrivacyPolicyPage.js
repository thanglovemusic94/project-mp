import {useContext, useEffect, useRef, useState} from "react";
import NoticeSettingService from "../../services/NoticeSettingService";
import WrapperContent from "../../components/layouts/WrapperContent";
import Format from "../../utils/Format";
import ErrorCommon from "../../components/popups/ErrorCommon";
import {AppContext} from "../../App";
import { Capacitor } from "@capacitor/core";

const PrivacyPoilicyPage = () => {
    const [data, setData] = useState()
    const {showNoticePopup} = useContext(AppContext)
    const isPlatformAndroid = useRef(Capacitor.getPlatform() === 'android');
    useEffect(() => {
        NoticeSettingService.getPrivacy().then(res => {
            setData(res.data)
        }).catch(e => ErrorCommon(showNoticePopup, e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <WrapperContent className={'p-3 '} hasHeader={true} hasFooter={true} content={
            <div className={'h-100'}>
                <div
                    className={`border rounded-8px p-12px overflow-scroll fs-12 fw-light text-black-800 lh-21 ${isPlatformAndroid.current === true ? 'scrollbar-android-y' : ''}`}
                    style={{borderWidth: "0.5px !important", borderColor: "#CFD3DB", height: "570px"}}
                    dangerouslySetInnerHTML={{__html: data?.privacyStatement ? data.privacyStatement :  null}}
                >
                </div>
                <div className={'text-center mt-3 text-black-500 fs-12 lh-15'}>시행일자 : {Format.datetime(data?.createdOn, 'YYYY.MM.DD')} 개인정보처리방침</div>
            </div>
        }
        />
    )
}

export default PrivacyPoilicyPage
