import { EditReviewRatingIcon } from "../../../../assets/svgs/Icons";
import Format from "../../../../utils/Format";
import RatingReview from "../../../RatingReview";

const ReviewContent = ({ className, dataReview, onClickEditReview }) => {

    return (
        <>
            {
                dataReview &&
                <div className={`${className} bg-white`}>
                    <div className={'pt-14px px-12px pb-12px border border-black-200'}>
                        <div className={'d-flex justify-content-between align-items-center'}>
                            <div>
                                <div>
                                    {/* <span className={'fw-bold fs-17 text-black-800'}>{dataReview.carInfo.brandName + " " + dataReview.carInfo.modelName}</span> */}
                                    <span className={'fw-bold fs-17 text-black-800'}>{dataReview.carInfo.brandName}</span>
                                    <span className={'text-black-300 fw-medium fs-14'}> {dataReview.carInfo.detailModelName}</span>
                                </div>
                            </div>
                            {
                                onClickEditReview &&
                                <span style={{ cursor: 'pointer' }} onClick={onClickEditReview}>
                                    <EditReviewRatingIcon />
                                </span>
                            }

                        </div>
                        <div className={'fw-light fs-12 text-black-550'}>
                            {Format.datetime(dataReview.createdOn, 'YYYY.MM.DD HH:MM', true)}
                        </div>
                        <hr className={'mt-6px mb-1'} />
                        <div className={'fs-12'}>
                            <div className={'d-flex justify-content-between align-items-center'}>
                                <span className={'fw-medium text-black-900'}>시공 퀄리티</span>
                                <div>
                                    <RatingReview ratingValue={dataReview.quality} reverse={true} />
                                    <span className={'fw-normal text-black-550 ms-4px5 align-bottom'}>({dataReview.quality})</span>
                                </div>
                            </div>
                            <div className={'d-flex justify-content-between align-items-center'}>
                                <span className={'fw-medium  text-black-900'}>친절도</span>
                                <div>
                                    <RatingReview ratingValue={dataReview.kindness} reverse={true} />
                                    <span className={'fw-normaltext-black-550 ms-4px5 align-bottom'}>({dataReview.kindness})</span>
                                </div>
                            </div>
                            <div className={'d-flex justify-content-between align-items-center'}>
                                <span className={'fw-medium text-black-900'}>제품에 대한 설명</span>
                                <div>
                                    <RatingReview ratingValue={dataReview.productExplain} reverse={true} />
                                    <span className={'fw-normal text-black-550 ms-4px5 align-bottom'}>({dataReview.productExplain})</span>
                                </div>
                            </div>
                        </div>

                        <div className={'bg-blue-50-op-30 mt-2 py-10px px-12px'}>
                            <div className={'fs-14'}>{dataReview.content}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ReviewContent
