import React, {useEffect, useState} from "react";
import {CContainer, CHeader, CHeaderBrand} from "@coreui/react";
import FaqForm from "./FaqForm";
import {FaqService} from "../../../services/FaqService";
import {useParams} from "react-router";

const FaqEdit = () =>{

    const {id} = useParams()
    const [data, setData] = useState({
        title:"",
        content:""
    })

    useEffect(() => {
        FaqService.getById(id).then(r => {
            setData(r.data)
        })
    }, [id]);

    const isEdit = true;

    return (
        <CContainer fluid>

            <CHeader>
                <CHeaderBrand className={'fw-bold'}>FAQ 상세 및 수정</CHeaderBrand>
            </CHeader>
            <FaqForm data={data} setData={setData} isEdit={isEdit} />
        </CContainer>
    )
}

export default FaqEdit
