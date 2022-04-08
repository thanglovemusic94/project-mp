import WrapperContent from "../../components/layouts/WrapperContent";
import MoveToComponent from "../../components/pages/my-page/MoveToComponent";
import {useHistory} from "react-router-dom";
import {COMPANY, CONSTRUCTION_ROUTER} from "../../constants/RouteConstants";
import {SessionStorageManager} from "../../managers/SessionStorageManager";

const CompanyManagementPage = () => {
    const history = useHistory();
    const infoMember = SessionStorageManager.getMemberInfo()

    return (
        <>
            <WrapperContent className={'pt-10px'} hasFooter={true} content={
                <>
                    <MoveToComponent to={() => history.push({ pathname: COMPANY.COMPANY_INFOR, state: infoMember.companyId })}  name={'업체 정보'} />
                    <MoveToComponent to={() => history.push({ pathname: COMPANY.QUOTATION_MANAGEMENT })} name={'견적서 관리'}/>
                    <MoveToComponent name={'시공 사례 관리'} to={() => history.push({ pathname: CONSTRUCTION_ROUTER.CONSTRUCTION_LIST})}/>
                    <MoveToComponent name={'매출 관리'} to={() => history.push({ pathname: COMPANY.SALE_MANAGEMENT })} />
                    <MoveToComponent name={'업체 공지사항'} to={() => history.push({ pathname: COMPANY.NOTIFICATION })} />
                    <MoveToComponent name={'포인트&이용권 결제'} to={() => history.push({ pathname: COMPANY.COMPANY_POINT })} />
                </>
            } />
        </>
    )
}

export default CompanyManagementPage
