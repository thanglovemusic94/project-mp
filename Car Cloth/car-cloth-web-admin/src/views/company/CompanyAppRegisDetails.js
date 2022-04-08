import {
    CButton,
    CContainer,
    CFormFeedback,
    CFormInput,
    CFormTextarea,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CLink,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableRow
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import FormsContainerPopup from "../../commons/FormsContainerPopup";
import PopupCommon from "../../commons/PopupCommon";
import { CommonMessage } from "../../constants/ErrorMessage";
import { PopupConstant } from "../../constants/PopupConstant";
import RegistrationStatus from "../../constants/RegistrationStatus";
import { COMPANY_ROUTER } from "../../constants/RouterConstant";
import CompanyService from "../../services/CompanyService";

function CompanyAppRegisDetails() {
    const { id } = useParams();
    const history = useHistory();
    const [contentNotify, setContentNotify] = useState("")
    const [showNotify, setShowNotify] = useState(false)
    const [data, setData] = useState({
        "companyName": "",
        "companyId": "",
        "applicantId": "",
        "applicantName": "",
        "contact": "",
        "processingStatus": "",
        "representativeName": "",
        "address": {
            "address": "",
            "addressDetail": ""
        },
        "workingTime": "",
        "attachFile": {
            "fileName": "",
            "objectKey": ""
        },
        "constructableType": "",
        "entryRoute": "",
        "reason": "",
        "companyCode": "",
        "accessDate": ""
    });
    const [rejectingReason, setRejectingReason] = useState("");

    const [rejectPopup, toggleRejectPopup] = useState(false);
    const [approvePopup, toggleApprovePopup] = useState(false);

    useEffect(() => {

        fetchData();
        // eslint-disable-next-line
    }, [])

    function fetchData() {

        CompanyService.getCompanyRegistrationApplication(id).then(res => {

            if (res.status === 200) {

                setData(res.data);
            }
        });
    }

    function handleReject() {

        CompanyService.rejectApplication(id, rejectingReason)
            .then(res => {
                if (res.status === 200) {
                    fetchData();
                }
            })
            .catch((err) => {
                console.log(err)
                setContentNotify(CommonMessage)
                setShowNotify(!showNotify)
            });
    }

    function handleApprove() {

        CompanyService.approveApplication(id)
            .then(res => {
                if (res.status === 200) {
                    toggleApprovePopup(false);
                    fetchData();
                    history.push(COMPANY_ROUTER.REGISTRATIONS)
                }
            })
            .catch((err) => {
                console.log(err)
                setContentNotify(CommonMessage)
                setShowNotify(!showNotify)
            });
    }

    function handleRejectButtonClick() {
        toggleRejectPopup(true);
    }

    function handleApproveButtonClick() {
        toggleApprovePopup(true);
    }

    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>
                    업체 등록 신청 상세
                </CHeaderBrand>
                <CHeaderNav className="w-50 justify-content-end">
                    <CButton className="w-25 me-3" color="dark" href={COMPANY_ROUTER.REGISTRATIONS}>목록</CButton>
                    <CButton className="w-25 me-3" color="dark" onClick={handleApproveButtonClick} disabled={data.processingStatus === "APPROVE"}>승인</CButton>
                    <CButton className="w-25" color="dark" onClick={handleRejectButtonClick} disabled={data.processingStatus === "REJECT"}>반려</CButton>
                </CHeaderNav>
            </CHeader>

            <CTable className="mt-3" bordered>
                <CTableBody>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="w-100 fw-semibold bg-light p-2 text-center">신청 내역</div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex w-50">
                                <div className="w-25 fw-semibold bg-light p-2 text-center border-end">업체명</div>
                                <div className="w-75 p-2">{data.companyName}</div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex">
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">업체주소</div>
                                    <div className="w-75 h-100 p-2 border-end">{data.address.address}</div>
                                </div>
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">상세주소</div>
                                    <div className="w-75 h-100 p-2">{data.address.addressDetail}</div>
                                </div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex">
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">신청 회원 ID</div>
                                    <div className="w-75 h-100 p-2 border-end"><Link to={`/members/${data.companyCode}/details`}>{data.applicantId}</Link></div>
                                </div>
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">신청 회원 이름</div>
                                    <div className="w-75 h-100 p-2">{data.applicantName}</div>
                                </div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex">
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">대표자 성함</div>
                                    <div className="w-75 h-100 p-2 border-end">{data.representativeName}</div>
                                </div>
                                <div className="d-flex w-50">
                                    <div className="w-25 fw-semibold bg-light p-2 border-end text-center">대표자 전화번호</div>
                                    <div className="w-75 h-100 p-2">{data.contact}</div>
                                </div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex w-50">
                                <div className="w-25 fw-semibold bg-light p-2 text-center border-end">업체 운영 시간</div>
                                <div className="w-75 p-2">{data.workingTime}</div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex w-50">
                                <div className="w-25 fw-semibold bg-light p-2 text-center border-end">사업자 등록증</div>
                                <div className="w-75 p-2"><CLink href={data.attachFile.objectKey} download>{data.attachFile.fileName}</CLink></div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex w-50">
                                <div className="w-25 fw-semibold bg-light p-2 text-center border-end">시공 가능 유형</div>
                                <div className="w-75 p-2">{data.constructableType}</div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex w-50">
                                <div className="w-25 fw-semibold bg-light p-2 text-center border-end">입점 경로</div>
                                <div className="w-75 p-2">{data.entryRoute}</div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex w-50">
                                <div className="w-25 fw-semibold bg-light p-2 text-center border-end">처리상태</div>
                                <div className="w-75 p-2">{RegistrationStatus[data.processingStatus]}</div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell className="p-0">
                            <div className="d-flex w-50">
                                <div className="d-flex w-25 fw-semibold bg-light p-2 border-end">
                                    <span className="w-100 align-self-center text-center">반려사유</span>
                                </div>
                                <div className="w-75 px-2 pt-2 pb-5">{data.reason}</div>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>

            <FormsContainerPopup
                visible={rejectPopup}
                setVisible={toggleRejectPopup}
                headerText="반려 사유를 입력해 주세요.​"
                attachedComponent={
                    <RejectingForm
                        value={rejectingReason}
                        onChange={(e) => setRejectingReason(e.target.value)}
                        errorMessage="반려사유를 5글자 이상 입력해 주세요.​"
                    />
                }
                manualValidated
                onAgree={handleReject}
            />

            <PopupCommon
                type={PopupConstant.YES_NO}
                show={approvePopup}
                setShow={toggleApprovePopup}
                headerContent="업체 등록을 승인하시겠습니까?​"
                content="신청한 회원은 업체회원으로 변경됩니다.​"
                onClickYes={handleApprove}
            />

            <PopupCommon
                type={PopupConstant.YES}
                show={showNotify}
                setShow={setShowNotify}
                content={contentNotify}
                onClickYes={() => setShowNotify(!showNotify)}
            />
        </CContainer>
    );
}

function RejectingForm({ errorMessage, ...props }) {
    const [error, setError] = useState(true);

    useEffect(() => {

        if (props.value.length < 5) {
            if (error === false) setError(true);
        } else if (error === true) {
            setError(false);
        }
        // eslint-disable-next-line
    }, [props.value])

    return (
        <>
            {/* This an ugly trick for validation, please do something later. */}
            <CFormInput value={props.value} onChange={() => { }} pattern=".{5,}" hidden></CFormInput>

            <CFormTextarea
                rows="3"
                minLength="5"
                required
                valid={!error}
                invalid={error}
                {...props}
            >
            </CFormTextarea>
            <CFormFeedback invalid>{errorMessage}</CFormFeedback>
        </>
    );
}

export default CompanyAppRegisDetails;
