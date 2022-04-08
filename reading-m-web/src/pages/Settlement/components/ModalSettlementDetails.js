import { ClassType } from 'constants/class.constants'
import { SettlementConstants } from 'constants/settlement.constants'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { SettlementService } from 'services/SettlementService'
import FormattedDateTime from 'components/common/FormattedDateTime'

export default function ModalSettlementDetails(props) {
    const [data, setData] = useState({
        "settlement": {
            "amount": -1,
            "status": "",
            "liveClass": {
                "name": "",
                "type": "",
                "tuitionFee": -1,
                "tutor": {
                    "name": "",
                    "bank": "",
                    "bankAccount": ""
                },
                "openDate": ""
            },
            "fee": -1,
            "tax": -1,
            "settledDate": "",
            "pgFee": -1,
            "payerNumber": -1
        },
        "attend": []
    })

    useEffect(() => {

        if (props.show === true) {

            SettlementService.getTutorSettlementDetails(props.itemId).then((resp) => {

                if (resp.status === 200) {

                    setData(resp.data);
                }
            })
        }
    }, [props.show])

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => props.setShow(false)}
                dialogClassName="modalh-800 modal-settlement-details"
                size="xl"
                centered
            >
                <Modal.Body scrollable="true">
                    <div className="modal-body-inner">
                        <h2 className="page-title">정산 상세</h2>
                        <div className="settlement-table mb-4">
                            <div className="settlement-table-header">
                                <h3 className="bg-p600">정산 내역</h3>
                            </div>
                            <div className="settlement-table-body">
                                <div className="settlement-table-row  d-lg-flex no-gutters">
                                    <div className="col-12 col-lg-6">
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>정산상태</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>{SettlementConstants[`${data.settlement.status}`]}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>수업 개설일</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <FormattedDateTime 
                                                    source={data.settlement.liveClass.openDate}
                                                    format="YYYY.MM.DD"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>수업 종류</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>{ClassType[`${data.settlement.liveClass.type}`]?.label}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>교육비</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>{data.settlement.liveClass.tuitionFee} 원</span>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>수수료</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>{data.settlement.fee} 원</span>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>PG사 수수료</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>{data.settlement.pgFee} 원</span>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>은행</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>{data.settlement.liveClass.tutor.bank}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>정산 완료일</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                {
                                                    data.settlement.settledDate !== null ?
                                                        <FormattedDateTime 
                                                            source={data.settlement.settledDate}
                                                            format="YYYY.MM.DD"
                                                        />
                                                        :
                                                        <>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>지도교사 이름</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>{data.settlement.liveClass.tutor.name}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>수업명</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>
                                                    {data.settlement.liveClass.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>결제 인원</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>{data.settlement.payerNumber} 명</span>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>세금</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>{data.settlement.tax} 원</span>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>정산금액</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>{data.settlement.amount} 원</span>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="td col-4 bg-g100">
                                                <span>계좌번호</span>
                                            </div>
                                            <div className="td col-lg-8 text-left">
                                                <span>{data.settlement.liveClass.tutor.bankAccount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="settlement-table mb-4">
                            <div className="settlement-table-header">
                                <h3 className="bg-p600">수업 내역</h3>
                            </div>
                            <div className="settlement-table-body">
                                <div className="d-none d-lg-block">
                                    <div className="d-flex no-gutters bg-g100">
                                        <div className="td col-lg-3">
                                            <span>수업일시</span>
                                        </div>
                                        <div className="td col-lg-3">
                                            <span>지도교사 수업 여부</span>
                                        </div>
                                        <div className="td col-lg-3">
                                            <span>학생명</span>
                                        </div>
                                        <div className="td col-lg-3">
                                            <span>학생 출석 여부</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    data.attend.map((item, index) => {

                                        return (
                                            <ClassDetailsItem 
                                                key={`ClassDetailsItem_${index}`}
                                                source={item}
                                            />
                                        )
                                    })
                                }
                                </div>
                        </div>
                        <div className="text-center">
                            <Button
                                variant="g700"
                                className="btw-224"
                                onClick={() => props.setShow(false)}
                            >
                                확인
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

function ClassDetailsItem({ source }) {
    const { startTime, endTime, students, tutorPresent } = source;

    return (
        <div className="settlement-table-row d-lg-flex no-gutters">
            <div className="td col-12 col-lg-3 d-flex">
                <div className="td col-4 d-flex justify-content-center align-items-center d-lg-none bg-g100">
                    수업일시
                </div>
                <div className="w-100 d-flex align-items-center justify-content-center">
                    <FormattedDateTime 
                        source={startTime}
                        format="YYYY.MM.DD"
                    />
                </div>
            </div>
            <div className="td col-12 col-lg-3 d-flex">
                <div className="td col-4 d-flex justify-content-center align-items-center d-lg-none bg-g100">
                    지도교사 수업 여부
                </div>
                <div className="w-100 d-flex align-items-center justify-content-center">
                    { tutorPresent === true ? "수업 완료" : "수업 미완료" }
                </div>
            </div>
            <div className="col d-flex no-gutters">
                <div className="td col-4 d-flex d-lg-none bg-g100 align-items-center justify-content-center">
                    지도교사 수업 여부
                </div>
                <div className="td col-4 col-lg-6 py-0">
                    <ul className="reset-list">
                        {
                            students.map((item, index) => {

                                return (
                                    <li key={`student_name_${index}`}>{item.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="td col-4 col-lg-6 py-0">
                    <ul className="reset-list">
                        {
                            students.map((item, index) => {

                                return (
                                    <li 
                                        key={`student_present_${index}`}
                                        className="text-p500"
                                    >
                                        {/* 
                                            출석 전: pre attendance
                                            출석 완료: attendance complete    
                                            결석: absent 
                                        */}

                                        {item.present === true ? "출석 완료" : "결석"}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}