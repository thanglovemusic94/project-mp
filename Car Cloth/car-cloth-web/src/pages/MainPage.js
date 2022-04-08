import {useContext, useEffect, useState} from "react";
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import ConstructionExamplePreviewItem from "../components/pages/main/ConstructionExamplePreviewItem";
import MoreInformations from "../components/pages/main/MoreInformations";
import RegisteredInfoPreview from "../components/pages/main/RegisteredInfoPreview";
import {MainPageService} from "../services/MainPageService";
import {Localizations} from "../texts/Localizations";
import {getMemberInfor} from "../context/member/MemberAction";
import {MemberInfoContext} from "../context/member/MemberInforProvider";
import ErrorCommon from "../components/popups/ErrorCommon";
import {AppContext} from "../App";
import NavHeaderSpacer from "../components/NavHeaderSpacer";


function MainPage() {
    const [data, setData] = useState(null);
    const {dispatch} = useContext(MemberInfoContext)
    const {showNoticePopup} = useContext(AppContext);

    useEffect(() => {

        getMemberInfor(dispatch)
        
        MainPageService.getInfo().then(res => {

            if (res.status === 200) {

                setData(res.data);
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));

        // eslint-disable-next-line
    }, [])

    const Render = () => {

        return (
            <div className="position-absolute top-0 end-0 w-100 h-100">
                <NavHeaderSpacer />
                <RegisteredInfoPreview source={{...data.carImage, ...data.carInfo}}/>
                <div className="bg-black-70 border-6 border-black-80 pt-1"></div>
                <div className="ps-3 mt-3">
                    <div className="d-flex align-items-center justify-content-between pe-3 mb-2">
                        <span
                            className="fs-17 fw-bold font-gmarket text-black-800">{Localizations.Main.ConstructionExampleTitle}</span>
                        <Link className="fs-12 fw-light text-black text-decoration-none"
                              to="/construction-example-list">{Localizations.Common.SeeMore}</Link>
                    </div>
                    <div className="d-flex overflow-auto">
                        {
                            data.examples.map((item, index) => {
                                const itemData = {
                                    ...item.images[0],
                                    ...item.carInfo
                                }

                                return (
                                    <ConstructionExamplePreviewItem key={index} source={itemData}/>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="px-3">
                    <p className="font-gmarket fs-17 text-black-800 fw-bold mb-0">{Localizations.Main.CarclothRecommendedItemTitle}</p>
                    {
                        data.banners.map((item, index) => {

                            return (
                                <div className="py-2" key={index}>
                                    <a href={item.connectionLink}><Image className="banner-img" src={item.imgUrl}/></a>
                                </div>
                            );
                        })
                    }
                </div>
                <MoreInformations/>
                <div className="nav-bottom"></div>
            </div>
        );
    }

    return (
        <>
            {
                data !== null ? <Render/> : <></>
            }
        </>
    );
}

export default MainPage;
