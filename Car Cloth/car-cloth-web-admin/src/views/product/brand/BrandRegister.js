import React, {useState} from "react";
import {CContainer, CHeader, CHeaderBrand} from "@coreui/react";
import BrandForm from "./BrandForm";

const BrandRegister = () =>{
    const [data, setData] = useState({
        "attachFile": {
            "fileName": null,
            "objectKey": null
        },
        categoryId: null,
        "brandName": "",
        "connectionURL": "",
        "introduction": ""
    })

    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>브랜드 등록</CHeaderBrand>
            </CHeader>
            <BrandForm source={data} handler={setData}/>
        </CContainer>
    )
}

export default BrandRegister
