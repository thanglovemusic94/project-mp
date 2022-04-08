import React, { useEffect, useState } from 'react'
import { CCardBody, CButton, CCard, CCol, CRow } from '@coreui/react'
import { trackPromise } from 'react-promise-tracker'
import { MemberService } from 'src/services/MemberService'
import { convertMemberType } from 'src/constants/member.type.constants'
import { convertRole } from 'src/constants/role.constants'
import { convertTutorType } from 'src/constants/member.tutor.type.constants'
import { convertGenderType } from 'src/constants/gender.constants'

const Tutor = (props) => {
    const [small, setSmall] = useState(false)
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
                                <td className="td203">생년월일</td>
                                <td>{data.birth}</td>
                                <td className="td203">성별</td>
                                <td>{convertGenderType(data.gender)}</td>
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
                            {/* <tr>
                                <td className="td203">주소</td>
                                <td colSpan="3">reception</td>
                            </tr> */}

                            <tr>
                                <td className="td203">은행</td>
                                <td>{data.bank}</td>
                                <td className="td203">계좌번호</td>
                                <td>{data.accountNumber}</td>
                            </tr>
                            <tr>
                                <td className="td203">지도교사 유형</td>
                                <td colSpan="3">{convertTutorType(data.tutorType)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <CRow className="justify-content-center mt-5">
                        <CCol md="3">
                            <CButton
                                onClick={() => setSmall(!small)}
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

export default Tutor
