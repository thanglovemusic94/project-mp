import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../App";
import CButton from "../../components/buttons/CButton";
import ProductInfoService from "../../services/ProductInfoService";
import {Localizations} from "../../texts/Localizations";
import ErrorCommon from "../../components/popups/ErrorCommon";
import NavHeaderSpacer from "../../components/NavHeaderSpacer";

function BrandDetailPage(props) {
    const brandId = props.location.state
    const [data, setData] = useState()
    const {showNoticePopup} = useContext(AppContext);

    const handleGoTo = () => {
        window.open(data.connectionURL, '_blank')
    }

    useEffect(() => {
        ProductInfoService.getBrandDetail(brandId)
        .then(res => {
            setData(res.data)
        })
        .catch((error) => {
            if(error.response?.data?.message) {
                showNoticePopup(error.response.data.message)
            } else {
                return ErrorCommon(showNoticePopup, error)
            }
        })
        // eslint-disable-next-line
    },[brandId])

    return (
        <div className="position-absolute top-0 end-0 w-100 h-100">
            <NavHeaderSpacer />
            <div className="brand-detail">
                <p>{data?.brandName}</p>

                <div className="w-100">
                    <img className="w-100" src={data?.attachFile?.objectKey} alt={data?.brandName}></img>
                </div>

                <div className="brand-intro">
                    {data?.introduction}
                </div>

                <div className="brand-button">
                    <CButton className="w-100 shadow-none" onClick={handleGoTo}>
                        <span className="fw-bold">{Localizations.Common.BrandSite}</span>
                    </CButton>
                </div>
            </div>
            <div className="nav-bottom"></div>
        </div>
    )
}

export default BrandDetailPage;
