import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../App";
import { COMPANY } from "../../constants/RouteConstants";
import { ConstructionRegisterContext } from "../../context/construction-register/ConstructionRegisterProvider";
import ConstructionService from "../../services/ConstructionService";
import { S3Utils } from "../../utils/S3Utils";
import ErrorCommon from "../popups/ErrorCommon";

const ConstructionRegisterHeaderIcon = () => {
    const history = useHistory();

    const { showNoticePopup, showInfoPopup } = useContext(AppContext);
    const { state } = useContext(ConstructionRegisterContext);

    const uploadListFile = async () => {
        try {
            const res = await ConstructionService.register(state.data)
            const listUrl = res.data
            for (let i = 0; i < listUrl.length; i++) {
                await S3Utils.upload(listUrl[i], state?.attachedImages[i])
            }
            return Promise.resolve(res.status)
        } catch (e) {
            return Promise.reject(e)
        }
    }


    const handleClick = () => {

        if (state === undefined || state === null) return;

        const dataContent = state.data.content;
        const dataImages = state.data.images;

        if (dataContent === null || dataContent.length < 10) {
            showNoticePopup(
                <div className={'fs-17 fw-medium lh-22'}>
                    내용은 최소 10자 이상 입력해 주세요.
                </div>
            );
        } else if (dataContent.length > 500) {
            showNoticePopup(
                <div className={'fs-17 fw-medium lh-22'}>
                    내용은 500자까지 입력 가능합니다.
                </div>
            );
        } else if (dataImages.length < 1) {
            showNoticePopup(
                <div className={'fs-17 fw-medium lh-22'}>
                    이미지를 1장 이상 첨부해주세요
                </div>
            );
        } else {
            uploadListFile().then(r => {
                if (r === 200) {
                    showInfoPopup(null,
                        <div className={'fs-17 fw-medium lh-22'}>
                            시공 사례 등록이 완료되었습니다!
                        </div>
                        , () => {
                            history.push(COMPANY.CONSTRUCTION_COMPLETED)
                        })
                }
            }).catch(e => ErrorCommon(showNoticePopup, e));
        }
    }

    return (
        <>
            {
                <div onClick={handleClick}>
                    완료
                </div>
            }
        </>
    );
}

export default ConstructionRegisterHeaderIcon
