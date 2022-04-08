import {CContainer, CHeader, CHeaderBrand,} from '@coreui/react'
import React, {useState} from "react";
import NoticeForm from "./NoticeForm";
import {TYPE_NOTICE} from "../../constants/TypeContaint";

const RegisterNotification = () => {
    const [data, setData] = useState({
        type: TYPE_NOTICE.GENERAL_ID,
        title:"",
        content:""
    })

    return (
        <CContainer fluid>

            <CHeader>
                <CHeaderBrand className={'fw-bold'}>공지사항 등록</CHeaderBrand>
            </CHeader>
            <NoticeForm data={data} setData={setData}/>
        </CContainer>
    )
}

export default RegisterNotification
