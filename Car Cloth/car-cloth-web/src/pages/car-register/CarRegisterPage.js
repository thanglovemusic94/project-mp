import { lazy, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

const CarRegisterSearchModel = lazy(() => import("../../components/pages/car-register/CarRegisterSearchModel"))
const CarRegisterSelectRegion = lazy(() => import("../../components/pages/car-register/CarRegisterSelectRegion"))
const CarRegisterSelectBrand = lazy(() => import("../../components/pages/car-register/CarRegisterSelectBrand"))
const CarRegisterSelectModel = lazy(() => import("../../components/pages/car-register/CarRegisterSelectModel"))
const CarRegisterSelectModelDetail = lazy(() => import("../../components/pages/car-register/CarRegisterSelectModelDetail"))
const CarRegisterEnterCarNumber = lazy(() => import("../../components/pages/car-register/CarRegisterEnterCarNumber"))
const CarRegisterComplete = lazy(() => import("../../components/pages/car-register/CarRegisterComplete"))


function CarRegisterPage() {
    const { setCustomHandleBack } = useContext(AppContext);

    const [data, setData] = useState({
        region: "",
        brand: "",
        model: "",
        modelDetail: ""
    });

    const [step, setStep] = useState(0);

    useEffect(() => {
        setCustomHandleBack(handleBack);

        return () => {
            setCustomHandleBack(null);
        };
        // eslint-disable-next-line
    }, [step]);


    function handleBack() {

        if (step - 1 >= 0 && step < 6) {
            setStep(prevStep => prevStep - 1);

            // Return true mean the current page handled the event.
            return true;
        }

        // Return false mean app will use default back button handler.
        return false;
    }

    function handleModelSelect(value) {
        const newData = { ...data };

        newData.model = value;

        setData(newData);
        setStep(4);
    }

    function handleStepByStepSelect(value) {
        const newData = { ...data }

        switch (step) {
            case 1: newData.region = value; break;
            case 2: newData.brand = value; break;
            case 3: newData.model = value; break;
            case 4: newData.modelDetail = value; break;
            default: break;
        }

        setData(newData);
        setStep(prevStep => prevStep + 1);
    }


    return (
        <>
            {
                step === 0 && <CarRegisterSearchModel onModelSelect={handleModelSelect} onStepByStepSelect={handleStepByStepSelect} />
            }
            {
                step === 1 && <CarRegisterSelectRegion onSelect={handleStepByStepSelect} />
            }
            {
                step === 2 && <CarRegisterSelectBrand onSelect={handleStepByStepSelect} />
            }
            {
                step === 3 && <CarRegisterSelectModel selectedBrand={data.brand} onSelect={handleStepByStepSelect} />
            }
            {
                step === 4 && <CarRegisterSelectModelDetail selectedModel={data.model} onSelect={handleStepByStepSelect} />
            }
            {
                step === 5 && <CarRegisterEnterCarNumber selectedData={data} onSelect={handleStepByStepSelect} />
            }
            {
                step === 6 && <CarRegisterComplete />
            }
        </>
    );
}

export default CarRegisterPage;