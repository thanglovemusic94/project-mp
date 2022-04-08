
const CarPartParamsUtils = {
    getCarPartByFieldName,
    getFieldNameByCarPart
}

const CarPartParams = {
    map: [
        { partName: "AllExterior", fieldName: "wholeExterior" },
        { partName: "Bonnet", fieldName: "bonnet" },
        { partName: "FrontBumper", fieldName: "frontBumper" },
        { partName: "FrontFenderLeft", fieldName: "frontFenderDriver" },
        { partName: "FrontFenderRight", fieldName: "frontFenderPassenger" },
        { partName: "FrontDoorLeft", fieldName: "frontDoorDriver" },
        { partName: "FrontDoorRight", fieldName: "frontDoorPassenger" },
        { partName: "BackDoorLeft", fieldName: "backDoorDriver" },
        { partName: "BackDoorRight", fieldName: "backDoorPassenger" },
        { partName: "RearFenderLeft", fieldName: "rearFenderDriver" },
        { partName: "RearFenderRight", fieldName: "rearFenderPassenger" },
        { partName: "SideSealLeft", fieldName: "sideSillDriver" },
        { partName: "SideSealRight", fieldName: "sideSillPassenger" },
        { partName: "Loop", fieldName: "cloop" },
        { partName: "RearBumper", fieldName: "rearBumper" },
        { partName: "Trunk", fieldName: "truck" },
        { partName: "DoorHandle", fieldName: "doorHandle" },
        { partName: "SideMirror", fieldName: "sideMirror" },
        { partName: "LifeProtectionPackage", fieldName: "ppf" },
        { partName: "FrontPackage", fieldName: "frontPackage" },
        { partName: "DoorEdge", fieldName: "doorEdge" },
        { partName: "HeadLamp", fieldName: "headLamp" },
        { partName: "TailLamp", fieldName: "tailLamp" },

        { partName: "Wheels", fieldName: "Wheels" },
        { partName: "DriverSeat", fieldName: "DriverSeat" },
        { partName: "DriverSeatRight", fieldName: "DriverSeatRight" },
        { partName: "PassengerSeatLeft", fieldName: "PassengerSeatLeft" },
        { partName: "PassengerSeatRight", fieldName: "PassengerSeatRight" },

        { partName: "WindshieldSideAndBack", fieldName: "sideBack" },
        { partName: "WindshieldAll", fieldName: "whole" },
        { partName: "WindshieldFront", fieldName: "frontWindshield" },
        { partName: "WindshieldFirstRow", fieldName: "row1" },
        { partName: "WindshieldSecondRow", fieldName: "row2" },
        { partName: "WindshieldThirdRow", fieldName: "row3" },
        { partName: "WindshieldBack", fieldName: "rearWindshield" },
        { partName: "Sunroof", fieldName: "sunRoof" },

        { partName: "FirstRowDriverSeat", fieldName: "FirstRowDriverSeat" },
        { partName: "SecondRowPassengerSeatLeft", fieldName: "SecondRowPassengerSeatLeft" },
        { partName: "ThirdRowPassengerSeatLeft", fieldName: "ThirdRowPassengerSeatLeft" },
        { partName: "FirstRowDriverSeatRight", fieldName: "FirstRowDriverSeatRight" },
        { partName: "SecondRowPassengerSeatRight", fieldName: "SecondRowPassengerSeatRight" },
        { partName: "ThirdRowPassengerSeatRight", fieldName: "ThirdRowPassengerSeatRight" },

        { partName: "BlackBoxOneChannel", fieldName: "channel1" },
        { partName: "BlackBoxTwoChannel", fieldName: "channel2" },
        { partName: "BlackBoxFourChannel", fieldName: "channel4" },
        { partName: "WrappingRemoval", fieldName: "rappingRemoval" },
        { partName: "Windshield", fieldName: "windshield" },
        { partName: "PPFRemoval", fieldName: "ppfRemoval" },
        { partName: "TintingRemoval", fieldName: "tintingRemoval" },
        { partName: "Tinting", fieldName: "tinting" },
        { partName: "BlackBox", fieldName: "blackBox" },
        { partName: "PPFLifeProtectionPackage", fieldName: "ppf" },
        { partName: "GlassCoating", fieldName: "grassFilmCoating" },
        { partName: "Polish", fieldName: "polish" },
        { partName: "LowerSoundProof", fieldName: "lowerSoundproofing" },
        { partName: "ExternalSoundProof", fieldName: "outsideSoundproofing" }
    ],
    getPartName: (fieldName) => {
        for (const item of CarPartParams.map) {

            if (item.fieldName === fieldName)
                return item.partName;
        }
    },
    getFieldName: (partName) => {
        for (const item of CarPartParams.map) {

            if (item.partName === partName)
                return item.fieldName;
        }
    }
}

function getCarPartByFieldName(fields) {
    let result = [];

    for (const fieldName of fields) {
        const partName = CarPartParams.getPartName(fieldName);

        result.push(partName);
    }

    return result;
}

function getFieldNameByCarPart(parts) {
    let result = [];

    for (const partName of parts) {
        const fieldName = CarPartParams.getFieldName(partName);

        result.push(fieldName);
    }

    return result;
}


export default CarPartParamsUtils;