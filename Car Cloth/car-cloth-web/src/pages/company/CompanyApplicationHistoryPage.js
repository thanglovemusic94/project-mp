import { useContext, useEffect, useState } from "react";
import CompanyService from "../../services/CompanyService";
import WrapperContent from "../../components/layouts/WrapperContent";
import ConstructableType from "../../components/pages/construct-type/ConstructableType";
import InputForm from "../../components/datetimes/InputForm";
import {
    AttachFileLabel,
    CompanyNameLabel,
    ContactLabel,
    RepresentativeNameLabel,
    WorkingTimeLabel
} from "../../assets/svgs/CompanyIcons";
import AttachFile from "../../components/base/AttachFile";
import { EntryRouteConstants } from "../../constants/EntryRouteConstants";
import CheckBox from "../../components/base/CheckBox";
import { EntryRouteLabel } from "../../assets/svgs/CheckBoxIcon";
import CButtonPosition from "../../components/buttons/CButtonPosition";
import { AppContext } from "../../App";
import { useHistory } from "react-router-dom";
import { COMPANY, MY_PAGE } from "../../constants/RouteConstants";
import { CompanyStatus } from "../../constants/CompanyStatus";
import { S3Utils } from "../../utils/S3Utils";
import ErrorCommon from "../../components/popups/ErrorCommon";
import { SessionStorageManager } from "../../managers/SessionStorageManager";

const CompanyApplicationHistoryPage = () => {
    const userInfo = SessionStorageManager.getMemberInfo();
    const { showInfoPopup, showConfirmPopup, showKakaoMapPopup, showNoticePopup } = useContext(AppContext);
    const [data, setData] = useState()
    const history = useHistory();

    const handleChangeConstructType = (name, checked) => {
        let constructableType = { ...data.constructableType }
        constructableType[name] = checked
        setData({ ...data, constructableType: constructableType })
    }

    const onChangeText = (e) => {
        const { name, value } = e.target;
        if (name === 'addressDetail') {
            setData({ ...data, address: { ...data.address, [name]: value } })
        } else {
            setData({ ...data, [name]: value })
        }
    }

    const handleChangeEntryRoute = (name, checked) => {
        let entryRoute = { ...data.entryRoute }
        entryRoute[name] = checked
        setData({ ...data, entryRoute: entryRoute })
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

    const styleClassIndex = (index) => {
        if (index === 0)
            return "text-start"
        else if (index === EntryRouteConstants.length - 1) {
            return "text-end"
        } else {
            return "text-center"
        }
    }

    useEffect(() => {
        CompanyService.getHistoryRegister().then(res => {
            setData(res.data)
        }).catch(e => ErrorCommon(showNoticePopup, e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCancelRegister = () => {
        showConfirmPopup(
            '',
            <>
                <div className={''}>
                    <div className={'fw-bold'}>
                        신청 취소 하시겠습니까?
                    </div>
                    <div>
                        작성내용은 삭제됩니다.
                    </div>
                </div>
            </>,
            () => {
                CompanyService.cancelRegister().then((res) => {
                    if (res.status === 200) {
                        history.push(MY_PAGE)
                    }
                }).catch(e => ErrorCommon(showNoticePopup, e));
            }
        );
    }

    const onReapply = (e) => {
        const { error, field } = checkValidate()
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
            CompanyService.reApply(data).then(res => {
                if (res.status === 200) {
                    if (file === null) {
                        if (e.target.name === "btnSave") {
                            showInfoPopup(
                                "",
                                <div>
                                    {/* <div className={'fs-17 fw-medium lh-22'}>
                                        등록 신청 완료 시
                                    </div> */}
                                    <div>업체 등록 신청 완료 관리자 확인 후 연락 드리겠습니다.</div>
                                </div>
                                , () => {
                                    history.push(MY_PAGE)
                                })
                        }
                        if (e.target.name === "btnReapply") {
                            history.push(COMPANY.REGISTER, { data });
                        }

                    } else {
                        S3Utils.upload(res.data.objectKey, file).then(() => {
                            if (e.target.name === "btnSave") {
                                showInfoPopup(
                                    "",
                                    <div>
                                        {/* <div className={'fs-17 fw-medium lh-22'}>
                                            등록 신청 완료 시
                                        </div> */}
                                        <div>업체 등록 신청 완료 관리자 확인 후 연락 드리겠습니다.</div>
                                    </div>
                                    , () => {
                                        history.push(MY_PAGE)
                                    })
                            }
                            if (e.target.name === "btnReapply") {
                                history.push(COMPANY.REGISTER, { data });
                            }
                        }
                        )
                    }
                }
            }).catch(e => ErrorCommon(showNoticePopup, e));
        }
    }

    const checkValidate = () => {
        const checkConstruction = Object.entries(data.constructableType).filter(value => value[1] === true)
        if (checkConstruction.length === 0) return { error: true, field: 'constructableType' }
        else if (data.companyName.trim().length === 0) return { error: true, field: 'companyName' }
        else if (data.address.addressDetail.trim().length === 0 || data.address.address.trim().length === 0)
            return {
                error: true,
                field: 'address'
            }
        else if (data.representativeName.trim().length === 0) return { error: true, field: 'representativeName' }
        else if (data.contact.trim().length === 0) return { error: true, field: 'contact' }
        else if (data.workingTime.trim().length === 0) return { error: true, field: 'workingTime' }
        else if (file === undefined || file === '') return { error: true, field: 'file' }
        else return { error: false, field: null }
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
                <WrapperContent className={'lh-21 bg-blue-50 p-3'} hasHeader={true} content={
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
                            label={<CompanyNameLabel />}
                            maxLength={20}
                        />

                        <InputForm
                            label={<div className={'fs-14 '}>
                                업체 주소 <span className={'text-blue'}>*</span>
                            </div>}
                            render={
                                <>
                                    <div className={'row align-items-center justify-content-between mb-6px'}>

                                        <div className={'col'}>
                                            <div className={'fw-light d-flex align-items-center'}
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
                            label={<WorkingTimeLabel />}
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

                        {
                            (userInfo.companyStatus && userInfo.companyStatus === CompanyStatus.REJECT) ?
                                <>
                                    <div className={'mt-3 px-12px'}>
                                        <ul className={'mb-1'}>
                                            <li className={'fs-14 fw-medium text-blue-500'}>반려사유</li>
                                        </ul>
                                        <div style={{ marginLeft: '16px' }}>
                                            {data.reason}
                                        </div>
                                    </div>
                                    <CButtonPosition name="btnReapply" className={'mt-20px'} disabledPosition={true}
                                        text={'재신청'}
                                        onClick={onReapply}
                                    />
                                </>
                                :
                                <div className={`row row-cols-2 gx-6px mt-3`}>

                                    <CButtonPosition variant={'outline-blue-500'} className={`mt-20px bg-white`}
                                        disabledPosition={true}
                                        text={'신청 취소'}
                                        onClick={onCancelRegister}
                                    />

                                    <CButtonPosition name="btnSave" className={'mt-20px'} disabledPosition={true}
                                        text={'저장'}
                                        onClick={onReapply}
                                    />

                                </div>
                        }

                    </>
                } />
            }
        </>
    )
}

export default CompanyApplicationHistoryPage
