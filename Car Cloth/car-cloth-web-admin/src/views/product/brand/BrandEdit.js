import React, {useState} from "react";
import {CContainer, CHeader, CHeaderBrand} from "@coreui/react";
import BrandForm from "./BrandForm";
import {useLocation} from "react-router";

const BrandEdit = () =>{
    const {state} = useLocation();

    const [data, setData] = useState({
        "attachFile": {
            "fileName": state.attachFile.fileName,
            "objectKey": state.attachFile.objectKey
        },
        "brandName": state.brandName,
        "categoryId": state.category.id,
        "connectionURL": state.connectionURL,
        "id": state.id,
        "introduction": state.introduction
    })
    const isEdit = true;

    return (
        <CContainer fluid>

            <CHeader>
                <CHeaderBrand className={'fw-bold'}>브랜드 상세 및 수정</CHeaderBrand>
            </CHeader>
            <BrandForm source={data} handler={setData} isEdit={isEdit}/>
        </CContainer>
    )
}

export default BrandEdit
