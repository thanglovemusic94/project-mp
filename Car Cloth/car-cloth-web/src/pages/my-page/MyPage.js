import {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {AppContext} from "../../App";
import CButtonPosition from "../../components/buttons/CButtonPosition";
import WrapperContent from "../../components/layouts/WrapperContent";
import MoveToComponent from "../../components/pages/my-page/MoveToComponent";
import IconAccountSignup from "../../components/pages/my-page/my-page-detail/IconAccountSignup";
import {CompanyStatus} from "../../constants/CompanyStatus";
import {
    COMPANY,
    MY_PAGE_FAQ,
    MY_PAGE_NOTIFICATION,
    MY_PAGE_SETTING
} from "../../constants/RouteConstants";

import {MemberInfoContext} from "../../context/member/MemberInforProvider";
import {getMemberInfor} from "../../context/member/MemberAction";
import ErrorCommon from "../../components/popups/ErrorCommon";
import CompanyService from "../../services/CompanyService";

const MyPage = () => {
    const {state, dispatch} = useContext(MemberInfoContext)
    const history = useHistory();
    const {showConfirmPopup, showNoticePopup} = useContext(AppContext);
    const holdingPoint = state?.point
    const deductedPoint = state?.fee

    const onClickMoveToManagement = () => {
        if (state.expired === false) {
            history.push(COMPANY.MANAGEMENT);
        } else {
            showConfirmPopup('',
                <>
                    <div className={''}>
                        <div className={'fw-bold'}>
                            30일 이용권을 구매 하시겠습니까?
                        </div>
                        <div>
                            {deductedPoint} 포인트가 차감됩니다.
                        </div>
                    </div>
                </>,
                () => {
                    if (holdingPoint > deductedPoint) {
                        CompanyService.companyExtenSion()
                            .then((res) => {
                                if (res.status === 200) {
                                    history.push(COMPANY.MANAGEMENT)
                                }
                            })
                            .catch(e => ErrorCommon(showNoticePopup, e))
                    } else {
                        showConfirmPopup(
                            '',
                            <>
                                <div className={''}>
                                    <div className={'fw-bold'}>
                                        보유한 포인트가 부족합니다. 포인트를 충전 하시겠습니까?
                                    </div>
                                </div>
                            </>,
                            () => {
                                history.push(COMPANY.POINT_PURCHASE)
                            }
                        );
                    }


                }
            );
        }
    };

    const onClickMoveToRegister = () => {
        if (state.registeredCompany) {
            history.push(COMPANY.REGISTER_HISTORY);
        } else {
            history.push(COMPANY.REGISTER);
        }
    };

    const onClickMoveToNotice = () => {
        history.push(MY_PAGE_NOTIFICATION);
    };

    const onClickMoveToFAQ = () => {
        history.push(MY_PAGE_FAQ);
    };

    const onClickMoveToSetting = () => {
        history.push(MY_PAGE_SETTING);
    };

    useEffect(() => {
        getMemberInfor(dispatch).catch(e => ErrorCommon(showNoticePopup, e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {state && (
                <WrapperContent
                    className={"p-3"}
                    hasFooter={true}
                    content={
                        <div>
                            <div className={"font-notosansc-bold mb-1 fs-22 lh-31 fw-bold"}>
                                {state.name}
                            </div>
                            <div
                                className={"d-flex align-items-center"}
                                style={{marginBottom: "60px"}}
                            >
                <span className={"me-2"}>
                  <IconAccountSignup snsStatus={state.sns}/>
                </span>

                                <span className={'fs-14 text-black-700'}>{state.memberId}</span>
                            </div>
                            <div>
                                {state.registeredCompany &&
                                state.companyStatus === CompanyStatus.APPROVE ? (
                                    <CButtonPosition
                                        text={"업체관리"}
                                        disabledPosition={true}
                                        onClick={onClickMoveToManagement}
                                    />
                                ) : (
                                    <CButtonPosition
                                        text={"업체 등록 신청"}
                                        disabledPosition={true}
                                        onClick={onClickMoveToRegister}
                                    />
                                )}
                            </div>
                            <MoveToComponent
                                className={"mt-3"}
                                to={onClickMoveToNotice}
                                name={"공지사항"}
                            />
                            <MoveToComponent to={onClickMoveToFAQ} name={"자주 묻는 질문"}/>
                            <MoveToComponent to={onClickMoveToSetting} name={"설정"}/>
                        </div>
                    }
                />
            )}
        </>
    );

}

export default MyPage;
