import { useContext, useEffect, useRef, useState } from "react";
import { Form, Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { AppContext } from "../../App";
import { CloseIcon, PictureIcon } from "../../assets/svgs/Icons";
import CButton from "../../components/buttons/CButton";
import { QuoteRequestService } from "../../services/QuoteRequestService";
import { Localizations } from "../../texts/Localizations";
import CarPartParamsUtils from "../../utils/CarPartParamsUtils";
import { S3Utils } from "../../utils/S3Utils";
import ErrorCommon from "../../components/popups/ErrorCommon";
import { MAIN_PAGE_ROUTE } from "../../constants/RouteConstants";
import NavHeaderSpacer from "../../components/NavHeaderSpacer";

function QuoteRequestCreatePage({ data }) {
    const history = useHistory();

    const { showInfoPopup, showNoticePopup, setCustomHeaderName } = useContext(AppContext);

    const maxMoreRequestLength = 300;
    const moreRequestsRef = useRef(null);
    const [moreRequestContent, setMoreRequestContent] = useState("");

    const [haveInsurance, setHaveInsurance] = useState(true);

    const maxAttachments = 4;
    const [attachedImages, setAttachedImages] = useState([]);
    const [attachmentsRefreshKey, setAttachmentsRefreshKey] = useState(Date.now);

    useEffect(() => {
        setCustomHeaderName(history.location.state["name"]);

        return (() => {
            setCustomHeaderName(null);
        });
        // eslint-disable-next-line
    }, [])

    function goBackToMainPage() {
        history.push(MAIN_PAGE_ROUTE);
    }

    function generateSelectedPartsParams() {
        const fields = CarPartParamsUtils.getFieldNameByCarPart(data.selectedParts);

        let params = {};
        for (const field of fields) {
            params = { ...params, [field]: true };
        }

        return params;
    }

    function createQuoteRequest() {
        let body = {
            "address": data.address,
            "attachImages": [],
            "desiredDate": data.desiredDate,
            "otherRequest": moreRequestContent,
            "insurance": haveInsurance,
            "type": data.constructionType.value,
        }

        body.attachImages = attachedImages.map((item) => {

            return ({
                "fileName": item.fileName,
                "objectKey": ""
            });
        });

        const generatedSelectedPartsParams = generateSelectedPartsParams();

        body = { ...body, ...generatedSelectedPartsParams };

        QuoteRequestService.createQuote(body).then(res => {

            if (res.status === 201) {
                showInfoPopup(
                    Localizations.QuoteRequest.YourQuoteRequestIsComplete,
                    Localizations.QuoteRequest.YouCanCheckProgressInUsageHistorySection,
                    goBackToMainPage,
                    'static'
                );

                const uploadFileUrls = res.data;

                if (uploadFileUrls.length > 0) {

                    for (const url of uploadFileUrls) {
                        for (const image of attachedImages) {

                            if (url.fileName === image.fileName) {
                                S3Utils.upload(url.objectKey, image.content);

                                break;
                            }
                        }
                    }
                }
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));
    }

    function handleMoreRequestChange(event) {
        const target = event.currentTarget;
        const value = target.value;

        if (value.length <= maxMoreRequestLength) {
            if (target.clientHeight + 2 < target.scrollHeight) { // Add 2px to the formula, maybe it the border width.
                target.style.height = '';
                target.style.height = target.scrollHeight + 'px';
            }

            setMoreRequestContent(value);
        } else {
            showNoticePopup(Localizations.QuoteRequest.MoreRequestLengthExceed);
        }
    }

    function handleAttachmentsChange(event) {
        const files = event.currentTarget.files;

        if (files.length <= maxAttachments) {
            if (attachedImages.length + files.length <= maxAttachments) {
                let newSelectedImages = [];

                for (let i = 0; i < files.length; i++) {
                    newSelectedImages.push({
                        thumbnail: URL.createObjectURL(files[i]),
                        fileName: files[i].name,
                        content: files[i]
                    });
                }
    
                setAttachedImages([...attachedImages, ...newSelectedImages]);
                setAttachmentsRefreshKey(Date.now);
            }
        } else {
            showNoticePopup(Localizations.QuoteRequest.MaximumImageAttachmentsExceeded);
        }
    }

    function handleRemoveAttachment(index) {
        let newAttachedImages = [...attachedImages];

        newAttachedImages.splice(index, 1);

        setAttachedImages(newAttachedImages);
    }

    function handleComplete() {

        if (attachedImages.length < 1) {
            showNoticePopup(Localizations.QuoteRequest.ImageAttachmentRequired);
        } else {
            createQuoteRequest();
        }
    }


    return (
        <>
            <div className="row">
                <div className="d-flex flex-column vh-100 bg-blue-50-op-30 quoterequestcreate-page">
                    <div className="flex-grow-1 mt-5 pt-3">
                        <NavHeaderSpacer />
                        <Form>
                            <div className="bg-white rounded-16px shadow-sm p-3 mb-3">
                                <p>{Localizations.QuoteRequest.PleaseSelectWithOrWithoutInsurance}</p>
                                <Form.Check
                                    inline
                                    label={Localizations.QuoteRequest.InsuranceCase}
                                    name="group1"
                                    type="radio"
                                    onChange={() => setHaveInsurance(true)}
                                    defaultChecked
                                    className="me-5"
                                />
                                <Form.Check
                                    inline
                                    label={Localizations.QuoteRequest.Uninsurance}
                                    name="group1"
                                    type="radio"
                                    onChange={() => setHaveInsurance(false)}
                                />
                            </div>
                            <div className="bg-white rounded-16px shadow-sm p-3 mb-3">
                                <p>{Localizations.QuoteRequest.PleaseEnterAnyOtherRequests}</p>
                                <Form.Control
                                    className="min-h-197"
                                    as="textarea"
                                    placeholder={Localizations.QuoteRequest.PleaseEnterYourRequestInDetails}
                                    onChange={handleMoreRequestChange}
                                    value={moreRequestContent}
                                    ref={moreRequestsRef}
                                />
                            </div>
                            <div className="thumbnail dashed position-relative bg-blue-50 text-center p-3 mb-3">
                                <PictureIcon />
                                <div className="fs-7 text-black-300 mt-1">{attachedImages.length}/{maxAttachments}</div>
                                <Form.Label className="position-absolute top-0 left-0 w-100 h-100 translate-middle-x" htmlFor="attachments"></Form.Label>
                                <Form.Control key={attachmentsRefreshKey} id="attachments" type="file" onChange={handleAttachmentsChange} multiple hidden />
                            </div>
                            <p className="text-black-300 fs-7 mt-2">{Localizations.QuoteRequest.PleaseAttachAtleastOnePhoto}</p>
                            <div className="overflow-auto text-nowrap">
                                {
                                    attachedImages.map((item, index) => {

                                        return (
                                            <div key={index} className="d-inline-block position-relative thumbnail mb-1 me-1">
                                                <Image src={item.thumbnail} />
                                                <div className="position-absolute top-0 w-100 text-end" onClick={() => handleRemoveAttachment(index)}>
                                                    <CloseIcon />
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </Form>
                    </div>
                    <div className="pb-6">
                        <CButton className="w-100" onClick={handleComplete}>{Localizations.QuoteRequest.RequestQuote}</CButton>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuoteRequestCreatePage;
