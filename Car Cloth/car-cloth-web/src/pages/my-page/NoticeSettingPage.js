import {useContext, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {AppContext} from "../../App";
import NoticeSettingService from "../../services/NoticeSettingService";
import WrapperContent from "../../components/layouts/WrapperContent";
import ErrorCommon from "../../components/popups/ErrorCommon";

const NoticeSettingPage = () => {
    const {showNoticePopup} = useContext(AppContext);
    const [setting, setSetting] = useState(null);

    const checkPopupByStatus = (status) =>{
        if (status) {
            showNoticePopup("알림 수신에 동의 및 수신 상태로 변경되었습니다.");
        } else {
            showNoticePopup("알림 수신에 미동의 및  수신 거부 상태로 변경되었습니다.");
        }
    }

    const setNoticeSettings = (setting, status) => {
        NoticeSettingService.setNoticeSettings(setting).then(res => {
            if (res.status === 200) {
                setSetting(setting)
                checkPopupByStatus(status)
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));
    }

    const changeQuote =  () => {
        const newSetting = {...setting, quoteNotice: !setting.quoteNotice};
        setNoticeSettings(newSetting, !setting.quoteNotice)
    }

    const changeChat = () => {
        const newSetting = {...setting, chattingNotice: !setting.chattingNotice};
        setNoticeSettings(newSetting, !setting.chattingNotice)
    }

    const changeEvent = () => {
        const newSetting = {...setting, eventBenefitNotice: !setting.eventBenefitNotice};
        setNoticeSettings(newSetting, !setting.eventBenefitNotice)
    }

    useEffect(() => {
        NoticeSettingService.getNoticeSettings()
            .then((res) => {
                if (res.status === 200) {
                    setSetting(res.data);
                }
            })
            .catch(e => ErrorCommon(showNoticePopup, e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        setting && (
            <WrapperContent className={'pt-6px bg-blue-50 px-0 py-0'} hasFooter={true} content={
                <>
                    <div className={'setting__notice bg-white'}>
                        <div
                            id="quote"
                            className="justify-content-between  align-items-center d-flex py-12px px-3"
                        >
                            <div className="">
                                <div className="fs-14">견적 알림</div>
                                <div className="fs-13">전달받은 신규 견적 알림 받기</div>
                            </div>

                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="quote-switch"
                                    checked={setting.quoteNotice}
                                    // onChange={() => changeSetting("quote")}
                                    onChange={changeQuote}
                                />
                            </Form>
                        </div>

                        <div
                            id="chatting"
                            className="justify-content-between  align-items-center d-flex py-12px px-3"
                        >
                            <div className="">
                                <div className="fs-14">채팅 알림</div>
                                <div className="fs-13">채팅 메시지 알림 받기</div>
                            </div>

                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="chatting-switch"
                                    checked={setting.chattingNotice}
                                    onChange={changeChat}
                                />
                            </Form>
                        </div>

                        <div
                            id="event"
                            className="justify-content-between  align-items-center d-flex py-12px px-3"
                        >
                            <div className="">
                                <div className="fs-14">이벤트 혜택 알림</div>
                                <div className="fs-13">마케팅 정보 수신 동의</div>
                            </div>

                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="event-switch"
                                    checked={setting.eventBenefitNotice}
                                    onChange={changeEvent}
                                />
                            </Form>
                        </div>
                    </div>
                </>
            }/>
        )
    );
};

export default NoticeSettingPage;
