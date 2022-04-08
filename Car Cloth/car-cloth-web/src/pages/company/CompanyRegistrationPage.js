import {useContext, useEffect, useRef, useState} from "react";
import {useHistory} from "react-router";
import {AppContext} from "../../App";
import {
    AttachFileLabel,
    CompanyNameLabel,
    ContactLabel,
    RepresentativeNameLabel,
    WorkingTimeLabel
} from "../../assets/svgs/CompanyIcons";
import AttachFile from "../../components/base/AttachFile";
import ConstructableType from "../../components/pages/construct-type/ConstructableType";
import {MY_PAGE} from "../../constants/RouteConstants";
import CompanyService from "../../services/CompanyService";
import {Localizations} from "../../texts/Localizations";
import {S3Utils} from "../../utils/S3Utils";
import WrapperContent from "../../components/layouts/WrapperContent";
import CButtonPosition from "../../components/buttons/CButtonPosition";
import InputForm from "../../components/datetimes/InputForm";
import {EntryRouteConstants} from "../../constants/EntryRouteConstants";
import CheckBox from "../../components/base/CheckBox";
import {EntryRouteLabel} from "../../assets/svgs/CheckBoxIcon";
import ErrorCommon from "../../components/popups/ErrorCommon";

function CompanyRegistrationPage() {
    const history = useHistory()
    const {showInfoPopup, showKakaoMapPopup, showNoticePopup} = useContext(AppContext);
    const [data, setData] = useState({
        "address": {
            "address": "",
            "addressDetail": "",
            "lat": 0,
            "lon": 0,
            "postCode": ""
        },
        "attachFile": {
            "fileName": "",
            "objectKey": ""
        },
        "companyName": "",
        "constructableType": {
            "blackBox": false,
            "glassFilm": false,
            "newCarPackage": false,
            "polish": false,
            "ppf": false,
            "tinting": false,
            "windShield": false,
            "wrapping": false
        },
        "contact": "",
        "entryRoute": {
            "advertisement": false,
            "recommendedByFriend": false,
            "search": false
        },
        "representativeName": "",
        "workingTime": ""
    })

    const [file, setFile] = useState();

    const isCompanyReapply = useRef(false);

    useEffect(() => {
        const registeredData = history.location.state;

        if (registeredData) {
            isCompanyReapply.current = true;

            const newData = { ...registeredData['data'] };

            setData(newData);
        }
        
        // eslint-disable-next-line
    }, []);

    const handleChangeConstructType = (name, checked) => {
        let constructableType = {...data.constructableType}
        constructableType[name] = checked
        setData({...data, constructableType: constructableType})
    }

    const onChangeText = (e) => {
        const {name, value} = e.target;
        if (name === 'addressDetail') {
            setData({...data, address: {...data.address, [name]: value}})
        } else {
            setData({...data, [name]: value})
        }
    }

    const uploadFile = (e) => {
        setFile(e)

        if (e) {
            setData({
                ...data, attachFile: {
                    "fileName": e.name,
                    "objectKey": ""
                }
            })
        } else {
            setData({
                ...data, attachFile: {
                    "fileName": "",
                    "objectKey": ""
                }
            })
        }

    }

    const handleChangeEntryRoute = (name, checked) => {
        let entryRoute = {...data.entryRoute}
        entryRoute[name] = checked
        setData({...data, entryRoute: entryRoute})
    }

    const register = () => {
        const {error, field} = checkValidate()
        if (error === true) {
            if (field === 'constructableType') {
                showInfoPopup(
                    "",
                    <div>
                        {/* <div className={'fs-17 fw-medium lh-22'}>
                            시공 가능 유형 미 선택 시
                        </div> */}
                        <div>시공가능한 유형을 선택해주세요</div>
                    </div>
                )

            } else if (field === 'companyName') {
                showInfoPopup(
                    "",
                    <div>
                        {/* <div className={'fs-17 fw-medium lh-22'}>
                            업체명 미 입력 시
                        </div> */}
                        <div>업체명을 입력해 주세요</div>
                    </div>
                )
            } else if (field === 'address') {
                showInfoPopup(
                    "",
                    <div>
                        {/* <div className={'fs-17 fw-medium lh-22'}>
                            시공유형 미 선택 시
                        </div> */}
                        <div>업체 주소를 입력해 주세요</div>
                    </div>
                )
            } else if (field === 'representativeName') {
                showInfoPopup(
                    "",
                    <div>
                        {/* <div className={'fs-17 fw-medium lh-22'}>
                            대표자 성함 미 입력 시
                        </div> */}
                        <div>대표자 성함을 입력해 주세요</div>
                    </div>
                )
            } else if (field === 'contact') {
                showInfoPopup(
                    "",
                    <div>
                        {/* <div className={'fs-17 fw-medium lh-22'}>
                            대표자 전화번호 미 입력 시
                        </div> */}
                        <div>대표자 전화번호를 입력해 주세요</div>
                    </div>
                )
            } else if (field === 'workingTime') {
                showInfoPopup(
                    "",
                    <div>
                        {/* <div className={'fs-17 fw-medium lh-22'}>
                            업체 운영시간 미 입력 시
                        </div> */}
                        <div>업체 운영시간을 입력해 주세요</div>
                    </div>
                )
            } else if (field === 'file') {
                showInfoPopup(
                    "",
                    <div>
                        {/* <div className={'fs-17 fw-medium lh-22'}>
                            사업자등록증 미 첨부 시
                        </div> */}
                        <div>사업자등록증을 첨부해 주세요</div>
                    </div>
                )
            }
        }else {
            if (isCompanyReapply.current === false) {

                CompanyService.register(data).then((resp) => {
                    if (resp.status === 201) {
                        const attachFile = resp.data
                        //Push attach file to S3
                        S3Utils.upload(attachFile.objectKey, file)
                        showInfoPopup(
                            "",
                            <div>
                                {/* <div className={'fs-17 fw-medium lh-22'}>
                                    등록 신청 완료 시
                                </div> */}
                                <div>업체 등록 신청 완료<br/>관리자 확인 후 연락 드리겠습니다.</div>
                            </div>,
                            () => {
                                history.push({
                                    pathname: MY_PAGE
                                })
                            })
                    }
                }).catch((error) => {
                    if(error.response?.data?.message) {
                        showNoticePopup(error.response.data.message)
                    } else {
                        return ErrorCommon(showNoticePopup, error)
                    }
                })
            } else {

                CompanyService.reApply(data).then(res => {
                    
                    if (res.status === 200) {

                        if (file) {
                            //Push attach file to S3
                            S3Utils.upload(res.data.objectKey, file)
                        }

                        showInfoPopup(
                            "",
                            <div>
                                <div>업체 등록 신청 완료<br/>관리자 확인 후 연락 드리겠습니다.</div>
                            </div>,
                            () => {
                                history.push({
                                    pathname: MY_PAGE
                                })
                            })
                    }
                }).catch(e => ErrorCommon(showNoticePopup, e));
            }
        }
    }


    const styleClassIndex = (index) => {
        if (index === 0)
            return "text-start"
        else if (index === EntryRouteConstants.length - 1) {
            return "text-end"
        } else {
            return "text-center"
        }
    }

    const checkValidate = () => {
        const checkConstruction = Object.entries(data.constructableType).filter(value => value[1] === true)
        if (checkConstruction.length === 0) return {error: true, field: 'constructableType'}
        else if (data.companyName.trim().length === 0 ) return {error: true, field: 'companyName'}
        else if (data.address.addressDetail.trim().length === 0 || data.address.address.trim().length === 0)
            return {
                error: true,
                field: 'address'
            }
        else if (data.representativeName.trim().length === 0) return {error: true, field: 'representativeName'}
        else if (data.contact.trim().length === 0) return {error: true, field: 'contact'}
        else if (data.workingTime.trim().length === 0) return {error: true, field: 'workingTime'}
        else if (data.attachFile.objectKey === "" && (file === undefined || file === '')) return {error: true, field: 'file'}
        else return {error: false, field: null}
    }

    const onShowKakaoMap = (e, status) => {
        if (status === 'search') {
            showKakaoMapPopup(null, (value) => {
                if (value.address) {
                    setData({
                        ...data,
                        address: {
                            ...data.address,
                            address: value.address,
                            lat: value.lat,
                            lon: value.lng,
                            postCode: value.zip_code
                        }
                    })
                }
            })
        }
        else {
            showKakaoMapPopup({ lat: data.address.lat, lng: data.address.lon, address: data.address.address }, (value) => {
                if (value.address) {
                    setData({
                        ...data,
                        address: {
                            ...data.address,
                            address: value.address,
                            lat: value.lat,
                            lon: value.lng,
                            postCode: value.zip_code
                        }
                    })
                }
            })
        }
    }

    return (
        <>
            <WrapperContent className={'p-3 bg-blue-50'} hasHeader={true} hasFooter={true} content={
                <>
                    <div className="">
                        <div className={'fs-14 mb-2'}>
                            시공가능한 유형 <span className={'text-blue'}>*</span> <span
                            className={'text-black-400'}>(복수선택 가능)</span>
                        </div>
                        <div className={'row row-cols-3 g-2'}>
                            <ConstructableType
                                data={data.constructableType}
                                handleChange={handleChangeConstructType}/>
                        </div>
                    </div>

                    <InputForm
                        defaultValue={data.companyName}
                        name={'companyName'}
                        onChange={onChangeText}
                        label={<CompanyNameLabel/>}
                        maxLength={20}
                    />

                    <InputForm
                        label={<div className={'fs-14 '}>
                            업체 주소 <span className={'text-blue'}>*</span>
                        </div>}
                        render={
                            <>
                                <div className={'row align-items-center justify-content-between mb-6px'}>
                                    <div className="col-5">
                                        <div
                                            style={{cursor: "pointer"}}
                                            className={'bg-white d-inline-block border-black-800 rounded-8px text-black-800  selected__address fs-14'}
                                            onClick={(e) => onShowKakaoMap(e, 'search')}
                                        >
                                            <svg width="94" height="44" viewBox="0 0 94 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="93" height="43" rx="7.5" fill="white" stroke="#434343" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M81 22L76 27L75.3 26.3L79.6 22L75.3 17.7L76 17L81 22Z" fill="#262626" />
                                                <path d="M13.428 20.672L13.862 21.582C14.3567 21.498 14.8327 21.372 15.29 21.204C15.7567 21.036 16.186 20.8307 16.578 20.588C16.9793 20.336 17.3387 20.056 17.656 19.748C17.9733 19.4307 18.23 19.0853 18.426 18.712C18.6127 19.0853 18.8647 19.4307 19.182 19.748C19.4993 20.056 19.8587 20.336 20.26 20.588C20.6613 20.8307 21.0953 21.036 21.562 21.204C22.0287 21.372 22.5047 21.498 22.99 21.582L23.438 20.672C22.8873 20.588 22.346 20.4433 21.814 20.238C21.2913 20.0233 20.8247 19.7667 20.414 19.468C20.0033 19.16 19.672 18.8193 19.42 18.446C19.1773 18.0633 19.056 17.6667 19.056 17.256V17.186H22.99V16.262H13.82V17.186H17.782V17.256C17.782 17.6667 17.656 18.0633 17.404 18.446C17.1613 18.8193 16.8347 19.16 16.424 19.468C16.0133 19.7667 15.5467 20.0233 15.024 20.238C14.5107 20.4433 13.9787 20.588 13.428 20.672ZM18.972 23.57H24.11L24.096 22.632H12.756V23.57H17.824V28.036H18.972V23.57ZM35.6469 22.562L36.1369 21.61C35.5862 21.5167 35.0356 21.3393 34.4849 21.078C33.9436 20.8073 33.4536 20.4807 33.0149 20.098C32.5762 19.706 32.2216 19.272 31.9509 18.796C31.6802 18.3107 31.5449 17.8067 31.5449 17.284V16.318H30.3409V17.284C30.3409 17.8067 30.2056 18.3107 29.9349 18.796C29.6642 19.272 29.3096 19.706 28.8709 20.098C28.4416 20.4807 27.9516 20.8073 27.4009 21.078C26.8596 21.3393 26.3136 21.5167 25.7629 21.61L26.2389 22.562C26.7242 22.4593 27.2002 22.3053 27.6669 22.1C28.1429 21.8853 28.5862 21.6287 28.9969 21.33C29.4169 21.0313 29.7949 20.6907 30.1309 20.308C30.4669 19.9253 30.7376 19.51 30.9429 19.062C31.1482 19.51 31.4189 19.9253 31.7549 20.308C32.0909 20.6907 32.4642 21.0313 32.8749 21.33C33.2949 21.6287 33.7429 21.8853 34.2189 22.1C34.6949 22.3053 35.1709 22.4593 35.6469 22.562ZM36.6969 26.398V25.46H31.5169V22.408H30.3689V25.46H25.3009V26.398H36.6969ZM51.0027 22.646V15.478H49.8547V18.712H47.1247V19.65H49.8547V22.646H51.0027ZM47.1107 16.276H41.4407V17.214H45.8927C45.7713 18.2873 45.2767 19.2207 44.4087 20.014C43.5407 20.798 42.3413 21.4047 40.8107 21.834L41.2867 22.73C42.1827 22.478 42.99 22.1513 43.7087 21.75C44.4273 21.3393 45.0387 20.8633 45.5427 20.322C46.0467 19.7713 46.434 19.16 46.7047 18.488C46.9753 17.8067 47.1107 17.0693 47.1107 16.276ZM51.0027 23.178H42.8967V27.854H51.0027V23.178ZM49.8827 26.93H44.0307V24.088H49.8827V26.93ZM63.8276 23.08V15.492H62.7216V18.754H61.1256V15.702H60.0336V22.996H61.1256V19.692H62.7216V23.08H63.8276ZM58.8996 22.296L59.5156 21.428C59.1142 21.2693 58.7549 21.064 58.4376 20.812C58.1202 20.56 57.8542 20.28 57.6396 19.972C57.4249 19.6547 57.2569 19.3233 57.1356 18.978C57.0236 18.6233 56.9676 18.2687 56.9676 17.914V16.22H55.8616V17.914C55.8616 18.2687 55.8009 18.6327 55.6796 19.006C55.5582 19.3793 55.3856 19.7387 55.1616 20.084C54.9376 20.4293 54.6622 20.7467 54.3356 21.036C54.0182 21.316 53.6542 21.5493 53.2436 21.736L53.8596 22.618C54.4756 22.3473 54.9982 21.9647 55.4276 21.47C55.8662 20.966 56.1976 20.4153 56.4216 19.818C56.6456 20.3593 56.9676 20.8493 57.3876 21.288C57.8076 21.7173 58.3116 22.0533 58.8996 22.296ZM63.8276 23.766H55.3856V24.69H62.6796V28.036H63.8276V23.766Z" fill="#262626" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={'col-7'}>
                                        <div className={'fw-light d-flex align-items-center justify-content-end'}
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => onShowKakaoMap(e, 'show')}
                                        >
                                            <span>

                                                {data.address.address}
                                            </span>

                                            {
                                                data.address.address.trim().length > 0 &&
                                                <span className={'ms-2 me-1'} style={{ verticalAlign: "text-top" }}>
                                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M6.00005 5L1.00005 10L0.300049 9.3L4.60005 5L0.300048 0.7L1.00005 -3.0598e-08L6.00005 5Z"
                                                            fill="#262626" />
                                                    </svg>
                                                </span>
                                            }

                                        </div>
                                    </div>
                                </div>

                                <input
                                    defaultValue={data.address.addressDetail}
                                    name={'addressDetail'}
                                    onChange={onChangeText}
                                    type="text"
                                    className="text-black-800 p-12px form-control rounded-8px lh-21 border-black-700 fs-14"
                                    maxLength={20}
                                />
                            </>
                        }
                    />

                    <InputForm
                        defaultValue={data.representativeName}
                        name={'representativeName'}
                        onChange={onChangeText}
                        label={<RepresentativeNameLabel />}
                    />

                    <InputForm
                        defaultValue={data.contact}
                        name={'contact'}
                        onChange={onChangeText}
                        label={<ContactLabel />}
                    />

                    <InputForm
                        defaultValue={data.workingTime}
                        name={'workingTime'}
                        rows={2}
                        as={'textarea'}
                        onChange={onChangeText}
                        placeholder={"예) 평일 10:00~20:00 / 주말 10:00~15:00"}
                        label={<WorkingTimeLabel/>}
                        maxLength={50}
                    />


                    <AttachFile
                        label={<AttachFileLabel />}
                        labelBtn={"파일 첨부"}
                        fileName={data.attachFile.fileName}
                        uploadFile={uploadFile}
                    />

                    <InputForm
                        render={
                            <>
                                <div className={'row row-cols-3 gx-0'}>
                                    {
                                        EntryRouteConstants.map((v, i) => {
                                            return (
                                                <CheckBox
                                                    key={i}
                                                    className={styleClassIndex(i)}
                                                    label={v.label}
                                                    prop={v.prop}
                                                    checked={data.entryRoute[v.prop]}
                                                    handleChange={handleChangeEntryRoute}
                                                    isDisable={false}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                        name={'contact'}
                        label={<EntryRouteLabel />}
                    />

                    <CButtonPosition className={'mt-3'} disabledPosition={true}
                        text={Localizations.Company.BtnRegister} onClick={register} />
                </>
            } />

        </>
    )
}

export default CompanyRegistrationPage;
