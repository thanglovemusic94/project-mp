import {
    CButton,
    CContainer,
    CForm,
    CFormSelect,
    CFormTextarea,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHeaderCell,
    CTableRow
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import FormattedDateTime from "../../commons/FormattedDateTime";
import MaskedPhoneLabel from "../../commons/MaskedPhoneLabel";
import PopupCommon from "../../commons/PopupCommon";
import { isActiveMember, memberType } from "../../constants/MemberStatus";
import { PopupConstant } from "../../constants/PopupConstant";
import { MEMBERS_ROUTER } from "../../constants/RouterConstant";
import { convertTypeSNS } from "../../constants/SnsStatus";
import { MemberService } from "../../services/MemberService";
import PointService from "../../services/PointService";
import { handleChange } from "../../utils/StateUtils";


function MemberDetails() {
    // const [showRequired, setShowRequired] = useState(false)
    const [withdrawalPopup, setWithdrawalPopup] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    const [detail, setDetail] = useState();
    const [detailUpdate, setDetailUpdate] = useState({
        groupId: 0,
        id: 0,
        memo: ""
    });
    const [refresh, setRefresh] = useState(false)
    const [companyGroup, setCompanyGroup] = useState([])

    function onClickYes() {
        MemberService.forceWithdraw(id).then((res) => {
            if (res.status === 200) {
                setWithdrawalPopup(!withdrawalPopup);
                history.push(MEMBERS_ROUTER.MANAGEMENT)
            }
        });
        setRefresh(!refresh)
    }

    function handleSubmit(event) {
        event.preventDefault();

        MemberService.edit(detailUpdate, detail.id).then(res => {
            if (res.status === 200) {
                history.push(MEMBERS_ROUTER.MANAGEMENT)
            }
        }).catch(e => console.log(e))
    }

    const onChangeGroup = (e) => {
        setDetailUpdate({ ...detailUpdate, groupId: Number.parseFloat(e.target.value), id: Number.parseFloat(detail.id) })
    }
    useEffect(() => {
        MemberService.getMember(id).then((res) => {
            if (res.status === 200) {
                setDetail(res.data);
                setDetailUpdate({ ...detailUpdate, groupId: res.data.group?.id ?? null, id: res.data.id, memo: res.data.memo })
            }
        }).catch(e => console.log(e));
        // eslint-disable-next-line
    }, [refresh])

    useEffect(() => {
        PointService.getAll(null).then(res => {
            if (res.status === 200) {
                setCompanyGroup(res.data.reverse())
            }
        }).catch(e => console.log(e))
        // eslint-disable-next-line
    }, [])

    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand>회원 상세</CHeaderBrand>
                <CHeaderNav className="w-50 justify-content-between">
                    <CButton className="w-25 me-3" color="dark" onClick={() => {
                        setWithdrawalPopup(true)
                    }}>강제탈퇴​</CButton>
                    <CButton className="w-25 me-3" color="dark" onClick={() => history.push(MEMBERS_ROUTER.MANAGEMENT)}>목록​</CButton>
                    <CButton className="w-25 me-3" color="dark" form={'formDetailMember'} type="submit">저장</CButton>
                </CHeaderNav>
            </CHeader>

            {detail &&
                <CForm className="mt-3" onSubmit={handleSubmit} id={'formDetailMember'} noValidate>
                    <CTable className="mt-3" bordered>
                        <CTableBody>
                            <CTableRow>
                                <CTableHeaderCell className="text-center" color="secondary" colSpan="4" scope="col">회원
                                    정보</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell className="text-center" color="secondary"
                                    scope="row">회원상태</CTableHeaderCell>
                                <CTableDataCell>
                                    {isActiveMember(detail.lastLoggedIn)}
                                </CTableDataCell>
                                <CTableHeaderCell className="text-center" color="secondary"
                                    scope="row">회원유형</CTableHeaderCell>
                                <CTableDataCell>

                                    {memberType(detail.companyMember)}
                                </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell className="text-center" color="secondary"
                                    scope="row">ID</CTableHeaderCell>
                                <CTableDataCell>{detail.memberId} ({convertTypeSNS(detail.sns)})</CTableDataCell>
                                <CTableHeaderCell className="text-center" color="secondary"
                                    scope="row">이름</CTableHeaderCell>
                                <CTableDataCell>{detail.name}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell className="text-center" color="secondary"
                                    scope="row">생년월일</CTableHeaderCell>
                                <CTableDataCell><FormattedDateTime source={detail.birthday}
                                    format="YYYY.MM.DD" /></CTableDataCell>
                                <CTableHeaderCell className="text-center" color="secondary"
                                    scope="row">연락처</CTableHeaderCell>
                                <CTableDataCell>
                                    {detail.phone ? <MaskedPhoneLabel text={detail.phone} /> : "-"}
                                </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell className="text-center" color="secondary"
                                    scope="row">가입일시</CTableHeaderCell>
                                <CTableDataCell><FormattedDateTime source={detail.createdOn}
                                    format="YYYY.MM.DD hh:mm" isTimeZone={true} /></CTableDataCell>
                                <CTableHeaderCell className="text-center" color="secondary" scope="row">최종
                                    로그인일시</CTableHeaderCell>
                                <CTableDataCell><FormattedDateTime source={detail.lastLoggedIn}
                                    format="YYYY.MM.DD hh:mm" isTimeZone={true} /></CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell className="text-center align-middle" color="secondary" scope="row">광고 알림
                                    동의</CTableHeaderCell>
                                <CTableDataCell>{detail.adNotified === true ? 'Y' : 'N'}</CTableDataCell>
                                {
                                    detail.companyMember &&
                                    <>
                                        <CTableHeaderCell className="text-center align-middle" color="secondary" scope="row">업체 그룹
                                            설정
                                            </CTableHeaderCell>
                                        <CTableDataCell>
                                            <CFormSelect onChange={onChangeGroup} defaultValue={detail?.group?.id}>
                                                {
                                                    companyGroup.length > 0 && companyGroup.map((item, index) => {
                                                        return (
                                                            <option key={`cf-select-${index}`} value={item.id} >{item.name}</option>
                                                        );
                                                    })
                                                }
                                            </CFormSelect>
                                        </CTableDataCell>
                                    </>
                                }

                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell className="text-center" color="secondary"
                                    scope="row">차종</CTableHeaderCell>
                                <CTableDataCell>{detail.carInfo}</CTableDataCell>
                                <CTableHeaderCell className="text-center" color="secondary"
                                    scope="row">차번호</CTableHeaderCell>
                                <CTableDataCell>{detail.carNumber}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell className="text-center" color="secondary" colSpan="4" scope="col">활동
                                    내역</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell className="text-center" color="secondary" scope="row">견적
                                    요청</CTableHeaderCell>
                                <CTableDataCell>{detail.requestQuotes}</CTableDataCell>
                                <CTableHeaderCell className="text-center" color="secondary" scope="row">후기 작성
                                    수</CTableHeaderCell>
                                <CTableDataCell>{detail.totalReviews}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell className="text-center" color="secondary" colSpan="4" scope="col">관리용
                                    메모</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell className="text-center" color="secondary" colSpan="4" scope="col">
                                    <CFormTextarea name="memo" rows="3" defaultValue={detail.memo ?? ''}
                                        onChange={e => handleChange(e, detailUpdate, setDetailUpdate)}
                                        required
                                    >

                                    </CFormTextarea>
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CForm>
            }

            <PopupCommon type={PopupConstant.YES_NO}
                show={withdrawalPopup}
                setShow={setWithdrawalPopup}
                content="강제탈퇴를 진행하시겠습니까?​"
                onClickYes={onClickYes} />

        </CContainer>
    );
}

export default MemberDetails;
