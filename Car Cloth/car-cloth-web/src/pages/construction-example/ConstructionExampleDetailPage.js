import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {IconCompanyInfo} from "../../assets/svgs/Icons";
import {useLocation} from "react-router-dom";
import ConstructionService from "../../services/ConstructionService";
import {COMPANY} from "../../constants/RouteConstants";
import Format from "../../utils/Format";
import {ConstructionRegisterContext} from "../../context/construction-register/ConstructionRegisterProvider";
import {CONSTRUCTION_REGISTER_TYPE} from "../../context/construction-register/ConstructionRegisterType";
import ErrorCommon from "../../components/popups/ErrorCommon";
import {AppContext} from "../../App";

export default function ConstructionExampleDetailPage() {
    const history = useHistory();
    const idConstruction = useLocation().state
    const [dataDetail, setDataDetail] = useState();
    const {showNoticePopup, isPlatformIOS} = useContext(AppContext);
    const {state, dispatch} = useContext(ConstructionRegisterContext);
    const handleGoToCompanyInfor = (idCompanyInfo) => {
        history.push({pathname: COMPANY.COMPANY_INFOR, state: idCompanyInfo});
    }

    useEffect(() => {
        ConstructionService.getDetail(idConstruction).then(res => {
            setDataDetail(res.data)
            dispatch({type: CONSTRUCTION_REGISTER_TYPE.SET_CONSTRUCTION,
                payload: {...state, data: {...state.data, completedDate: res.data.completedDate, content: res.data.content, images: res.data.images},  attachedImages: []}})
        }).catch(e => ErrorCommon(showNoticePopup, e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="construction-example-detail-page">
                <div className="cc-body d-flex flex-column vh-100">
                    <div className="overflow-auto mx-n3 h-100">
                        <div className="d-flex flex-column p-3 pb-0 h-100">
                            {
                                isPlatformIOS.current === true 
                                    ? <div className="nav-header">{` `}</div>
                                    : <></>
                            }
                            <div className="flex-grow-1 d-flex flex-column">
                                <div className="py-3 px-12px cc-shadow rounded-4px">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h3 className="fs-17 fw-bold">{dataDetail?.companyName}</h3>
                                        <div
                                            className="text-green-400 fs-12 d-flex align-content-center"
                                            onClick={() => handleGoToCompanyInfor(dataDetail?.companyId)}
                                        >
                      <span
                          className="rounded-circle bg-green-400 me-1 d-inline-flex align-items-center justify-content-center"
                          style={{width: "18px", height: "18px"}}
                      >
                        <IconCompanyInfo/>
                      </span>
                                            업체정보
                                        </div>
                                    </div>
                                    <div className="fs-14">
                                        <span className="">{dataDetail?.carType.carInfo} </span>
                                        {/*<span className="text-black-400">15~19년 </span>*/}
                                    </div>
                                    <div className="fs-13 text-black-600">
                                        <span className="">시공완료일</span>
                                        {dataDetail?.completedDate &&
                                        <span>
                                        <span className="px-1">|</span>
                                        <span
                                            className="">{Format.datetime(dataDetail.completedDate, 'YYYY.MM.DD')}</span>
                                    </span>
                                        }
                                    </div>
                                </div>
                                <div className="py-3 flex-grow-1">
                                    <p className="fs-14">
                                        {dataDetail?.content}
                                    </p>

                                </div>
                            </div>
                            <div className="pb-3">
                                <div className="row row-cols-4 gx-6px">
                                    {
                                        dataDetail?.images.map((value, index) => {
                                            return (
                                                <div key={index}
                                                     className="position-relative "
                                                     style={{
                                                         height: '80px',
                                                         borderColor: '#c4c4c4',
                                                         borderWidth: '1px',
                                                         borderRadius: '5px'
                                                     }}
                                                >
                                                    <img
                                                        src={value.objectKey}
                                                        className="w-100 h-100 rounded"
                                                        alt=""
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
