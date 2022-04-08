import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../App";
import {ConstructionRegisterContext} from "../../context/construction-register/ConstructionRegisterProvider";
import {CONSTRUCTION_REGISTER_TYPE} from "../../context/construction-register/ConstructionRegisterType";
import {Localizations} from "../../texts/Localizations";
import CompanyService from "../../services/CompanyService";
import {CloseIcon, PictureIcon} from "../../assets/svgs/Icons";
import {Form, Image} from "react-bootstrap";
import ErrorCommon from "../../components/popups/ErrorCommon";
import {SessionStorageManager} from "../../managers/SessionStorageManager";

const ConstructionExampleEditPage = () => {
    const idCompany =  SessionStorageManager.getMemberInfo()?.companyId
    const [companyInfor, setCompanyInfor]  = useState()
    const {showNoticePopup, isPlatformIOS} = useContext(AppContext);
    const {state, dispatch} = useContext(ConstructionRegisterContext);

    const maxAttachments = 4;
    const [attachedImages, setAttachedImages] = useState([]);
    const [attachmentsRefreshKey, setAttachmentsRefreshKey] = useState(Date.now);

    function handleAttachmentsChange(event) {
        const files = event.currentTarget.files;

        if (files.length <= maxAttachments) {
            if (attachedImages.length + files.length <= maxAttachments) {
                let newSelectedImages = [];
                let listFile = [...state.attachedImages];
                // state.data.images = []
                for (let i = 0; i < files.length; i++) {
                    newSelectedImages.push({
                        thumbnail: URL.createObjectURL(files[i]),
                        fileName: files[i].name,
                        content: files[i],
                    });
                    listFile.push(files[i]);
                    state.data.images.push(files[i].name)
                }
                setAttachedImages([...attachedImages, ...newSelectedImages]);
                setAttachmentsRefreshKey(Date.now);
                dispatch({type: CONSTRUCTION_REGISTER_TYPE.SET_CONSTRUCTION, payload: {...state, attachedImages: listFile}})
            }
        } else {
            showNoticePopup(
                Localizations.QuoteRequest.MaximumImageAttachmentsExceeded
            );
        }
    }

    function handleRemoveAttachment(index) {
        let newAttachedImages = [...attachedImages];

        newAttachedImages.splice(index, 1);
        state.attachedImages.splice(index, 1);
        state.data.images.splice(index, 1);
        setAttachedImages(newAttachedImages);
        dispatch({type: CONSTRUCTION_REGISTER_TYPE.SET_CONSTRUCTION, payload: {...state, attachedImages: newAttachedImages}})
    }

    const handleChange = (e) => {
        const {value} = e.target
        dispatch({type: CONSTRUCTION_REGISTER_TYPE.SET_CONSTRUCTION, payload: {...state, data: {...state.data, content: value}}})
    }

    useEffect(() => {

        if (idCompany){
            CompanyService.getCompanyInfo(idCompany).then(res => {
                setCompanyInfor(res.data)
            }).catch(e => ErrorCommon(showNoticePopup, e));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(state)
    return (
        <>
            <div className="cc-body d-flex flex-column vh-100 contruction-register-page">
                <div className="overflow-auto mx-n3 h-100">
                    <div className="d-flex flex-column p-3 pb-0 h-100">
                        {
                            isPlatformIOS.current === true 
                                ? <div className="nav-header">{` `}</div>
                                : <></>
                        }                        
                        <div className="flex-grow-1 d-flex flex-column">
                            <div className="py-3 px-12px cc-shadow rounded-4px">
                                <h3 className="fs-17 fw-bold">{companyInfor?.companyName}</h3>

                                {/*<div className="fs-14">*/}
                                {/*    <span className="">{idQuote.brand + " " + idQuote.model} </span>*/}
                                {/*    <span className="text-black-400">{idQuote.carType}</span>*/}
                                {/*</div>*/}
                                <div className="fs-13 text-black-600">
                                    <span className="">시공완료일</span>
                                    {state?.completeDate &&
                                    <span>
                                        <span className="px-1">|</span>
                                        {/*<span*/}
                                        {/*    className="">{Format.datetime(idQuote.completeDate, 'YYYY.MM.DD')}</span>*/}
                                    </span>
                                    }
                                </div>
                            </div>
                            <div className="py-3 flex-grow-1">
                                <textarea placeholder="시공 내용을 입력해주세요."
                                          value={state.data.content}
                                          onChange={handleChange}
                                          className="form-control h-100 border-0 p-0"
                                          style={{'resize': 'none'}}></textarea>
                            </div>

                        </div>
                        <div className="pb-3">
                            <div className="thumbnail dashed position-relative bg-blue-50 text-center p-3 mb-1">
                                <PictureIcon/>
                                <div className="fs-7 text-black-300 mt-1">
                                    {attachedImages.length}/{maxAttachments}
                                </div>
                                <Form.Label
                                    className="position-absolute top-0 left-0 w-100 h-100 translate-middle-x"
                                    htmlFor="attachments"
                                ></Form.Label>
                                <Form.Control
                                    key={attachmentsRefreshKey}
                                    id="attachments"
                                    type="file"
                                    onChange={handleAttachmentsChange}
                                    multiple
                                    hidden
                                />
                            </div>
                            <p className="text-black-300 fs-7 mb-2">
                                {Localizations.QuoteRequest.PleaseAttachAtleastOnePhoto}
                            </p>
                            <div className="d-flex flex-wrap">
                                {state.data.images.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="position-relative thumbnail mb-1 me-1"
                                        >
                                            <Image src={item.objectKey}/>
                                            <div
                                                className="position-absolute top-0 w-100 text-end"
                                                onClick={() => handleRemoveAttachment(index)}
                                            >
                                                <CloseIcon/>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConstructionExampleEditPage
