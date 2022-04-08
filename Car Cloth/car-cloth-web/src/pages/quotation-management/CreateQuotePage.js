import {useContext, useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {AppContext} from "../../App";
import CButtonPosition from "../../components/buttons/CButtonPosition";
import InputForm from "../../components/datetimes/InputForm";
import WrapperContent from "../../components/layouts/WrapperContent";
import ErrorCommon from "../../components/popups/ErrorCommon";
import {COMPANY} from "../../constants/RouteConstants";
import QuotationService from "../../services/QuotationService";
import {handleChange} from "../../utils/StateUtils";
import {getMemberInfor} from "../../context/member/MemberAction";
import {MemberInfoContext} from "../../context/member/MemberInforProvider";

const CreateQuotePage = () => {
    const history = useHistory();
    const { showConfirmPopup, showNoticePopup } = useContext(AppContext);
    const quoteDetail = useLocation().state;
    const [data, setData] = useState({
        "constructionFee": 0,
        "estConstructionPeriod": "",
        "id": quoteDetail?.id,
        "notes": "",
        "paymentAmount": 0
    })

    const {state, dispatch} = useContext(MemberInfoContext)
    const holdingPoint = state?.point
    const deductPoint = state?.deliveryCost

    const onSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation()
            form.classList.add('was-validated')
        } else {
            if (holdingPoint >= deductPoint) {
                showConfirmPopup(
                    "",
                    <>
                        <div className={'fw-bold fs-17'}>견적서를 전달 하시겠습니까?</div>
                        <div><span className={'text-blue-500 fs-13'}>{deductPoint}</span><span className={'text-black-400'}>포인트가 차감됩니다.</span>
                        </div>
                    </>,
                    () => {
                        QuotationService.createQuote(data).then(res => {
                            if (res.status === 200) {
                                history.push(COMPANY.QUOTATION_MANAGEMENT)
                            }
                        }).catch(e => ErrorCommon(showNoticePopup, e));
                    })
            } else {
                showConfirmPopup(
                    "",
                    <>
                        <div className={'fw-bold fs-17'}>보유한 포인트가 부족합니다.</div>
                        <div><span className={'text-black-400 fs-13'}>포인트를 충전 하시겠습니까?</span></div>
                    </>,
                    () => {
                        history.push(COMPANY.POINT_PURCHASE)
                    })
            }
        }
    }

    useEffect(() => {
        getMemberInfor(dispatch).catch(e => ErrorCommon(showNoticePopup, e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <WrapperContent className={'bg-blue-50'} hasFooter={true} content={<>
                <form noValidate onSubmit={onSubmit} id="create_quote" className="needs-validation">
                    <InputForm
                        className={''}
                        defaultValue={''}
                        name={'constructionFee'}
                        placeholder={'VAT 포함 비용 입력'}
                        label={<div className={'fs-14'}>
                            총 시공 비용 <span className={'text-blue'}>*</span>
                        </div>}
                        pattern="\d*" maxLength="20" minLength={'1'}
                        required
                        onChange={(e) => handleChange(e, data, setData)}
                    />

                    <InputForm
                        defaultValue={''}
                        name={'paymentAmount'}
                        placeholder={'VAT 포함 결제 금액 입력'}
                        onChange={(e) => handleChange(e, data, setData)}
                        label={<div className={'fs-14'}>
                            결제 금액 <span className={'text-blue'}>*</span>
                        </div>}
                        required
                        pattern="\d*" maxLength="20" minLength={'1'}
                    />

                    <InputForm
                        defaultValue={''}
                        name={'estConstructionPeriod'}
                        placeholder={'예) 입고일로부터 2일'}
                        onChange={(e) => handleChange(e, data, setData)}
                        label={<div className={'fs-14'}>
                            예상 시공 기간 <span className={'text-blue'}>*</span>
                        </div>}
                        required
                        maxLength="20" minLength={'1'}
                    />

                    <InputForm
                        defaultValue={data.workingTime}
                        name={'notes'}
                        rows={6}
                        as={'textarea'}
                        onChange={(e) => handleChange(e, data, setData)}
                        placeholder={"무료제공 서비스 및 고객에게 전달할 내용 입력"}
                        label={<div className={'fs-14'}>
                            추가 전달사항
                        </div>}
                        required
                        maxLength="100" minLength={'1'}
                    />

                </form>

                <CButtonPosition
                    className={'mt-28px'}
                    disabledPosition={true}
                    form="create_quote"
                    text={'견적서 전달'}
                    type="submit"
                />
            </>} />
        </>
    )
}

export default CreateQuotePage
