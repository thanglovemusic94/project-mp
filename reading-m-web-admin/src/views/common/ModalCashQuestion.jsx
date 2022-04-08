import {CButton, CModal, CModalBody} from "@coreui/react";
import React, {useEffect, useState} from "react";
import ModalAnswer from "./ModalAnswer";

import {CashRequirementService} from "../../services/CashRequirementService";

export default function ModalCashQuestion(props) {
    const {show, setShow, data, content, childModel, refeshGetByid, status} = props;
    const [showAnswer, setShowAnswer] = useState(false);
    const [showAnswerNonCash, setShowAnswerNonCash] = useState(false);

    const updateStatus = () =>
        CashRequirementService.patch(data.id, status)
        .then((res) => {
            console.log("success")
            setShow(!show)
            if (childModel) {
                if (status === 'NON_CASH')
                    setShowAnswerNonCash(!showAnswerNonCash)
                else
                    setShowAnswer(!showAnswer)
            }
            refeshGetByid();
        })
        .catch((err) => {
            console.log(err)
        })


    return (
        <>
            <CModal
                show={show}
                onClose={() => setShow(!show)}
                centered
                size="sm"
            >
                <CModalBody className="text-center">
                    <p>{content}</p>
                    <CButton
                        variant="outline"
                        color="dark"
                        onClick={() => setShow(!show)}
                        className="mx-2"
                    >
                        취소
                    </CButton>
                    <CButton
                        color="dark"
                        onClick={updateStatus}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>

            <ModalAnswer show={showAnswer}
                         setShow={setShowAnswer}
                         content={'환불 완료 상태로 변경되었습니다.'}
            />

            <ModalAnswer show={showAnswerNonCash}
                         setShow={setShowAnswerNonCash}
                         content={'환불 불가 상태로 변경되었습니다.'}
            />

        </>
    )
}
