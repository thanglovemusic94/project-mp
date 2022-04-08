import {CButton, CContainer, CForm, CHeader, CHeaderBrand} from "@coreui/react";
import React, {useEffect, useState} from "react";
import HtmlEditor from "../../commons/HtmlEditor";
import tinymce from 'tinymce/tinymce';
import TermService from "../../services/TermService";
import PopupCommon from "../../commons/PopupCommon";
import {PopupConstant} from "../../constants/PopupConstant";
import { CommonMessage } from "../../constants/ErrorMessage";

const Terms = () => {

    const [showRequired, setShowRequired] = useState(false)
    const [show, setShow] = useState(false)
    const [contentNotify, setContentNotify] = useState("")
    const [showNotify, setShowNotify] = useState(false)
    const [data, setData] = useState({
        servicePolicy: null,
        privacyStatement: null,
        refundPolicy: null
    })

    useEffect(() => {
        TermService.getTermsPolicy().then(r => {
            setData(r.data)
        })
    }, [])

    const handleChangeContent = (e) => {
        const id = tinymce.activeEditor.id
        const val = tinymce.activeEditor.getContent()
        switch (id) {
            case 'service':
                setData({...data, servicePolicy: val})
                break
            case 'privacy':
                setData({...data, privacyStatement: val})
                break
            case 'refund':
                setData({...data, refundPolicy: val})
                break
            default:
                setData({...data})
        }
    }

    const checkValid = (item) => {
        if (item !== null && item.trim().length > 0) {
            return true;
        }
        return false;
    }

    const onsubmit = () => {
        if (checkValid(data.servicePolicy) && checkValid(data.privacyStatement) && checkValid(data.refundPolicy)) {
            TermService.updateTermsPolicy(data)
            .then((res) => {
                setShow(!show)
            })
            .catch(() => {
                setContentNotify(CommonMessage)
                setShowNotify(showNotify)
            })
        } else {
            setShowRequired(!showRequired)
        }
    };

    return (
        <>
            <CContainer fluid>

                    <CHeader className={'d-flex flex-wrap justify-content-between align-items-center'}>
                        <CHeaderBrand className={'fw-bold'}>약관&정책 관리</CHeaderBrand>

                        <CButton
                            className="btn btn-dark float-end "
                            onClick={onsubmit}
                        >
                            저장
                        </CButton>
                    </CHeader>

                <CForm action="" method="post" className="d-flex flex-wrap justify-content-end form-horizontal my-5">
                    <div className="col">
                        <label htmlFor="inputPassword" className="col-form-label mb-2"><h3>서비스 정책</h3></label>
                        <div className="flex-fill">
                            <HtmlEditor id={'service'} content={data.servicePolicy}
                                        handleChangeContent={handleChangeContent}/>
                        </div>
                    </div>
                </CForm>

                <CForm action="" method="post" className="d-flex flex-wrap justify-content-end form-horizontal my-5 ">
                    <div className="col">
                        <label htmlFor="inputPassword" className="col-form-label mb-2"><h3>개인정보 취급 방침</h3></label>
                        <div className="flex-fill">
                            <HtmlEditor id={'privacy'} content={data.privacyStatement}
                                        handleChangeContent={handleChangeContent}/>
                        </div>
                    </div>
                </CForm>

                <CForm action="" method="post" className="d-flex flex-wrap justify-content-end form-horizontal pb-5">
                    <div className="col">
                        <label htmlFor="inputPassword" className="col-form-label mb-2"><h3>환불 정책</h3></label>
                        <div className="flex-fill">
                            <HtmlEditor id={'refund'} content={data.refundPolicy}
                                        handleChangeContent={handleChangeContent}/>
                        </div>
                    </div>
                </CForm>

                <PopupCommon type={PopupConstant.YES} show={show} setShow={setShow} onClickYes={() => setShow(!show)}/>
                <PopupCommon  show={showRequired} setShow={setShowRequired}/>
                <PopupCommon
                type={PopupConstant.YES}
                show={showNotify}
                setShow={setShowNotify}
                content={contentNotify}
                onClickYes={() => setShowNotify(!showNotify)}
            />
            </CContainer>
        </>
    )
}

export default Terms
