import React, { useEffect, useState } from 'react'
import { CCardBody, CButton, CCard, CCol, CRow } from '@coreui/react'
import { trackPromise } from 'react-promise-tracker'
import { MemberService } from 'src/services/MemberService'
import { convertMemberType } from 'src/constants/member.type.constants'
import { convertRole } from 'src/constants/role.constants'

const Student = (props) => {
    const [data, setData] = useState(null)
    const [dataReady, setDataReady] = useState(false)

    useEffect(() => {
        let member = props.location.data

        trackPromise(
            MemberService.getMember(member.id).then((resp) => {
                if (resp.status === 200) {
                    setData(resp.data)
                    setDataReady(true)
                }
            })
        )
    }, [])

    return (
        dataReady === true ?
        <>
            <h2 className="mb-4">회원 상세</h2>
            <CCard>
                <CCardBody>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td className="td203">구분</td>
                                <td>{convertMemberType(data.classSource)}</td>
                                <td className="td203">가입 유형</td>
                                <td>{convertRole(data.role)}</td>
                            </tr>
                            <tr>
                                <td className="td203">이름</td>
                                <td>{data.name}</td>
                                <td className="td203">ID</td>
                                <td>{data.memberId}</td>
                            </tr>
                            <tr>
                                <td className="td203">휴대폰 번호</td>
                                <td>{data.phone}</td>
                                <td className="td203">이메일</td>
                                <td>{data.email}</td>
                            </tr>
                            <tr>
                                <td className="td203">주소</td>
                                <td colSpan="3">{data.address.addressDetail + " - " + data.address.roadName}</td>
                            </tr>
                            <tr>
                                <td className="td203">학교</td>
                                <td>{data.school}</td>
                                <td className="td203">학년</td>
                                <td>{data.grade}</td>
                            </tr>
                            <tr>
                                <td className="td203">학부모 이름</td>
                                <td>{data.parentName}</td>
                                <td className="td203">학부모 휴대폰 번호</td>
                                <td>{data.parentPhoneNumber}</td>
                            </tr>
                            <tr>
                                <td className="td203">수신 동의 여부</td>
                                <td colSpan="3">
                                    { data.receivedEmail === true ? <span>이메일 수신 동의<br/></span> : <></> }                                    
                                    { data.receivedSms === true ? <span>SMS 수신 동의</span> : <></> }
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <CRow className="justify-content-center mt-5">
                        <CCol md="3">
                            <CButton
                                block
                                color="dark"
                                to="/member/member-list/members/Members"
                            >
                                목록으로
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
        :
        <>
        </>
    )
}

export default Student
