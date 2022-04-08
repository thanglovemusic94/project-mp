import { DomesticCarIcon, ForeignCarIcon } from "../../../assets/svgs/Icons";
import SquareButton from "../../../components/buttons/SquareButton";
import { Localizations } from "../../../texts/Localizations";
import NavHeaderSpacer from "../../NavHeaderSpacer";

function CarRegisterSelectRegion({ onSelect }) {

    function handleRegionSelect(value) {

        if (onSelect)
            onSelect(value);
    }


    return (
        <>
            <div className="row">
                <div className="d-flex flex-column vh-100 bg-blue-50-op-30 carregisterregion-page">
                    <div className="pt-3">
                        <NavHeaderSpacer />
                        <h3 className="font-gmarket fw-bold fs-22">{Localizations.CarRegister.PageTitle}</h3>
                    </div>
                    <div className="flex-grow-1 d-flex">
                        <div className="mx-auto m-5" style={{ width: '192px' }}>
                            <SquareButton
                                icon={<DomesticCarIcon />}
                                onClick={() => handleRegionSelect('Domestic')}
                                squareClassName="mb-6"
                            >
                            </SquareButton>
                            <SquareButton
                                icon={<ForeignCarIcon />}
                                onClick={() => handleRegionSelect('Foreign')}
                            >
                            </SquareButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarRegisterSelectRegion;