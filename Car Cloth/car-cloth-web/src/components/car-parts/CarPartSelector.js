import { useEffect, useState } from "react";
import { CarPartsMap } from "../../assets/svgs/CarPartsMap";
import CarPartController from "./CarPartController";

function CarPartSelector({ layout, parts, onSelect }) {
    const [selectedParts, setSelectedParts] = useState(parts ?? []);

    useEffect(() => {
        setSelectedParts(parts);
    }, [parts]);

    function handlePartSelected(checked, part) {

        if (parts && onSelect === undefined)
            return;

        let newSelectedParts = [...selectedParts]

        if (checked === true) {
            newSelectedParts.push(part);
        } else {
            const partIdx = newSelectedParts.indexOf(part);

            newSelectedParts.splice(partIdx, 1);
        }

        setSelectedParts(newSelectedParts);

        if (onSelect)
            onSelect(newSelectedParts);

    }

    return (
        <>
            <div>
                <div className="text-center mb-4">
                    <CarPartsMap
                        highlights={selectedParts}
                    />
                </div>
                <CarPartController
                    layout={layout}
                    selectedParts={selectedParts}
                    onPartSelected={handlePartSelected}
                />
            </div>
        </>
    );
}

export default CarPartSelector;