import WrapperContent from "../../components/layouts/WrapperContent";
import ConstructableType from "../../components/pages/construct-type/ConstructableType";
import InputForm from "../../components/datetimes/InputForm";
import AttachFile from "../../components/base/AttachFile";
import CButtonPosition from "../../components/buttons/CButtonPosition";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../App";
import {useHistory} from "react-router-dom";
import CompanyService from "../../services/CompanyService";
import {COMPANY, MY_PAGE} from "../../constants/RouteConstants";
import {S3Utils} from "../../utils/S3Utils";
import ErrorCommon from "../../components/popups/ErrorCommon";
import {SessionStorageManager} from "../../managers/SessionStorageManager";

const CompanyInforEditPage = () => {
    const userInfo = SessionStorageManager.getMemberInfo();
    const {showInfoPopup, showConfirmPopup,  showKakaoMapPopup, showNoticePopup} = useContext(AppContext);
    const [data, setData] = useState()
    const history = useHistory();

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


    const [file, setFile] = useState(null);
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


    useEffect(() => {
        if (userInfo.hasOwnProperty('companyId'))
            CompanyService.getCompanyInfo(userInfo?.companyId).then(res => {
                setData(res.data)
            }).catch(e => ErrorCommon(showNoticePopup, e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo.hasOwnProperty('companyId')])


    const onWithDrawCompany = () => {
        showConfirmPopup(
            '', 
            <>
                <span>
                    입점 철회 하시겠습니까? 
                </span>
                <br />
                <span>
                    업체 정보가 삭제되며 복구되지 않습니다.
                </span>
            </>
            ,
            () => {
            CompanyService.withdraw().then(res => {
                if (res.status === 200){
                    history.push(MY_PAGE)
                }
            }).catch(e => ErrorCommon(showNoticePopup, e));
        })
    }

    const onSave = () => {
        const {error, field} = checkValidate()

        if (error === true) {
            if (field === 'constructableType') {
                showInfoPopup(
                    "",
                    <div>
                        {/* <div className={'fs-17 fw-medium lh-22'}>
                            시공 가능 유형 미 선택 시
                        </div> */}
                        <div>시공 가능한 유형을 선택 해주세요</div>
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
        } else {
            ['average', 'constructionExamples', 'constructionQuality',
                'explainProduct', 'kindness', 'processingStatus', 'totalReview'
            ].forEach(value => {
                delete data[value]
            })
            CompanyService.updateCompanyInfor(data).then(res => {
                if (res.status === 200) {
                    if (file === null) {
                            history.push({pathname: COMPANY.COMPANY_INFOR, state: userInfo.companyId})
                    } else {
                        S3Utils.upload(res.data.objectKey, file).then(() =>
                            history.push({pathname: COMPANY.COMPANY_INFOR, state: userInfo.companyId})
                        )
                    }
                }
            }).catch(e => ErrorCommon(showNoticePopup, e));
        }
    }


    const checkValidate = () => {
        const checkConstruction = Object.entries(data.constructableType).filter(value => value[1] === true)

        if (checkConstruction.length === 0) return {error: true, field: 'constructableType'}
        else if (data.companyName.trim().length === 0) return {
            error: true,
            field: 'companyName'
        }
        else if (data.address.addressDetail.trim().length === 0)
            return {
                error: true,
                field: 'address'
            }

        else if (data.workingTime.trim().length === 0) return {
            error: true,
            field: 'workingTime'
        }
        else if (file === undefined || file === '') return {error: true, field: 'file'}
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
        } else {
            showKakaoMapPopup({
                lat: data.address.lat,
                lng: data.address.lon,
                address: data.address.address
            }, (value) => {
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
            {
                data &&
                <WrapperContent className={'bg-blue-50 '} hasFooter={true} content={
                    <>
                        <div className="">
                            <div className={'fs-14 mb-2'}>
                                시공가능한 유형 <span className={'text-blue'}>*</span> <span
                                className={'text-black-400'}>(복수선택 가능)</span>
                            </div>
                            <div className={'row row-cols-3 g-2'}>
                                <ConstructableType
                                    data={data.constructableType}
                                    handleChange={handleChangeConstructType}
                                />
                            </div>
                        </div>

                        <InputForm
                            defaultValue={data.companyName}
                            name={'companyName'}
                            onChange={onChangeText}
                            label={
                                <div className={'fs-14'}>
                                    업체명 <span className={'text-blue'}>*</span>
                                </div>
                            }
                            maxLength={20}
                        />

                        <InputForm
                            label={
                                <div className={'fs-14 '}>
                                업체 주소 <span className={'text-blue'}>*</span>
                                </div>
                            }
                            render={
                                <>
                                    <div className={'row align-items-center justify-content-between mb-6px'}>

                                        <div className={'col'}>
                                            <div className={'fw-light d-flex align-items-center'}
                                                 style={{cursor: "pointer"}}
                                                 onClick={(e) => onShowKakaoMap(e, 'show')}
                                            >
                                                <span>

                                                     {data.address.address}
                                                </span>

                                                {
                                                    data.address.address.trim().length > 0 &&
                                                    <span className={'ms-2 me-1'} style={{verticalAlign: "text-top"}}>
                                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                  d="M6.00005 5L1.00005 10L0.300049 9.3L4.60005 5L0.300048 0.7L1.00005 -3.0598e-08L6.00005 5Z"
                                                                  fill="#262626"/>
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
                            defaultValue={data.workingTime}
                            name={'workingTime'}
                            rows={2}
                            as={'textarea'}
                            onChange={onChangeText}
                            placeholder={"예) 평일 10:00~20:00 / 주말 10:00~15:00"}
                            label={
                                <div className={'fs-14 '}>
                                    업체 운영 시간 <span className={'text-blue'}>*</span>
                                </div>
                            }
                            maxLength={50}
                        />


                        <AttachFile
                            label={
                                <div className={'fs-14 '}>
                                    업체 대표이미지 <span className={'text-blue'}>*</span>
                                </div>
                            }
                            labelBtn={"파일 첨부"}
                            fileName={data.attachFile.fileName}
                            uploadFile={uploadFile}
                        />

                        <InputForm
                            defaultValue={data.introduction}
                            name={'introduction'}
                            label={<div className={'fs-14'}>
                                소개글
                            </div>}
                            rows={5}
                            as={'textarea'}
                            onChange={onChangeText}
                            maxLength={1000}
                        />


                        <div className={`row row-cols-2 gx-6px mt-18px`}>
                            <CButtonPosition variant={'outline-blue-500'} className={`bg-white`}
                                             disabledPosition={true}
                                             text={'입점 철회'}
                                             onClick={onWithDrawCompany}
                            />

                            <CButtonPosition className={''} disabledPosition={true}
                                             text={'저장'}
                                             onClick={onSave}
                            />
                        </div>

                    </>
                }/>
            }
        </>
    )
}

export default CompanyInforEditPage
