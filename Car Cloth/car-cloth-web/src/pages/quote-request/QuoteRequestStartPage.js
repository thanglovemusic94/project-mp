import { useContext, useState } from "react";
import { Stack } from "react-bootstrap";
import { useHistory } from "react-router";
import { AppContext } from "../../App";
import { ExpandIcon, RightArrowIcon } from "../../assets/svgs/Icons";
import CButton from "../../components/buttons/CButton";
import CustomDatePicker from "../../components/datetimes/CustomDatePicker";
import NavHeaderSpacer from "../../components/NavHeaderSpacer";
import { ConstructionStatus } from "../../constants/ConstructionStatus";
import { QUOTE_REQUEST_PART_SELECTION_ROUTE } from "../../constants/RouteConstants";
import { Localizations } from "../../texts/Localizations";


function QuoteRequestStartPage({ data, onDataChange }) {
  const history = useHistory();

  const { showSelectionPopup, showNoticePopup, showKakaoMapPopup } = useContext(AppContext);

  const [desiredDate, setDesiredDate] = useState(data.desiredDate ?? new Date());
  const [selectedType, setSelectedType] = useState(data.constructionType ?? null);
  const [selectedAddress, setSelectedAddress] = useState(data.address ?? null);

  const partSelectionEnum = {
    ...ConstructionStatus,

    GlassFilm: "유리막코팅"
  };

  function handleShowPartSelectionPopup() {
    const popupPartsSelection = Object.values(partSelectionEnum);
    const popupPartsSelectionValue = Object.keys(partSelectionEnum);

    showSelectionPopup(popupPartsSelection, index => setSelectedType({ name: popupPartsSelection[index], value: popupPartsSelectionValue[index] }));
  }

  function handleAddressSelect(value) {

    if (value.address) {
      setSelectedAddress({
        "address": value.address,
        "addressDetail": value.roadAddress ?? "",
        "lat": value.lat,
        "lon": value.lng,
        "postCode": ""
      });
    }
  }

  function handleShowKakaoMapPopup() {
    showKakaoMapPopup(null, handleAddressSelect);
  }

  function handleNext() {

    if (selectedType === null) {

      showNoticePopup(Localizations.QuoteRequest.PleaseSelectConstructionType);
    } else if (selectedAddress === null) {

      showNoticePopup(Localizations.QuoteRequest.PleaseSelectConstructionArea);
    } else {

      if (onDataChange)
        onDataChange({
          constructionType: selectedType,
          desiredDate: desiredDate,
          address: selectedAddress
        });

      history.push({
        pathname: QUOTE_REQUEST_PART_SELECTION_ROUTE,
        state: {
          ...selectedType
        }
      });
    }
  }

  return (
    <>
      <div className="row">
        <div className="d-flex flex-column vh-100 bg-blue-50-op-30 quoterequeststart-page">
          <div className="flex-grow-1 mt-5 pt-3">
            <NavHeaderSpacer />
            <Stack gap={3}>
              <div className="bg-white rounded-16px p-3 shadow-sm">
                <label className="fs-14 mb-2">{Localizations.QuoteRequest.PleaseSelectDesiredConstruction}</label>
                <div
                  className="d-flex justify-content-between align-items-center py-2 px-3 border border-2 border-black-500 rounded-8px"
                  onClick={handleShowPartSelectionPopup}
                >
                  {
                    selectedType !== null
                      ? selectedType.name
                      : <span className="text-black-400">{Localizations.Common.Select}</span>
                  }
                  <ExpandIcon />
                </div>
              </div>
              <div className="bg-white rounded-16px p-3 shadow-sm">
                <label className="fs-14 mb-2">{Localizations.QuoteRequest.PleaseSelectDesiredConstructionDate}</label>
                <div className="d-flex justify-content-between align-items-center py-2 px-3 border border-2 border-black-500 rounded-8px position-relative">
                  <CustomDatePicker selected={desiredDate} onChange={(date) => setDesiredDate(date)} />
                  <ExpandIcon />
                </div>
              </div>
              <div className="bg-white rounded-16px p-3 shadow-sm">
                <label className="fs-14 mb-2">{Localizations.QuoteRequest.PleaseSelectDesiredConstructionArea}</label>
                <div
                  className="d-inline-flex align-items-center py-2 px-3 border border-2 border-black-500 rounded-8px"
                  onClick={handleShowKakaoMapPopup}
                >
                  <span className="fw-bold me-2">
                    {
                      selectedAddress
                        ? (selectedAddress.roadAddress ?? selectedAddress.address)
                        : Localizations.Common.SelectConstructionArea
                    }
                  </span>
                  <RightArrowIcon />
                </div>
              </div>
            </Stack>
          </div>
          <div className="pb-6">
            <CButton className="w-100" onClick={handleNext}>{Localizations.Common.Next}</CButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuoteRequestStartPage;
