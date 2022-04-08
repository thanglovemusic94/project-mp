import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../App";
import {RightArrowIcon, WarningIcon} from "../../assets/svgs/Icons";
import AccountSettingService from "../../services/AccountSettingService";
import {GenderConstants} from "../../constants/GenderConstants";
import {Link, useHistory} from "react-router-dom";
import {convertTypeSNS} from "../../constants/SnsStatus";
import {IDENTITY_VERIFICATION_ROUTE, SNS_LOGIN_ROUTE} from "../../constants/RouteConstants";
import ErrorCommon from "../../components/popups/ErrorCommon";


export default function AccountSettingPage() {
    const { isPlatformIOS } = useContext(AppContext);
    const [data, setData] = useState()
    const history = useHistory()
    const {showWithdrawPopup, showInfoPopup, showNoticePopup} =
        useContext(AppContext);

    const handleWithdraw = () => {
        showWithdrawPopup(
            <>
                <h4 className="fs-14 mb-0 text-center py-5px">회원 탈퇴</h4>
            </>,
            <>
                <div className="font-spoqa text-center">
                    <div className="mb-1">
                        <WarningIcon/>
                    </div>
                    <p className="fs-14 fw-medium text-blue-700">정말로 차옷을 떠나실 건가요?</p>
                    <div className="p-3 bg-blue-50-op-30 rounded-8px mb-2">
                        <ul className="fs-13 fw-light text-black-500 text-start mb-0">
                            <li>회원탈퇴 시 계정의 모든 데이터는 삭제됩니다.</li>
                            <li>재가입시에도 복구되지 않습니다.</li>
                        </ul>
                    </div>
                </div>
            </>,
            ()=>{
                AccountSettingService.withdraw().then(res => {
                    if (res.status === 200){
                        showInfoPopup(null, "회원 탈퇴가 완료되었습니다."
                            ,() => {
                                history.push(SNS_LOGIN_ROUTE)
                            })
                    }
                }).catch(e => ErrorCommon(showNoticePopup, e));
            }
        );
    };


    useEffect(() => {
        AccountSettingService.getAccountInfo().then(res => {
            setData(res.data)
        }).catch(e => ErrorCommon(showNoticePopup, e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <div className="account-setting-page">
                <div className={`cc-body ${isPlatformIOS.current === true ? "ios" : ""} vh-100`}>
                    <div className="d-flex justify-content-between mt-3 py-12px fs-14">
                        <span>이메일</span>
                        <span className="text-black-500">{data?.memberId}</span>
                    </div>
                    <div className="d-flex justify-content-between py-12px fs-14">
                        <span>성별</span>
                        <span>{data && GenderConstants[data.gender]}</span>
                    </div>
                    <div className="d-flex justify-content-between py-12px fs-14">
                        <span>생년월일</span>
                        <span>{data?.birthday}</span>
                    </div>
                    <div className="d-flex justify-content-between py-12px fs-14">
                        <span>휴대폰번호</span>
                        <span>{data?.phone}

                            <Link className={'text-decoration-none'} to={{pathname: IDENTITY_VERIFICATION_ROUTE, state: {isChange: true}}}>
                                <span className="mx-3 text-danger">변경</span>
                                <span><RightArrowIcon/></span>
                            </Link>
                        </span>
                    </div>
                    <div className="d-flex justify-content-between py-12px fs-14">
                        <span>SNS 연동</span>
                        <span className="text-black-500">{data && convertTypeSNS(data.sns)} 계정</span>
                    </div>
                    <div className="bg-black-50 my-3 mx-n3" style={{height: "4px"}}></div>
                    <div>
                        <span className="fs-14 border-bottom border-dark" onClick={handleWithdraw}>회원탈퇴</span>
                    </div>
                </div>
            </div>
        </>
    );
}
