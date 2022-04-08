import {CButton, CModal, CModalBody} from "@coreui/react";
import React, {useState} from "react";
import {RefundService} from "../../services/RefundService";
import {useParams} from "react-router-dom";

export default function ModalAnswer(props){
    const {show, setShow, content} = props;

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
                        color="dark"
                        onClick={() => setShow(!show)}
                        className="mx-2"
                    >
                        확인
                    </CButton>
                </CModalBody>
            </CModal>

        </>
    )
}
