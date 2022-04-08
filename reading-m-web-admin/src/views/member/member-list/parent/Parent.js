import React, { useEffect, useState } from 'react'
import { CCardBody, CButton, CCard, CCol, CRow } from '@coreui/react'
import { MemberService } from 'src/services/MemberService'
import { trackPromise } from 'react-promise-tracker'
import { convertMemberType } from 'src/constants/member.type.constants'
import { convertRole } from 'src/constants/role.constants'
import { convertTutorType } from 'src/constants/member.tutor.type.constants'
import { convertGenderType } from 'src/constants/gender.constants'

const Parent = (props) => {
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
                            {/* <tr>
                                <td className="td203">주소</td>
                                <td colSpan="3">reception</td>
                            </tr> */}
                            
                            {
                                data.children.map((children, index) => {
                                    const indexNum = index + 1

                                    return (
                                        <>
                                            <tr>
                                                <td className="tdfull" colSpan="4">
                                                    자녀 {indexNum}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td203">자녀 이름</td>
                                                <td>{children.name}</td>
                                                <td className="td203">자녀 ID</td>
                                                <td>{children.id}</td>
                                            </tr>
                                            <tr>
                                                <td className="td203">자녀 학교</td>
                                                <td>{children.school}</td>
                                                <td className="td203">자녀 학년</td>
                                                <td>{children.grade}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
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

export default Parent
