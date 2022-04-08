import React, {useState} from "react";
import {CContainer, CHeader, CHeaderBrand} from "@coreui/react";
import FaqForm from "./FaqForm";

const FaqRegister = () => {
    const [data, setData] = useState({
        title: "",
        content: ""
    })


    return (
        <CContainer fluid>

            <CHeader>
                <CHeaderBrand className={'fw-bold'}>FAQ 등록</CHeaderBrand>
            </CHeader>
            <FaqForm data={data} setData={setData} />
        </CContainer>
    )
}

export default FaqRegister
