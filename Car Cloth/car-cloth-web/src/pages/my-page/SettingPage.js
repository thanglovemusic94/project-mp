import { useContext } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AppContext } from "../../App";
import { RightArrowIcon } from "../../assets/svgs/Icons";
import WrapperContent from "../../components/layouts/WrapperContent";
import {
  MY_PAGE_ACCOUNT_SETTING,
  MY_PAGE_NOTICE_SETTING,
  MY_PAGE_PRIVACY_POLICY,
  MY_PAGE_TERM,
  SNS_LOGIN_ROUTE
} from "../../constants/RouteConstants";
import { LocalStorageManager } from "../../managers/LocalStorageManager";
import MemberService from "../../services/MemberService";

const appVersion = "1.1.1"
const SettingItem = ({ eventKey, title, link }) => {
  return (
    <Nav.Link eventKey={eventKey} as={Link} to={link ?? '#'} className="text-black-900 py-11px">
      <div className="d-flex justify-content-between">
        <span className="fs-14">{title}</span>
        <span>
          <RightArrowIcon />
        </span>
      </div>
    </Nav.Link>
  );
};

const SettingHeader = ({ eventKey, title }) => {
  return (
    <h4 className="text-black fw-medium fs-15 mt-3 px-3">
      {title}
    </h4>
  )
}

const SettingPage = () => {
  const history = useHistory();
  const { showConfirmPopup } = useContext(AppContext);

  function handleLogout() {

    showConfirmPopup('',
      <>
        <div className={''}>
          <div className={'fw-bold'}>
            로그아웃 하시겠습니까?
          </div>
        </div>
      </>,
      () => {
        MemberService.logout().then(res => {
          if (res.status === 200) {
            LocalStorageManager.clearOnLogout();
            history.push({ pathname: SNS_LOGIN_ROUTE, state: { show_toast: true } })
            // window.location.href = SNS_LOGIN_ROUTE;
          }
        });
      }
    );

  }

  return (
    <WrapperContent hasFooter={true} className={'px-0 py-0'} content={
      <>
        <div className={'fs-14 mysettings-page'}>
          <Nav defaultActiveKey="/UserSetting" className="flex-column">
            <SettingHeader eventKey="UserSetting" title="사용자 설정" />
            <SettingItem eventKey="AccountSetting" title="계정 설정" link={MY_PAGE_ACCOUNT_SETTING} />
            <SettingItem eventKey="NoticeSetting" title="알림 설정" link={MY_PAGE_NOTICE_SETTING} />
            <div className="bg-black-50 my-3" style={{ height: "4px" }}></div>

            <SettingHeader eventKey="ServiceInfor" title="사용자 설정" />
            <SettingItem eventKey="TermSetting" title="이용약관" link={MY_PAGE_TERM} />
            <SettingItem eventKey="Policy" title="개인정보처리방침" link={MY_PAGE_PRIVACY_POLICY} />
            <SettingItem eventKey="AppInfor" title={`앱 버전 정보(${appVersion})`} />
            <div className="bg-black-50 mt-3" style={{ height: "4px" }}></div>

            <Nav.Link eventKey="logout" className="text-black-900 mt-3 fw-medium" onClick={handleLogout}>로그아웃</Nav.Link>
          </Nav>
        </div>
      </>
    }></WrapperContent>
  );
};

export default SettingPage;
