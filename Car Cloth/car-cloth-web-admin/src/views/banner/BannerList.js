import {
    CButton,
    CContainer,
    CFormCheck,
    CFormInput, CHeader, CHeaderBrand,
    CTable,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from "@coreui/react";
import React, {useEffect, useState} from "react";
import BannerUpload from "./BannerUpload";
import BannerService from "../../services/BannerService";
import {PopupConstant} from "../../constants/PopupConstant";
import PopupCommon from "../../commons/PopupCommon";
import {handleChangeDataArray} from "../../utils/StateUtils";
import StorageService from "../../services/StorageService";
import { UploadMessage } from "../../constants/ErrorMessage";

const BannerList = () => {

    const [show, setShow] = useState(false)
    const [showRequired, setShowRequired] = useState(false)
    const [showNotify, setShowNotify] = useState(false)
    const [contentNotify, setContentNotify] = useState("")
    const [data, setData] = useState()
    const [arrFile, setArrFile] = useState()
    useEffect(() => {
        fetchData()
    },[])

    const fetchData = () => {
        const emptyBanner = {
            status: "HIDE",
            imgUrl: "",
            connectionLink: ""
        }

        BannerService.list().then(r => {
            let data = r.data
            if(r.data.length === 0) {
                data.push({...emptyBanner, position: 1})
                data.push({...emptyBanner, position: 2})
            }
            setArrFile(new Array(data.length).fill(null))
            setData(data)
        })
    }

    const onsubmit = () => {
        if (data) {
            const validConnectionLink = data.filter(v => v.connectionLink.trim().length === 0)[0]
            if (validConnectionLink) {
                setShowRequired(!showRequired)
            } else if(validatedImages()) {
                data.map((v) => {
                    if (v.hasOwnProperty('imgChanged') === false) {
                        v.imgChanged = false
                    }
                    delete v['imgUrl']
                    return v
                })

                BannerService.upload(data).then((res) => {
                    if (res.data.length > 0){
                        for (let i = 0; i < res.data.length; i++) {
                            if (arrFile[res.data[i].position - 1]){
                                StorageService.upload(res.data[i].url, arrFile[res.data[i].position - 1])
                                .then(() => setShow(!show))
                                .catch((err) => {
                                    console.log(err)
                                    setContentNotify(UploadMessage)
                                    setShowNotify(!showNotify)
                                })
                            }
                        }
                    } else {
                        setShow(!show)
                    }
                })
            }
        }
    };

    const validatedImages = () => {
        for (let i = 0; i < arrFile.length; i++) {
            if (!arrFile[i] && data[i]['imgChanged']) {
                setShowRequired(!showRequired)
                return false
            }
        }

        return true
    }

    return (
        <>
            <CContainer fluid>
                <CHeader>
                    <CHeaderBrand className={'fw-bold'}>배너 관리</CHeaderBrand>
                </CHeader>
                <CTable bordered className="table text-center my-5">
                    <CTableHead color={'secondary'}>
                        <CTableRow>
                            <CTableHeaderCell style={{width: '10%'}}>순서</CTableHeaderCell>
                            <CTableHeaderCell style={{width: '40%'}}>배너 이미지</CTableHeaderCell>
                            <CTableHeaderCell style={{width: '15%'}}>노출상태</CTableHeaderCell>
                            <CTableHeaderCell>연결링크</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <tbody>

                    {data && data.map((value, index) => {
                        return (
                            <React.Fragment key={index}>
                                <CTableRow>
                                    <CTableDataCell className={'align-middle'}>{index + 1}</CTableDataCell>
                                    <CTableDataCell className={'align-middle '}>
                                        <BannerUpload
                                            urlImage={value.imgUrl}
                                            index={index}
                                            data={data}
                                            setData={setData}
                                            arrFile={arrFile}
                                            setArrFiles={setArrFile}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell
                                        className={'align-middle justify-content-evenly'}
                                    >
                                        <form>
                                            <CFormCheck inline type="radio"
                                                        name={'status'}
                                                        value="SHOW"
                                                        id={`expose_${index}`}
                                                        defaultChecked={value.status === "SHOW"}
                                                        onChange={(e) => handleChangeDataArray(e, index, data, setData)}
                                                        label="노출"/>

                                            <CFormCheck inline type="radio"
                                                        name={'status'}
                                                        id={`hide_${index}`}
                                                        value="HIDE"
                                                        defaultChecked={value.status === "HIDE"}
                                                        onChange={(e) => handleChangeDataArray(e, index, data, setData)}
                                                        label="숨김"/>
                                        </form>

                                    </CTableDataCell>
                                    <CTableDataCell className={'align-middle'}>
                                        <CFormInput
                                            type="text"
                                            style={{"overflow": "hidden", "textOverflow": "ellipsis"}}
                                            defaultValue={value.connectionLink}
                                            name="connectionLink"
                                            onChange={(e) => handleChangeDataArray(e, index, data, setData)}
                                            required
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                            </React.Fragment>
                        )
                    })}

                    </tbody>
                </CTable>

                <div className="d-flex flex-wrap justify-content-end">
                    <CButton
                        className={'btn btn-dark '}
                        onClick={onsubmit}
                    >
                        저장
                    </CButton>

                </div>

                <PopupCommon type={PopupConstant.YES} show={show} setShow={setShow}
                             onClickYes={() => setShow(!show)}/>

                <PopupCommon show={showRequired} setShow={setShowRequired}/>

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


export default BannerList
