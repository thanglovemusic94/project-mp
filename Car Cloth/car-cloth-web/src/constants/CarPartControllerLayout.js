import { CarPartsHighlightEnum } from "../assets/svgs/CarPartsHighlightData";
import { Localizations } from "../texts/Localizations";


export const CarPartControllerLayout = {
    PPF: [
        [
            { title: Localizations.CarPartNames.AllExterior, value: CarPartsHighlightEnum.AllExterior, checked: false },
            { title: Localizations.CarPartNames.Bonnet, value: CarPartsHighlightEnum.Bonnet, checked: false },
            { title: Localizations.CarPartNames.FrontBumper, value: CarPartsHighlightEnum.FrontBumper, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.FrontFenderLeft, value: CarPartsHighlightEnum.FrontFenderLeft, checked: false },
            { title: Localizations.CarPartNames.FrontFenderRight, value: CarPartsHighlightEnum.FrontFenderRight, checked: false },
            { title: Localizations.CarPartNames.FrontDoorLeft, value: CarPartsHighlightEnum.FrontDoorLeft, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.FrontFenderRight, value: CarPartsHighlightEnum.FrontDoorRight, checked: false },
            { title: Localizations.CarPartNames.BackDoorLeft, value: CarPartsHighlightEnum.BackDoorLeft, checked: false },
            { title: Localizations.CarPartNames.BackDoorRight, value: CarPartsHighlightEnum.BackDoorRight, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.RearFenderLeft, value: CarPartsHighlightEnum.RearFenderLeft, checked: false },
            { title: Localizations.CarPartNames.RearFenderRight, value: CarPartsHighlightEnum.RearFenderRight, checked: false },
            { title: Localizations.CarPartNames.SideSealLeft, value: CarPartsHighlightEnum.SideSealLeft, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.SideSealRight, value: CarPartsHighlightEnum.SideSealRight, checked: false },
            { title: Localizations.CarPartNames.Loop, value: CarPartsHighlightEnum.Loop, checked: false },
            { title: Localizations.CarPartNames.RearBumper, value: CarPartsHighlightEnum.RearBumper, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.Trunk, value: CarPartsHighlightEnum.Trunk, checked: false },
            { title: Localizations.CarPartNames.DoorHandle, value: CarPartsHighlightEnum.DoorHandle, checked: false },
            { title: Localizations.CarPartNames.SideMirror, value: CarPartsHighlightEnum.SideMirror, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.LifeProtectionPackage, value: CarPartsHighlightEnum.LifeProtectionPackage, checked: false },
            { title: Localizations.CarPartNames.FrontPackage, value: CarPartsHighlightEnum.FrontPackage, checked: false },
            { title: Localizations.CarPartNames.DoorEdge, value: CarPartsHighlightEnum.DoorEdge, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.HeadLamp, value: CarPartsHighlightEnum.HeadLamp, checked: false },
            { title: Localizations.CarPartNames.TailLamp, value: CarPartsHighlightEnum.TailLamp, checked: false },
            { title: Localizations.CarPartNames.PPFRemoval, value: CarPartsHighlightEnum.PPFRemoval, checked: false }
        ]
    ],
    BlackBox: [
        [
            { title: Localizations.CarPartNames.BBOneChannel, value: CarPartsHighlightEnum.BlackBoxOneChannel, checked: false },
            { title: Localizations.CarPartNames.BBTwoChannel, value: CarPartsHighlightEnum.BlackBoxTwoChannel, checked: false },
            { title: Localizations.CarPartNames.BBFourChannel, value: CarPartsHighlightEnum.BlackBoxFourChannel, checked: false }
        ]
    ],
    GlassFilm: [
        [
            { title: Localizations.CarPartNames.AllExterior, value: CarPartsHighlightEnum.AllExterior, checked: false },
            { title: Localizations.CarPartNames.Bonnet, value: CarPartsHighlightEnum.Bonnet, checked: false },
            { title: Localizations.CarPartNames.FrontBumper, value: CarPartsHighlightEnum.FrontBumper, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.FrontFenderLeft, value: CarPartsHighlightEnum.FrontFenderLeft, checked: false },
            { title: Localizations.CarPartNames.FrontFenderRight, value: CarPartsHighlightEnum.FrontFenderRight, checked: false },
            { title: Localizations.CarPartNames.FrontDoorLeft, value: CarPartsHighlightEnum.FrontDoorLeft, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.FrontFenderRight, value: CarPartsHighlightEnum.FrontDoorRight, checked: false },
            { title: Localizations.CarPartNames.BackDoorLeft, value: CarPartsHighlightEnum.BackDoorLeft, checked: false },
            { title: Localizations.CarPartNames.BackDoorRight, value: CarPartsHighlightEnum.BackDoorRight, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.RearFenderLeft, value: CarPartsHighlightEnum.RearFenderLeft, checked: false },
            { title: Localizations.CarPartNames.RearFenderRight, value: CarPartsHighlightEnum.RearFenderRight, checked: false },
            { title: Localizations.CarPartNames.SideSealLeft, value: CarPartsHighlightEnum.SideSealLeft, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.SideSealRight, value: CarPartsHighlightEnum.SideSealRight, checked: false },
            { title: Localizations.CarPartNames.Loop, value: CarPartsHighlightEnum.Loop, checked: false },
            { title: Localizations.CarPartNames.RearBumper, value: CarPartsHighlightEnum.RearBumper, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.Trunk, value: CarPartsHighlightEnum.Trunk, checked: false },
            { title: Localizations.CarPartNames.DoorHandle, value: CarPartsHighlightEnum.DoorHandle, checked: false },
            { title: Localizations.CarPartNames.SideMirror, value: CarPartsHighlightEnum.SideMirror, checked: false }
        ]
    ],
    NewCarPackage: [
        [
            { title: Localizations.CarPartNames.Tinting, value: CarPartsHighlightEnum.Tinting, checked: false },
            { title: Localizations.CarPartNames.BlackBox, value: CarPartsHighlightEnum.BlackBox, checked: false },
            { title: Localizations.CarPartNames.LifeProtectionPackage, value: CarPartsHighlightEnum.PPFLifeProtectionPackage, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.GlassCoating, value: CarPartsHighlightEnum.GlassCoating, checked: false },
            { title: Localizations.CarPartNames.Polish, value: CarPartsHighlightEnum.Polish, checked: false },
            { title: Localizations.CarPartNames.LowerSoundProof, value: CarPartsHighlightEnum.LowerSoundProof, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.ExternalSoundProof, value: CarPartsHighlightEnum.ExternalSoundProof, checked: false }
        ]
    ],
    Polish: [
        [
            { title: Localizations.CarPartNames.AllExterior, value: CarPartsHighlightEnum.AllExterior, checked: false },
            { title: Localizations.CarPartNames.Bonnet, value: CarPartsHighlightEnum.Bonnet, checked: false },
            { title: Localizations.CarPartNames.FrontBumper, value: CarPartsHighlightEnum.FrontBumper, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.FrontFenderLeft, value: CarPartsHighlightEnum.FrontFenderLeft, checked: false },
            { title: Localizations.CarPartNames.FrontFenderRight, value: CarPartsHighlightEnum.FrontFenderRight, checked: false },
            { title: Localizations.CarPartNames.FrontDoorLeft, value: CarPartsHighlightEnum.FrontDoorLeft, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.FrontFenderRight, value: CarPartsHighlightEnum.FrontDoorRight, checked: false },
            { title: Localizations.CarPartNames.BackDoorLeft, value: CarPartsHighlightEnum.BackDoorLeft, checked: false },
            { title: Localizations.CarPartNames.BackDoorRight, value: CarPartsHighlightEnum.BackDoorRight, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.RearFenderLeft, value: CarPartsHighlightEnum.RearFenderLeft, checked: false },
            { title: Localizations.CarPartNames.RearFenderRight, value: CarPartsHighlightEnum.RearFenderRight, checked: false },
            { title: Localizations.CarPartNames.SideSealLeft, value: CarPartsHighlightEnum.SideSealLeft, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.SideSealRight, value: CarPartsHighlightEnum.SideSealRight, checked: false },
            { title: Localizations.CarPartNames.Loop, value: CarPartsHighlightEnum.Loop, checked: false },
            { title: Localizations.CarPartNames.RearBumper, value: CarPartsHighlightEnum.RearBumper, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.Trunk, value: CarPartsHighlightEnum.Trunk, checked: false },
            { title: Localizations.CarPartNames.DoorHandle, value: CarPartsHighlightEnum.DoorHandle, checked: false },
            { title: Localizations.CarPartNames.SideMirror, value: CarPartsHighlightEnum.SideMirror, checked: false }
        ]
    ],
    Tinting: [
        [
            { title: Localizations.CarPartNames.WindshieldSideAndBack, value: CarPartsHighlightEnum.WindshieldSideAndBack, checked: false },
            { title: Localizations.Common.All, value: CarPartsHighlightEnum.WindshieldAll, checked: false },
            { title: Localizations.CarPartNames.WindshieldFront, value: CarPartsHighlightEnum.WindshieldFront, checked: false }
        ],
        [
            { title: Localizations.Common.FirstRow, value: CarPartsHighlightEnum.WindshieldFirstRow, checked: false },
            { title: Localizations.Common.SecondRow, value: CarPartsHighlightEnum.WindshieldSecondRow, checked: false },
            { title: Localizations.Common.ThirdRow, value: CarPartsHighlightEnum.WindshieldThirdRow, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.WindshieldRear, value: CarPartsHighlightEnum.WindshieldBack, checked: false },
            { title: Localizations.CarPartNames.Sunroof, value: CarPartsHighlightEnum.Sunroof, checked: false },
            { title: Localizations.CarPartNames.TintingRemoval, value: CarPartsHighlightEnum.TintingRemoval, checked: false }
        ]
    ],
    Windshield: [
        [
            { title: Localizations.CarPartNames.Windshield, value: CarPartsHighlightEnum.Windshield, checked: false }
        ]
    ],
    Wrapping: [
        [
            { title: Localizations.CarPartNames.AllExterior, value: CarPartsHighlightEnum.AllExterior, checked: false },
            { title: Localizations.CarPartNames.Bonnet, value: CarPartsHighlightEnum.Bonnet, checked: false },
            { title: Localizations.CarPartNames.FrontBumper, value: CarPartsHighlightEnum.FrontBumper, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.FrontFenderLeft, value: CarPartsHighlightEnum.FrontFenderLeft, checked: false },
            { title: Localizations.CarPartNames.FrontFenderRight, value: CarPartsHighlightEnum.FrontFenderRight, checked: false },
            { title: Localizations.CarPartNames.FrontDoorLeft, value: CarPartsHighlightEnum.FrontDoorLeft, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.FrontFenderRight, value: CarPartsHighlightEnum.FrontDoorRight, checked: false },
            { title: Localizations.CarPartNames.BackDoorLeft, value: CarPartsHighlightEnum.BackDoorLeft, checked: false },
            { title: Localizations.CarPartNames.BackDoorRight, value: CarPartsHighlightEnum.BackDoorRight, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.RearFenderLeft, value: CarPartsHighlightEnum.RearFenderLeft, checked: false },
            { title: Localizations.CarPartNames.RearFenderRight, value: CarPartsHighlightEnum.RearFenderRight, checked: false },
            { title: Localizations.CarPartNames.SideSealLeft, value: CarPartsHighlightEnum.SideSealLeft, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.SideSealRight, value: CarPartsHighlightEnum.SideSealRight, checked: false },
            { title: Localizations.CarPartNames.Loop, value: CarPartsHighlightEnum.Loop, checked: false },
            { title: Localizations.CarPartNames.RearBumper, value: CarPartsHighlightEnum.RearBumper, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.Trunk, value: CarPartsHighlightEnum.Trunk, checked: false },
            { title: Localizations.CarPartNames.DoorHandle, value: CarPartsHighlightEnum.DoorHandle, checked: false },
            { title: Localizations.CarPartNames.SideMirror, value: CarPartsHighlightEnum.SideMirror, checked: false }
        ],
        [
            { title: Localizations.CarPartNames.Wheels, value: CarPartsHighlightEnum.Wheels, checked: false },
            { title: Localizations.CarPartNames.WrappingRemoval, value: CarPartsHighlightEnum.WrappingRemoval, checked: false }
        ]
    ]
}