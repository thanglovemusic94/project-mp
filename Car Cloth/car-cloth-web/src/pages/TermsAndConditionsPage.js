import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useHistory } from "react-router";
import CButton from "../components/buttons/CButton";
import CircleSelectButton from "../components/buttons/CircleSelectButton";
import NavHeaderSpacer from "../components/NavHeaderSpacer";
import TermConditionItem from "../components/pages/terms-and-conditions/TermConditionItem";
import { IDENTITY_VERIFICATION_ROUTE } from "../constants/RouteConstants";
import { Localizations } from "../texts/Localizations";

function TermsAndConditionsPage() {
  const history = useHistory();

  const [items, setItems] = useState([
    {
      title: Localizations.TermsAndConditions.TermsOfService,
      content: (
        <div>
          <p>제 1조 (목적)</p>
          <p>
            본 이용약관(이하"약관")은 차옷(이하 "회사")가 제공하는 차옷 서비스의
            이용조건 및 절차에 관한 사항과 기타 필요한 제반사항을 목적으로
            합니다.
          </p>
        </div>
      ),
      required: true,
      isAgreed: false,
    },
    {
      title: Localizations.TermsAndConditions.PrivacyPolicy,
      content: (
        <div>
          <p>제 1조 (목적)</p>
          <p>
            본 이용약관(이하"약관")은 차옷(이하 "회사")가 제공하는 차옷 서비스의
            이용조건 및 절차에 관한 사항과 기타 필요한 제반사항을 목적으로
            합니다.
          </p>
        </div>
      ),
      required: true,
      isAgreed: false,
    },
    {
      title: Localizations.TermsAndConditions.LocationInformation,
      content: (
        <div>
          <p>제 1조 (목적)</p>
          <p>
            본 이용약관(이하"약관")은 차옷(이하 "회사")가 제공하는 차옷 서비스의
            이용조건 및 절차에 관한 사항과 기타 필요한 제반사항을 목적으로
            합니다.
          </p>
        </div>
      ),
      required: true,
      isAgreed: false,
    },
    {
      title: Localizations.TermsAndConditions.ThirdPartyInformation,
      content: (
        <div>
          <p>① 개인정보를 제공받는 자 : 차옷서비스 제공 가맹점</p>
          <p>② 개인정보를 제공받는 자의 개인정보 이용 목적 : 서비스 제공을 위한 고객정보 수집 및 가맹점 정보 공유</p>
          <p>③ 제공하는 개인정보의 항목 : 성명, 연락처, 차량정보</p>
          <p>④ 개인정보를 제공받는 자의 개인정보 보유 및 이용 기간 : 제공 후 3년</p>
          <span>⑤ 동의를 거부할 수 있으며, 동의 거부시 차옷 서비스를 제공받으실 수 없습니다."</span>
        </div>
      ),
      required: true,
      isAgreed: false,
    },
    {
      title: Localizations.TermsAndConditions.OverAgeOf14,
      content: null,
      required: true,
      isAgreed: false,
    },
    {
      title: Localizations.TermsAndConditions.ReceiveNotification,
      content: null,
      required: false,
      isAgreed: false,
    },
  ]);

  const [openedItemKey, setOpenedItemKey] = useState();
  const [canGoNext, setCanGoNext] = useState(false);
  const [acceptAll, setAcceptAll] = useState(false);

  function updateCanGoNext() {
    let canGo = true;

    for (let i = 0; i < items.length; i++) {

      if (items[i].required === true && items[i].isAgreed === false) {
        canGo = false;

        break;
      }
    }

    setCanGoNext(canGo);
  }

  function updateAcceptAll() {
    let count = 0;

    for (var i = 0; i < items.length; i++) {

      if (items[i].isAgreed === true) {
        count++;
      }
    }

    setAcceptAll(count === items.length);
  }

  function handleItemSelect(key, selected) {
    const newItemState = key !== openedItemKey ? key : '';
    setOpenedItemKey(newItemState);

    let newItemsState = [...items];
    newItemsState[key].isAgreed = selected;
    setItems(newItemsState);
  }

  function handleContentToggle(key) {
    const newItemState = key !== openedItemKey ? key : '';
    setOpenedItemKey(newItemState);
  }

  function handleAcceptAll(checked) {
    let newItemsState = [...items];

    newItemsState.forEach((s) => (s.isAgreed = checked));

    setItems(newItemsState);
    setAcceptAll(checked);
  }

  function handleNext() {
    history.push(IDENTITY_VERIFICATION_ROUTE);
  }

  useEffect(() => {
    updateAcceptAll();
    updateCanGoNext();
    // eslint-disable-next-line
  }, [items]);


  return (
    <>
      <div className="d-flex flex-column vh-100 term-page">
        <NavHeaderSpacer />
        <div className="flex-grow-1 mt-5 pt-3">
          <h3 className="font-gmarket fs-22 fw-bold mb-5">
            {Localizations.TermsAndConditions.Title}
          </h3>
          <div className="d-flex mb-3">
            <CircleSelectButton
              className="me-3"
              checked={acceptAll}
              onChecked={handleAcceptAll}
            />
            <span className="fw-bold">
              {Localizations.TermsAndConditions.AcceptAll}
            </span>
          </div>
          <Accordion activeKey={openedItemKey} flush className="mb-3">
            {items.map((item, index) => {
              return (
                <TermConditionItem
                  key={index}
                  eventKey={index}
                  onSelect={handleItemSelect}
                  onContentToggle={handleContentToggle}
                  title={item.title}
                  content={item.content}
                  required={item.required}
                  isAgreed={item.isAgreed}
                />
              );
            })}
          </Accordion>
        </div>
        <div className="pb-6">
          <CButton className="w-100" disabled={!canGoNext} onClick={handleNext}>
            {Localizations.Common.Next}
          </CButton>
        </div>
      </div>
    </>
  );
}

export default TermsAndConditionsPage;
