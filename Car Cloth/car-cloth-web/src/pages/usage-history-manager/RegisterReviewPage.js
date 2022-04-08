import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import RatingReview from "../../components/RatingReview";
import { handleChange } from "../../utils/StateUtils";
import { useHistory, useLocation } from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import WrapperContent from "../../components/layouts/WrapperContent";
import CButtonPosition from "../../components/buttons/CButtonPosition";
import ErrorCommon from "../../components/popups/ErrorCommon";

const RegisterReviewPage = () => {
    const { showNoticePopup, setCustomHeaderName } = useContext(AppContext);
    const history = useHistory();

    const { itemReceivedQuote, dataReviewExit } = useLocation().state
    const [data, setData] = useState({
        "companyId": itemReceivedQuote.company.id,
        "quotationId": itemReceivedQuote.id,
        "quality": dataReviewExit ? dataReviewExit.quality : 0,
        "kindness": dataReviewExit ? dataReviewExit.kindness : 0,
        "productExplain": dataReviewExit ? dataReviewExit.productExplain : 0,
        "content": dataReviewExit ? dataReviewExit.content : '',
    })



    const handleRatingKindness = (rate) => {
        setData({ ...data, kindness: rate })
    }

    const handleRatingProductExplain = (rate) => {
        setData({ ...data, productExplain: rate })
    }

    const handleRatingQuality = (rate) => {
        setData({ ...data, quality: rate })
    }


    const onSubmit = () => {

        if (data.kindness === 0 || data.productExplain === 0 || data.quality === 0) {
            showNoticePopup("별점을 선택해 주세요.")
        } else if (data.content.trim().length < 10) {
            showNoticePopup("최소 10글자 이상 작성해 주세요.")
        } else {
            if (!dataReviewExit) {
                ReviewService.createReview(data).then((res) => {
                    if (res.status === 201) {
                        // console.log('call api success')
                        history.goBack()
                    }
                }).catch(e => ErrorCommon(showNoticePopup, e));

            } else if (dataReviewExit) {
                delete data.quotationId
                delete data.companyId
                const dataUpdate = data
                ReviewService.editReview(dataReviewExit.id, dataUpdate).then((res) => {
                    if (res.status === 200) {
                        // console.log('call api success')
                        history.goBack()
                    }
                }).catch(e => ErrorCommon(showNoticePopup, e));
            }
        }
    }


    useEffect(() => {
        setCustomHeaderName('후기 등록')
        return (() => {
            setCustomHeaderName(null);
        });
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <WrapperContent hasHeader={true} className={'bg-blue-50 py-3 px-18 lh-21'} content={
                <>
                    <div className={'pt-3 px-12px fs-14 pb-17px75 bg-white mb-3 rounded-16px box-shadow'}>
                        <div>
                            <div>시공 퀄리티</div>
                            <div className={'mt-7px75 mb-21px75 d-flex align-items-center'}>
                                <RatingReview
                                    width={25.76}
                                    height={24.5}
                                    starSpacing={'6.24px'}
                                    ratingValue={data.quality}
                                    onClick={handleRatingQuality}
                                    childrenActive={
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M13.0001 0.75L9.01887 8.8175L0.120117 10.1038L6.56012 16.3862L5.03762 25.25L13.0001 21.0675L20.9626 25.25L19.4401 16.3862L25.8801 10.1125L16.9814 8.8175L13.0001 0.75Z"
                                                fill="#FFD233" />
                                        </svg>
                                    }
                                    childrenUnActive={
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M13.0001 4.705L15.4151 9.5875L15.8176 10.4625L16.6926 10.5938L22.0826 11.3725L18.2501 15.135L17.5939 15.7738L17.7514 16.6488L18.6701 22.0125L13.8489 19.4838L13.0001 19.125L12.1864 19.5538L7.36512 22.0475L8.24012 16.6838L8.39762 15.8088L7.75012 15.135L3.88262 11.3287L9.27262 10.55L10.1476 10.4188L10.5501 9.54375L13.0001 4.705ZM13.0001 0.75L9.01887 8.8175L0.120117 10.1038L6.56012 16.3862L5.03762 25.25L13.0001 21.0675L20.9626 25.25L19.4401 16.3862L25.8801 10.1125L16.9814 8.8175L13.0001 0.75Z"
                                                fill="#FFD233" />
                                        </svg>
                                    }
                                />
                                <span className={'ps-9px12 align-bottom'}>{data.quality}/5</span>
                            </div>
                        </div>
                        <div>
                            <div>친절도</div>
                            <div className={'mt-7px75 mb-21px75 d-flex align-items-center'}>
                                <RatingReview
                                    width={25.76}
                                    height={24.5}
                                    starSpacing={'6.24px'}
                                    ratingValue={data.kindness}
                                    onClick={handleRatingKindness}
                                    childrenActive={
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M13.0001 0.75L9.01887 8.8175L0.120117 10.1038L6.56012 16.3862L5.03762 25.25L13.0001 21.0675L20.9626 25.25L19.4401 16.3862L25.8801 10.1125L16.9814 8.8175L13.0001 0.75Z"
                                                fill="#FFD233" />
                                        </svg>
                                    }
                                    childrenUnActive={
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M13.0001 4.705L15.4151 9.5875L15.8176 10.4625L16.6926 10.5938L22.0826 11.3725L18.2501 15.135L17.5939 15.7738L17.7514 16.6488L18.6701 22.0125L13.8489 19.4838L13.0001 19.125L12.1864 19.5538L7.36512 22.0475L8.24012 16.6838L8.39762 15.8088L7.75012 15.135L3.88262 11.3287L9.27262 10.55L10.1476 10.4188L10.5501 9.54375L13.0001 4.705ZM13.0001 0.75L9.01887 8.8175L0.120117 10.1038L6.56012 16.3862L5.03762 25.25L13.0001 21.0675L20.9626 25.25L19.4401 16.3862L25.8801 10.1125L16.9814 8.8175L13.0001 0.75Z"
                                                fill="#FFD233" />
                                        </svg>
                                    }
                                />
                                <span className={'ps-9px12 align-bottom'}>{data.kindness}/5</span>
                            </div>
                        </div>
                        <div>
                            <div>제품에 대한 설명</div>
                            <div className={'mt-7px75 mb-21px75 d-flex align-items-center'}>
                                <RatingReview
                                    width={25.76}
                                    height={24.5}
                                    starSpacing={'6.24px'}
                                    ratingValue={data.productExplain}
                                    onClick={handleRatingProductExplain}
                                    childrenActive={
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M13.0001 0.75L9.01887 8.8175L0.120117 10.1038L6.56012 16.3862L5.03762 25.25L13.0001 21.0675L20.9626 25.25L19.4401 16.3862L25.8801 10.1125L16.9814 8.8175L13.0001 0.75Z"
                                                fill="#FFD233" />
                                        </svg>
                                    }
                                    childrenUnActive={
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M13.0001 4.705L15.4151 9.5875L15.8176 10.4625L16.6926 10.5938L22.0826 11.3725L18.2501 15.135L17.5939 15.7738L17.7514 16.6488L18.6701 22.0125L13.8489 19.4838L13.0001 19.125L12.1864 19.5538L7.36512 22.0475L8.24012 16.6838L8.39762 15.8088L7.75012 15.135L3.88262 11.3287L9.27262 10.55L10.1476 10.4188L10.5501 9.54375L13.0001 4.705ZM13.0001 0.75L9.01887 8.8175L0.120117 10.1038L6.56012 16.3862L5.03762 25.25L13.0001 21.0675L20.9626 25.25L19.4401 16.3862L25.8801 10.1125L16.9814 8.8175L13.0001 0.75Z"
                                                fill="#FFD233" />
                                        </svg>
                                    }
                                />
                                <span className={'ps-9px12 align-bottom'}>{data.productExplain}/5</span>
                            </div>
                        </div>
                    </div>
                    <div className={'pt-3 px-12px pb-10px bg-white rounded-16px box-shadow'}>
                        <div className={'fs-14 mb-2'}>기타 요청사항을 입력해 주세요.</div>
                        <textarea value={data.content} maxLength={100} name={'content'}
                            onChange={(e) => handleChange(e, data, setData)} rows="7"
                            className={'fs-14 form-control d-block w-100 rounded-8px text-black-800 p-12px border border-black-700'}
                            placeholder={'시공 후기를 작성해 주세요.'}>

                        </textarea>
                    </div>

                    <CButtonPosition text={'등록'} onClick={onSubmit}  disabledPosition={true} className="mt-89px"/>
                </>
            }>

            </WrapperContent>
        </>
    )
}

export default RegisterReviewPage
