import {CCard, CCardBody, CCardGroup, CCardHeader, CContainer, CHeader, CHeaderBrand} from "@coreui/react";
import {useEffect, useState} from "react";
import {DashboardInfoCard} from "./DashboardInfoCard";
import DashboardService from "../../services/DashboardService";
import FormattedDateTime from "../../commons/FormattedDateTime";
import {LocalStorageManager} from "../../managers/LocalStorageManager";

function Dashboard() {
    const [data, setData] = useState();

    useEffect(() => {
        DashboardService.queryDashboard().then(r => setData(r.data))
    }, [])

    return (
        <CContainer fluid>
            <CHeader>
                <CHeaderBrand className={'fw-bold'}>대시보드</CHeaderBrand>
            </CHeader>
            <div className="mt-2">
                {(LocalStorageManager.getAccessDate()) &&
                <>
                    <FormattedDateTime format={'YYYY.MM.DD HH:MM'} source={LocalStorageManager.getAccessDate()}/> 기준 현황
                </>
                }
            </div>
            {
                data &&
                <div className={'my-5'}>

                    <div className="d-flex justify-content-evenly mt-5">
                        <div className="w-25">
                            <DashboardInfoCard
                                title="총 회원수"
                                content={data.totalMembers}
                            />
                        </div>
                        <div className="w-25">
                            <DashboardInfoCard
                                title="로그인 수"
                                content={data.numberLogin}
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <CCard className="text-center">
                            <CCardHeader className={'fw-bold'}>거래 현황</CCardHeader>
                            <CCardBody className="p-1">
                                <CCardGroup>
                                    <DashboardInfoCard
                                        title="견적비교"
                                        content={data.compare}
                                    />
                                    <DashboardInfoCard
                                        title="예약신청"
                                        content={data.apply}
                                    />
                                    <DashboardInfoCard
                                        title="예약확정"
                                        content={data.confirm}
                                    />
                                    <DashboardInfoCard
                                        title="시공 중"
                                        content={data.constructing}
                                    />
                                    <DashboardInfoCard
                                        title="시공완료"
                                        content={data.complete}
                                    />
                                </CCardGroup>
                            </CCardBody>
                        </CCard>
                    </div>
                </div>
            }
        </CContainer>
    );
}

export default Dashboard;
