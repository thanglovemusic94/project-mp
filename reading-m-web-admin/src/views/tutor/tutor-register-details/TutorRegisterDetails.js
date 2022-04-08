import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCol, CImg, CModal, CModalBody, CRow, } from '@coreui/react'
import ModalApproveTutor from './ModalApproveTutor'
import { TutorApplicationService } from 'src/services/TutorApplicationService'
import { TutorService } from "../../../services/TutorService";
import { trackPromise } from "react-promise-tracker";
import { useParams } from "react-router-dom";
import { checkGender, Received } from "../../../constants/received.constaints";
import { DateUtils } from "../../../utils/DateUtils";
import { Certificate } from "./Certificate";
import { hopeDateFormat } from "../../../constants/datetime.constants";
import { graderSelect } from "../../../constants/schoolgrade.constants";
import {
    CLASS_CATEGORY,
    CLASS_LEVEL,
    convertByType,
    convertCategory, EnrollmentPeriodEndType, EnrollmentPeriodStartType, MajorType, UniversityType, WorkingPeriodType
} from "../../../constants/tutorApplication.constants";

const TutorRegisterDetails = () => {
    // let location = useLocation()
    // let data = location.state;
    let id = useParams().id;

    const [data, setData] = useState();
    const [refuseConfirm, setRefuseConfirm] = useState(false)
    const [refuseDone, setRefuseDone] = useState(false)
    const [showOn, setModalApproveTutor] = useState(false)
    const showModalApproveTutor = () => {
        setModalApproveTutor(!showOn)
    }


    const confirmRefuse = () => {
        const data = {
            "approvedType": null
        }
        trackPromise(
            TutorApplicationService.confirmTutorApplication(id, data).then((resp) => {
                if (resp.status === 200) {
                    setRefuseDone(!refuseDone)
                }
            }).catch(e => console.log(e))
        )
    }

    const downloadFile = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!data.files || data.files.length === 0) {
            alert('No any files for download');
            return
        }

        let triggerDelay = 100;
        let removeDelay = 1000;

        data.files.forEach(function (item, index) {
            _createIFrame(item, index * triggerDelay, removeDelay);
        })

    }

    function _createIFrame(url, triggerDelay, removeDelay) {
        //Add iframe dynamically, set SRC, and delete
        const fileName = url.split('/').pop();
        setTimeout(function () {
            var frame = document.createElement("iframe");
            frame.setAttribute('style', "display: none;");
            frame.setAttribute('class', "multi-download");
            frame.setAttribute('src', url);
            frame.setAttribute('dowload', fileName)
            document.body.after(frame);
            setTimeout(function () {
                frame.remove();
            }, removeDelay);
        }, triggerDelay);
    }

    function checkReceived(email: boolean, sms: boolean) {
        let str = ''
        if (email) str = Received.EMAIl;
        if (sms) {
            if (email) str += ', '
            str += Received.SMS
        }
        return str;
    }

    function checkMajors(majors) {
        let str = ''
        if (!majors || majors.length === 0) return str

        majors.map((v, i) => {
            if (i > 0) str += ', '
            str += v.name + ' ' + convertByType(MajorType, v.type);
        })

        return str;
    }

    useEffect(() => {
        trackPromise(
            TutorService.getTutor(id).then((resp) => {
                setData(resp.data)
            })
        )
    }, [id, refuseDone, showOn])
    return (
        <>
            <h2 className="mb-4">지도교사 지원 상세</h2>
            <CCard>
                <CCardBody>
                    <div className="d-flex justify-content-end mb-3">
                        {
                            data &&
                            (data.status === 'WAITING' &&
                                <div>
                                    <CButton
                                        color="secondary"
                                        size="md"
                                        className="mr-2"
                                        onClick={() => setRefuseConfirm(!refuseConfirm)}
                                    >
                                        지도교사 거절하기
                                    </CButton>
                                    <CButton
                                        color="secondary"
                                        size="md"
                                        onClick={() => showModalApproveTutor(!showOn)}
                                    >
                                        지도교사 승인하기
                                    </CButton>
                                </div>)
                        }
                    </div>
                    {
                        data &&
                        <table className="table table-bordered">
                            <tbody>
                                <tr>

                                        {data.imagePc &&
                                        <td colSpan="4">
                                            <CImg
                                                src={data.imagePc}
                                                width="300px"
                                                className="my-2"
                                            />

                                        </td>
                                        }
                                </tr>
                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        기본정보
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">이름</td>
                                    <td>{data.tutor.name}</td>
                                    <td className="td203">ID</td>
                                    <td>{data.tutor.memberId}</td>
                                </tr>
                                <tr>
                                    <td className="td203">생년월일</td>
                                    <td>{DateUtils.toLocalDate(data.tutor.birth)}</td>
                                    <td className="td203">성별</td>
                                    <td>{checkGender(data.tutor.gender)}</td>
                                </tr>
                                <tr>
                                    <td className="td203">휴대폰 번호</td>
                                    <td>{data.tutor.phone}</td>
                                    <td className="td203">이메일</td>
                                    <td>{data.tutor.email}</td>
                                </tr>
                                <tr>
                                    <td className="td203">주소</td>
                                    <td colSpan="3">{data.tutor.address.addressDetail}</td>
                                </tr>
                                <tr>
                                    <td className="td203">수신 동의 여부</td>
                                    <td colSpan="3">
                                        {checkReceived(data.tutor.receivedEmail, data.tutor.receivedSms)}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="td203">은행</td>
                                    <td>{data.tutor.bank}</td>
                                    <td className="td203">계좌번호</td>
                                    <td>{data.tutor.bankAccount}</td>
                                </tr>

                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        학력 사항
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">대학 유형</td>
                                    <td>{convertByType(UniversityType, data.academicInfo?.uniType)}</td>
                                    { }
                                    <td className="td203">대학교명</td>
                                    <td>{data.academicInfo?.uniName}</td>
                                </tr>
                                <tr>
                                    <td className="td203">재학기간</td>
                                    <td colSpan="3">
                                        {`${DateUtils.toLocalDate(data.academicInfo?.enrollPeriod?.start.date)}(${convertByType(EnrollmentPeriodStartType, data.academicInfo?.enrollPeriod?.start.type)})`}
                                        {` ~ `}
                                        {`${DateUtils.toLocalDate(data.academicInfo?.enrollPeriod?.end.date)}(${convertByType(EnrollmentPeriodEndType, data.academicInfo?.enrollPeriod?.end.type)})`}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">전공</td>
                                    <td colSpan="3">
                                        {checkMajors(data.academicInfo?.majors)}
                                        {/*{data.academicInfo.majors.name} {data.academicInfo.majors.type}*/}
                                    </td>
                                </tr>
                                {data.certs &&
                                    data.certs.map((v, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <Certificate data={v} type={v.type} />
                                            </React.Fragment>
                                        )
                                    })
                                }

                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        경력 사항
                                    </td>
                                </tr>

                                {
                                    data.experiences &&
                                    data.experiences.map((v, i) => {
                                        return (
                                            <React.Fragment>
                                                <tr>
                                                    <td className="td203">직종</td>
                                                    <td>{v.occupation}</td>
                                                    <td className="td203">회사명</td>
                                                    <td>{v.companyName}</td>
                                                </tr>
                                                <tr>
                                                    <td className="td203">재직기간</td>
                                                    <td>{convertByType(WorkingPeriodType, v.workPeriod.end.type)}</td>
                                                    <td className="td203">직급/직책</td>
                                                    <td>{v.position}</td>
                                                </tr>
                                                <tr>
                                                    <td className="td203">담당업무</td>
                                                    <td colSpan="3">{v.responsibilities}</td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    })}


                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        자기소개서
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4">{data.introduction}</td>
                                </tr>
                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        LiveClass 책글 지도교사
                                    </td>
                                </tr>

                                {
                                    data.bookClassInfo && data.bookClassInfo.desires &&
                                    data.bookClassInfo.desires.map((v, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <tr>
                                                    <td className="td203">희망 학년 {i + 1} 지망</td>
                                                    <td colSpan="3">
                                                        {graderSelect(v.grade)}
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    })
                                }
                                <tr>
                                    <td className="td203">희망 수업일시</td>
                                    <td colSpan="3">
                                        {
                                            data.bookClassInfo && data.bookClassInfo.desires &&
                                            data.bookClassInfo.desireDateTimes.map((v, i) => {
                                                return (
                                                    <div>
                                                        {hopeDateFormat(v.day, v.start[0], v.start[1], v.end[0], v.end[1])}
                                                    </div>
                                                )
                                            })
                                        }
                                    </td>
                                </tr>

                                <tr>
                                    <td className="tdfull bg-gray-600" colSpan="4">
                                        LiveClass 목적 지도교사
                                    </td>
                                </tr>
                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        수업 기본 정보
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">카테고리</td>
                                    <td>{convertByType(CLASS_CATEGORY, data.goalClassInfo?.category)}</td>
                                    <td className="td203">수준</td>
                                    <td>{convertByType(CLASS_LEVEL, data.goalClassInfo?.level)}</td>
                                </tr>
                                <tr>
                                    <td className="td203">제목</td>
                                    <td colSpan="3">{data.goalClassInfo?.title}</td>
                                </tr>
                                <tr>
                                    <td className="td203">주제</td>
                                    <td colSpan="3">{data.goalClassInfo?.topic}</td>
                                </tr>
                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        커리큘럼 정보
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">총 일차</td>
                                    <td>{data.goalClassInfo?.curriculumInfo?.totalDays}</td>
                                    <td className="td203">일차별 소요 시간</td>
                                    <td>{data.goalClassInfo?.curriculumInfo?.minutesPerDay}</td>
                                </tr>
                                <tr>
                                    <td className="td203">커리큘럼</td>
                                    <td colSpan="3">
                                        {data.goalClassInfo?.curriculumInfo?.curriculum.map((v, i) => {
                                            return (
                                                <div>
                                                    {v}
                                                </div>
                                            )
                                        })}</td>
                                </tr>
                                <tr>
                                    <td className="td203">학생 준비물</td>
                                    <td colSpan="3">{data.goalClassInfo?.curriculumInfo?.materials}</td>
                                </tr>
                                <tr>
                                    <td className="tdfull" colSpan="4">
                                        수업자료 샘플
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td203">첨부파일</td>
                                    <td colSpan="3">
                                        <CButton color="light" size="md" disabled={!data.files || data.files.length === 0}
                                            onClick={downloadFile}>
                                            다운로드
                                        </CButton>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    }

                    <CRow className="justify-content-center mt-5">
                        <CCol md="3">
                            <CButton
                                block
                                color="dark"
                                to="/tutor/tutor-register-list/TutorRegisterList"
                            >
                                목록으로
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <CModal
                show={refuseConfirm}
                onClose={() => setRefuseConfirm(!refuseConfirm)}
                centered
                size='sm'
            >
                <CModalBody className="text-center">
                    <p>지도교사 지원을 거절하시겠습니까?</p>
                    <CButton
                        variant="outline"
                        color="dark"
                        onClick={() => setRefuseConfirm(!refuseConfirm)}
                        className="mx-2"
                    >
                        취소
                    </CButton>
                    <CButton
                        color="dark"
                        onClick={() => {
                            confirmRefuse()
                            setRefuseConfirm(!refuseConfirm)
                        }}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
            <CModal
                show={refuseDone}
                onClose={() => setRefuseDone(!refuseDone)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>지도교사가 거절되었습니다.</p>

                    <CButton
                        color="dark"
                        onClick={() => setRefuseDone(!refuseDone)}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>
            {data &&
            <ModalApproveTutor
                tutorType={data.tutorType}
                source={data}
                show={showOn}
                setShow={setModalApproveTutor}
                id={id}
                setModalApproveTutor={setModalApproveTutor}
            />
            }

        </>
    )
}


export default TutorRegisterDetails
