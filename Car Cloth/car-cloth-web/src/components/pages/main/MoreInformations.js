import { Accordion, Button, Stack } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { MY_PAGE_PRIVACY_POLICY, MY_PAGE_TERM } from "../../../constants/RouteConstants";
import { Localizations } from "../../../texts/Localizations";
import CAccordionToggle from "../../buttons/CAccordionToggle";

function Header({ children }) {

    return (
        <span className="fw-bold me-2">
            {children}
        </span>
    );
}

function MoreInformations() {
    const history = useHistory();

    function handleRedirect(pageRoute) {

        history.push(pageRoute);
    }

    return (
        <>
            <Accordion className="font-noto" defaultActiveKey="0">
                <div className="text-end me-3 mb-2">
                    <CAccordionToggle eventKey="0">{Localizations.Common.BusinessInformation}</CAccordionToggle>
                </div>
                <Accordion.Collapse className="bg-black-30 text-black-400 fs-10 p-3" eventKey="0">
                    <Stack gap={1}>
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold fs-12 text-black-600 align-self-center">(주)차옷</span>
                            <Button variant="link" className="fs-10 text-black-400 shadow-none pt-0 pe-0">{Localizations.Common.CheckBusinessInfo}</Button>
                        </div>
                        <div>
                            <Header>{Localizations.Common.CEO}</Header>
                            <span>홍길동</span>
                        </div>
                        <div>
                            <Header>{Localizations.Common.PIManager}</Header>
                            <span>홍길동</span>
                        </div>
                        <div>
                            <Header>{Localizations.Common.RegistrationNumber}</Header>
                            <span>000-00-00000</span>
                        </div>
                        <div>
                            <Header>{Localizations.Common.Address}</Header>
                            <span>대구 달서구 성서4차점단로 195</span>
                        </div>
                        <div>
                            <Header>{Localizations.Common.RepresentativeNumber}</Header>
                            <span>02-0000-0000</span>
                        </div>
                        <div>
                            <Header>{Localizations.Common.Email}</Header>
                            <span>jaeilfilm@gmail.com</span>
                        </div>
                        <div className="mt-1 mb-3">
                            <Button
                                variant="link"
                                className="fs-10 text-black-400 shadow-none px-0 text-decoration-none"
                                onClick={() => handleRedirect(MY_PAGE_TERM)}
                            >
                                {Localizations.Common.TermOfUse}
                            </Button>
                            <span> | </span>
                            <Button
                                variant="link"
                                className="fs-10 text-black-400 shadow-none ps-0 text-decoration-none"
                                onClick={() => handleRedirect(MY_PAGE_PRIVACY_POLICY)}
                            >
                                {Localizations.Common.PrivacyPolicy}
                            </Button>
                        </div>
                        <div>
                            <span>{Localizations.Common.Disclaimers}</span>
                        </div>
                    </Stack>
                </Accordion.Collapse>
            </Accordion>
        </>
    );
}

export default MoreInformations;