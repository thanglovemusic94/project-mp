import {CContainer, CHeader, CHeaderBrand,} from '@coreui/react'
import NoticeForm from "./NoticeForm";
import React, {useEffect, useState} from "react";
import {NoticeService} from "../../services/NoticeService";
import {useParams} from "react-router";

const EditNotification = () => {
    const {id} = useParams()
    const [data, setData] = useState({
        type: "",
        title:"",
        content:""
    })

    useEffect(() => {
        NoticeService.getById(id).then(r => {
            setData(r.data)
        })
    }, [id]);

    const isEdit = true;

    return (
        <CContainer fluid>

            <CHeader>
                <CHeaderBrand className={'fw-bold'}>공지사항 상세 및 수정</CHeaderBrand>
            </CHeader>
            <NoticeForm data={data} setData={setData} isEdit={isEdit}/>

        </CContainer>
    )
}

export default EditNotification
