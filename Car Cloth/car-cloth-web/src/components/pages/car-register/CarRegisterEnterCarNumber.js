import {useContext, useState} from "react";
import { Form } from "react-bootstrap";
import CButton from "../../../components/buttons/CButton";
import ProductInfoService from "../../../services/ProductInfoService";
import { Localizations } from "../../../texts/Localizations";
import ErrorCommon from "../../popups/ErrorCommon";
import {AppContext} from "../../../App";
import NavHeaderSpacer from "../../NavHeaderSpacer";

function CarRegisterEnterCarNumber({ selectedData, onSelect }) {
    const {showNoticePopup} = useContext(AppContext);
    const carNumberMinLength = 7;
    const carNumberMaxLength = 10;

    const [carNumber, setCarNumber] = useState("");

    function preventSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

    }

    function handleCarNumberChange(event) {
        const value = event.target.value;

        if (value.length <= carNumberMaxLength) {
            setCarNumber(value);
        }
    }

    function handleCarRegister() {

        ProductInfoService.registerCar(carNumber, selectedData.modelDetail.id).then(res => {

            if (res.status === 201) {

                if (onSelect)
                    onSelect();
            }
        }).catch(e => ErrorCommon(showNoticePopup, e));
    }


    return (
        <>
            <div className="d-flex flex-column vh-100 carregistercarnumber-page">
                <div className="flex-grow-1 pt-3">
                    <NavHeaderSpacer />
                    <h3 className="font-gmarket fw-bold fs-22 mb-3">{Localizations.CarRegister.PageTitle}</h3>
                    <Form noValidate onSubmit={preventSubmit}>
                        <Form.Group className="bg-blue-50-op-30 py-2 px-12px rounded-10px">
                            <label className="text-black-500 fs-12">{Localizations.CarRegister.RegisterMyCarNumber}</label>
                            <Form.Control
                                type="text"
                                className="fs-16 fw-bold bg-transparent border-0 p-0"
                                placeholder={Localizations.CarRegister.CarNumberPlaceholder}
                                value={carNumber}
                                onChange={handleCarNumberChange}
                            />
                        </Form.Group>
                    </Form>
                </div>
                <div className="pb-6">
                    <CButton className="w-100" onClick={handleCarRegister} disabled={carNumber.length < carNumberMinLength}>{Localizations.Common.Next}</CButton>
                </div>
            </div>
        </>
    );
}

export default CarRegisterEnterCarNumber;
