import { Capacitor } from "@capacitor/core";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../App";
import WrapperContent from "../../components/layouts/WrapperContent";
import ErrorCommon from "../../components/popups/ErrorCommon";
import NoticeSettingService from "../../services/NoticeSettingService";
import Format from "../../utils/Format";


const TermPage = () => {
    const [data, setData] = useState()
    const { showNoticePopup } = useContext(AppContext)
    const isPlatformAndroid = useRef(Capacitor.getPlatform() === 'android');

    useEffect(() => {

        NoticeSettingService
            .getTerm()
            .then(res => {
                setData(res.data)
            })
            .catch(e => ErrorCommon(showNoticePopup, e));

        // eslint-disable-next-line
    }, [])


    return (
        <WrapperContent
            className={'p-3 vh-100'}
            hasHeader={true}
            hasFooter={true}
            content={
                <div style={{ height: '85%' }}>
                    <div
                        className={`border rounded-8px p-12px overflow-scroll fs-12 fw-light text-black-800 lh-21 ${isPlatformAndroid.current === true ? 'scrollbar-android-y' : ''}`}
                        style={{ borderWidth: "0.5px !important", borderColor: "#CFD3DB", height: "100%" }}
                        dangerouslySetInnerHTML={{ __html: data?.servicePolicy ? data.servicePolicy : null }}
                    >
                    </div>
                    <div className={'text-center mt-3 text-black-500 fs-12 lh-15'}>
                        시행일자 : {Format.datetime(data?.createdOn, 'YYYY.MM.DD')} 이용약관
                    </div>
                </div>
            }
        />
    )
}

export default TermPage
