import React, {useEffect, useState} from 'react'
import { CButton, CCol, CModal, CModalBody, CRow } from '@coreui/react'
import {trackPromise} from 'react-promise-tracker'
import DateTime from "../../../common/DateTime"
import { ClassService } from 'src/services/ClassService'

const ModalAttenDetail = (props) => {
    const [data, setData] = useState()
    const classId = props.classId

    useEffect(() => {
        if (classId > 0) {
            trackPromise(       
                ClassService.getAttendById(classId).then(res => {
                    setData(res.data)
                }).catch(err => console.log(err))       
            )  
        }             
    }, [classId])

    return (
        <>
            <CModal
                show={props.show}
                onClose={() => props.setModalAttenDetail(false)}
                centered
                size="lg"
            >
                <CModalBody>
                    <h3 className="text-center mt-2 mb-4">출석 상세</h3>
                    <table className="table text-center table-bordered">
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>수업일시</th>
                                <th style={{ width: '25%' }}>
                                    지도교사 수업 여부
                                </th>
                                <th style={{ width: '25%' }}>학생명</th>
                                <th style={{ width: '25%' }}>학생 출석 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data && data.map((item, index) => (
                                <>                               
                                <tr>
                                    <td rowSpan={item.students.length + 1} className="align-middle text-center">
                                        <DateTime date={item.startTime} format="YYYY.MM.DD ddd h:mm a"/> -
                                        <DateTime date={item.endTime} format="h:mm a"/>
                                    </td>
                                    <td rowSpan={item.students.length + 1} className="align-middle text-center">
                                        {item.tutorPresent ? "예" : "아니"}
                                    </td> 
                                </tr>   
                                {item.students.map((std, idx) => (
                                    <>
                                    <tr>
                                        <td>{std.name}</td>
                                        <td>{std.present ? "예" : "아니"}</td>
                                    </tr>
                                    </>
                                ))}    
                                                            
                                </>                                
                            ))
                        }
                        </tbody>
                    </table>
                    <CRow className="justify-content-center mt-5 mb-2">
                        <CCol md="3">
                            <CButton
                                block
                                color="dark"
                                onClick={() => props.setModalAttenDetail(false)}
                            >
                                확인
                            </CButton>
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        </>
    )
}

export default ModalAttenDetail
