import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../App";
import CButton from "../../components/buttons/CButton";
import CarPartSelector from "../../components/car-parts/CarPartSelector";
import NavHeaderSpacer from "../../components/NavHeaderSpacer";
import { CarPartControllerLayout } from "../../constants/CarPartControllerLayout";
import { QUOTE_REQUEST_CREATE_ROUTE } from "../../constants/RouteConstants";
import { Localizations } from "../../texts/Localizations";


function QuoteRequestPartSelectionPage({ data, onDataChange }) {
    const history = useHistory();

    const { showNoticePopup, setCustomHeaderName } = useContext(AppContext);

    const [selectedParts, setSelectedParts] = useState(data.selectedParts ?? []);

    function handleNext() {

        if (selectedParts.length > 0) {

            if (onDataChange)
                onDataChange({ selectedParts });

            history.push(QUOTE_REQUEST_CREATE_ROUTE, history.location.state);
        } else {
            showNoticePopup(Localizations.QuoteRequest.PleaseSelectConstructionParts);
        }
    }

    function handleCarPartSelect(parts) {

        setSelectedParts(parts);
    }

    useEffect(() => {
        setCustomHeaderName(history.location.state["name"]);

        return (() => {
            setCustomHeaderName(null);
        });
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="d-flex flex-column vh-100 quoterequestpart-page">
                <div className="flex-grow-1 mt-5 pt-3">
                    <NavHeaderSpacer />
                    <p className="text-center text-blue-300">{Localizations.QuoteRequest.PleaseSelectDesiredConstructionPart}</p>
                    <CarPartSelector
                        layout={CarPartControllerLayout[history.location.state["value"]]}
                        parts={selectedParts}
                        onSelect={handleCarPartSelect} />

                </div>
                <div className="pb-6 mt-5">
                    <CButton className="w-100" onClick={handleNext}>{Localizations.Common.Next}</CButton>
                </div>
            </div>
        </>
    );
}

export default QuoteRequestPartSelectionPage;