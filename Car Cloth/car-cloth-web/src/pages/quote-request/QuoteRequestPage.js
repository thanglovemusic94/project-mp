import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { QUOTE_REQUEST_CREATE_ROUTE, QUOTE_REQUEST_PART_SELECTION_ROUTE, QUOTE_REQUEST_START_ROUTE } from "../../constants/RouteConstants";

const QuoteRequestStartPage = React.lazy(() => import("./QuoteRequestStartPage"))
const QuoteRequestPartSelectionPage = React.lazy(() => import("./QuoteRequestPartSelectionPage"))
const QuoteRequestCreatePage = React.lazy(() => import("./QuoteRequestCreatePage"))

function QuoteRequestPage() {
    const [requestData, setRequestData] = useState({});

    function updateRequestData(newData) {

        if (newData.constructionType && requestData.constructionType) {
            if (newData.constructionType.value !== requestData.constructionType.value) {
                newData.selectedParts = [];
            }
        }

        setRequestData((prevState) => setRequestData({
            ...prevState,
            ...newData
        }));
    }


    return (
        <>
            <Switch>
                <Route path={QUOTE_REQUEST_START_ROUTE}>
                    <QuoteRequestStartPage data={requestData} onDataChange={updateRequestData} />
                </Route>
                <Route path={QUOTE_REQUEST_PART_SELECTION_ROUTE}>
                    <QuoteRequestPartSelectionPage data={requestData} onDataChange={updateRequestData} />
                </Route>
                <Route path={QUOTE_REQUEST_CREATE_ROUTE}>
                    <QuoteRequestCreatePage data={requestData} />
                </Route>
            </Switch>
        </>
    );
}

export default QuoteRequestPage;